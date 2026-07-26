# =====================================================
# Stage 1 — Builder
# =====================================================

FROM oven/bun:1.3.14 AS builder

WORKDIR /app

# Copy dependency files lebih dahulu untuk memanfaatkan Docker cache
COPY package.json bun.lock tsconfig.json ./

# Builder membutuhkan devDependencies seperti TypeScript
RUN bun install --frozen-lockfile

# Copy source code
COPY src ./src

# Compile TypeScript ke JavaScript
RUN bun run build


# =====================================================
# Stage 2 — Production
# =====================================================

FROM oven/bun:1.3.14 AS production

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./

# Production hanya membutuhkan runtime dependencies
RUN bun install --production --frozen-lockfile

# Copy hasil build dari builder
COPY --from=builder /app/dist ./dist

# Jalankan aplikasi menggunakan non-root user bawaan Bun
USER bun

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "dist/index.js"]