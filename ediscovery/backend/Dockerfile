FROM node:20-bookworm-slim

# ── LibreOffice for Office → PDF rendering (MPL 2.0, no license fee) ──────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-impress \
    libreoffice-draw \
    libreoffice-base-core \
    fonts-liberation \
    fonts-noto \
    fonts-dejavu \
    && rm -rf /var/lib/apt/lists/*

# Prevent LibreOffice from trying to connect to user profile dirs
ENV HOME=/tmp \
    LIBREOFFICE_PROFILE=/tmp/libreoffice-profile

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3001
CMD ["node", "src/server.js"]
