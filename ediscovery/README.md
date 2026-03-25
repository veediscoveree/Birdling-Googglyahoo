# VDiscovery — eDiscovery Processing Platform

A defensible, cost-effective alternative to Relativity for litigation-grade data processing and review. Built for law firms and corporations needing enterprise eDiscovery capability without Relativity's hosting cost.

---

## Core Principles

### 1. Defensibility First
Every design decision is made with defensibility in mind:
- **Chain of Custody**: Cryptographically chained audit log (SHA-256 hash of each entry links to the previous). The log is INSERT-only — the PostgreSQL trigger blocks any UPDATE or DELETE.
- **Hash Verification**: Every file is hashed (MD5 + SHA-1 + SHA-256) during upload *in flight* and verified again after storage. A mismatch triggers a CRITICAL alert.
- **NIST De-NISTing**: System files identified against the NIST NSRL database are excluded, consistent with federal forensic standards (NIST SP 800-86).
- **Complete Error Documentation**: Every processing exception is recorded with full file context (hash, path, MIME type, size), severity, and a mandatory remediation workflow.

### 2. Comprehensive Error Reporting
Unlike legacy systems where errors disappear into log files, VDiscovery treats errors as first-class citizens:
- Every error is classified by severity: **CRITICAL** (integrity violations) → **HIGH** (unprocessable) → **MEDIUM** (partial) → **LOW** (informational).
- Hash mismatches trigger CRITICAL alerts visible on every dashboard.
- The Error Report page provides full file context, remediation workflow, and CSV export for court submission.
- All remediation actions are permanently recorded in the audit log.

### 3. All File Types
File type detection uses **Apache Tika** (magic bytes — never trust file extensions). Supported categories:
| Category | Formats |
|---|---|
| Email | EML, MSG, MBOX, PST, NSF, OST |
| Office | DOCX, DOC, XLSX, XLS, PPTX, PPT, RTF, ODF |
| PDF | PDF (native text + OCR fallback) |
| Images | JPEG, PNG, TIFF, BMP, GIF, HEIC, WebP |
| Video | MP4, MOV, AVI, MKV, WebM |
| Audio | MP3, WAV, M4A, FLAC, OGG |
| Archives | ZIP, RAR, 7Z, TAR, GZ, CAB (recursively expanded) |
| Databases | MDB, ACCDB, SQLite, DBF |
| Code | JS, PY, JAVA, CPP, CS, and 100+ more |
| Calendar | ICS, vCalendar |
| Contact | VCF |
| Forensic | E01, DD, AFF (via Tika) |
| **Total** | **500+ via Apache Tika** |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (React)                       │
│  MatterList → Dashboard → Ingest → Processing → Review      │
│  Search → Production → Audit Log → Error Report             │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
┌─────────────────────▼───────────────────────────────────────┐
│                    Backend (Express)                         │
│  /api/matters   /api/documents   /api/ingest                │
│  /api/search    /api/production  /api/audit                 │
│  /api/errors    /api/processing                             │
└───────────┬──────────────────────────────┬──────────────────┘
            │                              │
     ┌──────▼──────┐              ┌────────▼──────────┐
     │ PostgreSQL  │              │  Redis (BullMQ)   │
     │ Metadata    │              │  Processing Queue │
     │ Audit Log   │              └────────┬──────────┘
     │ (immutable) │                       │
     └─────────────┘              ┌────────▼──────────┐
                                  │  Processor Worker  │
     ┌─────────────┐              │  (BullMQ Worker)  │
     │  MinIO/S3   │◄─────────────│  Pipeline:        │
     │  Files +    │              │  1. Type detect   │
     │  Text blobs │◄─────────────│  2. De-NISTing    │
     └─────────────┘              │  3. Dedup         │
                                  │  4. Expand cont.  │
     ┌─────────────┐              │  5. Metadata      │
     │Elasticsearch│◄─────────────│  6. Text extract  │
     │Full-text    │              │  7. OCR           │
     │index        │              │  8. Near-dedup    │
     └─────────────┘              │  9. Threading     │
                                  │  10. Index        │
     ┌─────────────┐              └───────────────────┘
     │Apache Tika  │◄──── file type detection + text extraction
     │(Java)       │◄──── OCR via Tesseract
     └─────────────┘
