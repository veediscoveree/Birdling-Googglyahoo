import { Router } from 'express';
import { Client } from '@elastic/elasticsearch';
import { db } from '../db/index.js';
import { logEvent } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();
const es = new Client({ node: process.env.ELASTICSEARCH_URL ?? 'http://localhost:9200' });

// POST /api/search — full-text + metadata search
router.post('/', async (req, res, next) => {
  try {
    const {
      matterId,
      query,          // full-text query string
      filters = {},   // metadata filters
      dateFrom,
      dateTo,
      from = 0,
      size = 50,
      highlight = true,
      savedSearchId,
    } = req.body;

    if (!matterId) return res.status(400).json({ error: 'matterId is required' });

    // Build Elasticsearch query
    const must = [];
    const filter = [];

    if (query?.trim()) {
      must.push({
        multi_match: {
          query,
          fields: [
            'text^1',
            'originalName^2',
            'emailSubject^3',
            'emailFrom^2',
            'emailTo^2',
            'author^2',
            'title^2',
            'keywords^2',
          ],
          type: 'best_fields',
          fuzziness: 'AUTO',
        },
      });
    }

    // Metadata filters
    if (filters.fileCategory)   filter.push({ term: { fileCategory: filters.fileCategory } });
    if (filters.custodianName)  filter.push({ term: { 'custodianName.keyword': filters.custodianName } });
    if (filters.language)       filter.push({ term: { language: filters.language } });
    if (filters.isPrivileged !== undefined) filter.push({ term: { isPrivileged: filters.isPrivileged } });
    if (filters.isDuplicate !== undefined)  filter.push({ term: { isDuplicate: filters.isDuplicate } });

    if (dateFrom || dateTo) {
      filter.push({
        range: {
          dateModified: {
            ...(dateFrom ? { gte: dateFrom } : {}),
            ...(dateTo   ? { lte: dateTo }   : {}),
          },
        },
      });
    }

    const esQuery = {
      index: `vdiscovery-${matterId}`,
      from:  parseInt(from),
      size:  parseInt(size),
      query: {
        bool: {
          must:   must.length ? must : [{ match_all: {} }],
          filter: [
            { term: { matterId } },
            ...filter,
          ],
        },
      },
      ...(highlight && query?.trim() ? {
        highlight: {
          fields: {
            text:          { fragment_size: 200, number_of_fragments: 3 },
            emailSubject:  { number_of_fragments: 1 },
            originalName:  { number_of_fragments: 1 },
          },
        },
      } : {}),
      aggregations: {
        by_category: { terms: { field: 'fileCategory', size: 20 } },
        by_custodian: { terms: { field: 'custodianName.keyword', size: 50 } },
        by_language:  { terms: { field: 'language', size: 20 } },
        date_range: {
          date_histogram: {
            field:              'dateModified',
            calendar_interval:  'month',
          },
        },
      },
    };

    const esResponse = await es.search(esQuery);

    // Log search to CoC
    await logEvent({
      eventType:   AUDIT_EVENT.SEARCH_EXECUTED,
      matterId,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Search: "${query ?? '(all)'}" — ${esResponse.hits.total.value} results`,
      metadata:    { query, filters, from, size },
    });

    res.json({
      hits:     esResponse.hits.hits.map(hit => ({
        documentId: hit._id,
        score:      hit._score,
        highlight:  hit.highlight,
        source:     hit._source,
      })),
      total:    esResponse.hits.total.value,
      aggs:     esResponse.aggregations,
    });
  } catch (err) {
    // Elasticsearch index may not exist yet (no documents processed)
    if (err.meta?.statusCode === 404) {
      return res.json({ hits: [], total: 0, aggs: {} });
    }
    next(err);
  }
});

// POST /api/search/save — save a search
router.post('/save', async (req, res, next) => {
  try {
    const { matterId, name, description, query, isShared = false } = req.body;
    const result = await db.query(
      `INSERT INTO saved_searches (matter_id, name, description, query, created_by, is_shared)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [matterId, name, description, JSON.stringify(query), req.user?.id, isShared]
    );
    await logEvent({
      eventType:   AUDIT_EVENT.SAVED_SEARCH_CREATED,
      matterId,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Saved search created: "${name}"`,
    });
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

// GET /api/search/saved?matterId=
router.get('/saved', async (req, res, next) => {
  try {
    const { matterId } = req.query;
    const result = await db.query(
      `SELECT * FROM saved_searches WHERE matter_id = $1 ORDER BY created_at DESC`,
      [matterId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

export default router;
