# =====================================================
# Stage 1 - Builder
# =====================================================
FROM oven/bun:1.3.14 AS builder

# Semua proses berikutnya dilakukan di /app
WORKDIR /app

# Copy dependency terlebih dahulu agar cache Docker optimal
COPY package.json bun.lock tsconfig.json ./

# Install seluruh dependency (termasuk devDependencies)
RUN bun install

# Copy source code
COPY src ./src

# Build TypeScript menjadi JavaScript
RUN bun run build

# =====================================================
# Stage 2 - Production
# =====================================================
FROM oven/bun:1.3.14

WORKDIR /app

# Copy dependency file
COPY package.json bun.lock ./

# Install production dependency saja
RUN bun install --production

# Copy hasil build dari builder
COPY --from=builder /app/dist ./dist

# -----------------------------------------------------
# Jalankan aplikasi menggunakan user biasa
# -----------------------------------------------------

USER bun

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "dist/index.js"]