```

---

## Processing Pipeline

Each document passes through 13 deterministic stages. Every stage is individually logged. Failures are caught, classified, and recorded — never silently swallowed.

| # | Stage | What Happens |
|---|---|---|
| 1 | **HASHING** | MD5 + SHA-1 + SHA-256 computed in-flight; stored file verified against in-flight hash |
| 2 | **TYPE_DETECTION** | Magic bytes via Tika; file category assigned; encryption detected |
| 3 | **DENISTING** | SHA-1 checked against NIST NSRL; system files excluded |
| 4 | **DEDUPLICATION** | SHA-256 compared against all matter documents; duplicates linked to original |
| 5 | **CONTAINER_EXPANSION** | ZIP/RAR/7Z/PST/NSF recursively expanded; children ingested as individual documents |
| 6 | **METADATA_EXTRACTION** | All available metadata extracted via Tika (hundreds of fields) |
| 7 | **TEXT_EXTRACTION** | Full text extracted via type-specific extractor or Tika universal |
| 8 | **OCR** | Images and PDFs without extractable text OCR'd via Tesseract; confidence score recorded |
| 9 | **LANGUAGE_DETECTION** | Document language identified (ISO 639-1) |
| 10 | **NEAR_DEDUP** | MinHash LSH signature computed; documents ≥85% similar grouped |
| 11 | **EMAIL_THREADING** | Emails linked into conversation threads via Message-ID / References / subject |
| 12 | **INDEXING** | Full text + metadata indexed in Elasticsearch |
| 13 | **COMPLETE** | Document marked complete; data source stats updated |

**Error states:**
- `ERROR` — unrecoverable failure (corrupt file, storage failure, etc.)
- `NEEDS_REMEDIATION` — recoverable (password-protected: provide password and re-process)
- `EXCLUDED` — NIST system file (de-NISTed)

---

## Chain of Custody

The audit log is the legal record. Key properties:

- **Append-only**: PostgreSQL trigger blocks UPDATE/DELETE on `audit_log` table.
- **Cryptographically chained**: Each entry's SHA-256 is computed from `(prev_hash + event_json)`, linking entries into a tamper-evident chain.
- **Verified**: The "Verify Chain Integrity" button re-computes all hashes and reports any breaks.
- **Complete coverage**: Every file touch, every view, every tag, every production action is logged.

Audit events logged automatically:
```
FILE_RECEIVED → FILE_HASHED → HASH_VERIFIED → PROCESSING_COMPLETE
DOCUMENT_VIEWED → DOCUMENT_TAGGED → PRODUCTION_CREATED
ERROR_REMEDIATED → SEARCH_EXECUTED → USER_LOGIN
```

---

## Production & Load Files

Productions support:
- **Bates numbering**: Configurable prefix, start number, zero-padding
- **Output formats**: Native files, PDF images, TIFF images
- **Load files**: DAT (Concordance/Relativity), OPT (Opticon), EDRM XML
- **Privilege log**: FRCP Rule 26(b)(5) compliant CSV export

---

## Getting Started

### Prerequisites
- Docker Desktop / Docker Engine + docker-compose
- 8 GB RAM minimum (Elasticsearch needs 2 GB)

### Quick Start

```bash
# 1. Clone and configure
cd ediscovery
cp .env.example .env
# Edit .env — set strong passwords

# 2. Start all services
docker-compose up -d

# 3. Open the UI
open http://localhost:5173
```

Services started:
| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:3001 |
| MinIO Console | http://localhost:9001 |
| Elasticsearch | http://localhost:9200 |
| Tika | http://localhost:9998 |

### Development (without Docker)

```bash
# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Processor
cd processor && npm install && npm run dev

# Terminal 3: Frontend
cd frontend && npm install && npm run dev
```

---

## Competitive Advantages over Relativity

| Feature | Relativity | VDiscovery |
|---|---|---|
| **Hosting cost** | $$$$ (per-GB pricing) | Self-hosted or cloud-native |
| **Processing** | External (Nuix required) | Built-in pipeline |
| **Error reporting** | Basic | Comprehensive with remediation workflow |
| **Chain of custody** | Partial | Cryptographically chained, immutable |
| **Hash mismatch alerts** | Limited | CRITICAL alerts, immediately surfaced |
| **NIST de-NISTing** | Manual | Automatic |
| **Near-dedup** | Add-on | Built-in (MinHash LSH) |
| **Email threading** | Manual | Automatic (RFC 5322) |
| **File type detection** | Extension-based | Magic bytes (Apache Tika) |
| **API** | REST (proprietary) | Open REST |
| **Open source** | No | Yes |

---

## Roadmap

- [ ] Predictive coding / TAR (Technology Assisted Review) via Claude API
- [ ] Redaction (PDF page redaction with coordinate-based markup)
- [ ] EDRM XML 2.0 production output
- [ ] Mobile device processing (iOS/Android backups via libimobiledevice)
- [ ] PST/NSF processing (libpff integration)
- [ ] Privilege detection (AI-assisted via keyword + semantic analysis)
- [ ] Multi-tenant SaaS mode with per-matter access control
- [ ] NIST NSRL database import utility
- [ ] Azure Cognitive Services OCR integration (higher quality)
- [ ] MS Teams / Slack / Signal export processing

---

## Standards & References

- [EDRM Processing Guidelines](https://edrm.net/resources/frameworks-and-standards/edrm-model/edrm-stages-standards/edrm-processing-standards-guide-version-1/)
- [EDRM XML Specification](https://edrm.net/resources/frameworks-and-standards/edrm-xml/)
- [NIST SP 800-86: Computer Forensics Guide](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-86.pdf)
- [FRCP Rule 26(b)(5): Privilege Logs](https://www.law.cornell.edu/rules/frcp/rule_26)
- [Concordance DAT Format Reference](https://www.logikcull.com/blog/load-files-metadata-tiff-pdf-and-how-to-avoid-mistakes-that-trigger-re-production)
- [RFC 5322: Internet Message Format](https://datatracker.ietf.org/doc/html/rfc5322)
