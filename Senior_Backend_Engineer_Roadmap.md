# Senior Backend Engineer Roadmap (Living Document)

## Tujuan

Menjadi Senior Backend Engineer yang mampu membawa aplikasi dari
development hingga production.

## Yang Sudah Dipelajari

### Bahasa & Backend

- TypeScript
- Bun Runtime
- Express
- ES Modules
- Environment Variables

### Database

- PostgreSQL
- Dasar koneksi `pg`
- Dockerized PostgreSQL
- Persistent data dengan Docker Volume

### Docker

- Konsep Image vs Container
- Dockerfile
- Docker Compose
- Bind Mount
- Named Volume
- Docker Network
- Environment Variable
- Health Check
- Restart Policy
- Multi-stage Build
- Image Optimization
- Non-root User (`USER bun`)
- Production vs Development Dockerfile
- `.dockerignore`

### Project yang Dibangun

Todo API sederhana dengan: - Bun - Express - PostgreSQL - Docker -
Docker Compose

---

# Struktur Project yang Direkomendasikan

```text
src/
├── config/
├── controllers/
├── services/
├── repositories/
├── routes/
├── database/
├── middlewares/
├── models/
├── types/
├── utils/
├── validators/
├── index.ts
```

## Tanggung Jawab Tiap Folder

### config/

Konfigurasi aplikasi (env, database, logger).

### controllers/

Menerima HTTP request dan mengembalikan response.

### services/

Business logic.

### repositories/

Semua akses database.

### routes/

Mapping endpoint.

### database/

Connection, migration, seed.

### middlewares/

Authentication, logging, error handler.

### models/

Entity/domain model bila diperlukan.

### types/

Shared TypeScript types.

### utils/

Helper function.

### validators/

Validasi request.

---

# Style Mengajar yang Dipakai

1. Mulai dari WHY sebelum HOW.
2. Gunakan analogi dunia nyata.
3. Bangun mental model terlebih dahulu.
4. Praktik sedikit demi sedikit.
5. Setiap materi harus menghasilkan project nyata.
6. Hindari copy-paste tanpa memahami alasan desain.
7. Jelaskan trade-off setiap keputusan.
8. Fokus pada praktik yang dipakai di perusahaan.

---

# Roadmap Berikutnya

## Sprint 1 ✅

Docker (Selesai)

## Sprint 2

Refactor Todo API - Layered Architecture - DTO - Validation - Error
Handling - Logging - Config management

## Sprint 3

Authentication - JWT - Refresh Token - Password Hashing -
Authorization - RBAC

## Sprint 4

Testing - Unit Test - Integration Test - Mocking - Testcontainers
(opsional)

## Sprint 5

CI/CD - GitHub Actions - Lint - Test - Build - Docker Build

## Sprint 6

Docker Registry - Docker Hub / GitHub Container Registry - Versioning
image - Tagging

## Sprint 7

Deploy VPS - Linux - SSH - Docker Compose - Environment Production

## Sprint 8

Reverse Proxy - Traefik (direkomendasikan) - HTTPS - Let's Encrypt -
Domain

## Sprint 9

Observability - Pino - Prometheus - Grafana - Loki

## Sprint 10

Distributed Systems - Redis lebih dalam - RabbitMQ / Kafka - Background
Job - Saga Pattern

## Sprint 11

System Design - Scaling - Caching - Rate Limiter - File Storage - Queue

## Sprint 12

Kubernetes - Deployment - Service - ConfigMap - Secret - Ingress - HPA

---

# Target Akhir

Mampu membuat pipeline berikut:

```text
git push
    ↓
GitHub Actions
    ↓
Lint
    ↓
Test
    ↓
Build
    ↓
Docker Image
    ↓
Registry
    ↓
VPS
    ↓
Traefik
    ↓
HTTPS
    ↓
Production
```

Dokumen ini adalah living document dan akan terus diperbarui seiring
perkembangan pembelajaran.
