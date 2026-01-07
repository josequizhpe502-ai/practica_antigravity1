# Implementation Plan - REST API (Fastify + Prisma + MySQL)

## Goal Description
Develop a high-performance REST API for the "Centro de Apoyo y Co-creación para Emprendimientos UID" using Fastify, Node.js, and Prisma ORM with MySQL 8.0. This API will implement the requirements defined in the SRS.

## User Review Required
> [!IMPORTANT]
> - Confirm the specific MySQL database credentials and host availability.
> - Review the Prisma schema structure before running migrations.

## Proposed Changes

### Tech Stack Configuration
- **Runtime**: Node.js (Latest LTS)
- **Framework**: Fastify (v5.x)
- **ORM**: Prisma (Latest)
- **Database**: MySQL 8.0
- **Validation**: Zod (via `fastify-type-provider-zod` v4+)
- **Documentation**: Swagger/OpenAPI (via `@fastify/swagger` and `@fastify/swagger-ui`)
- **Language**: TypeScript (Strongly recommended for Prisma type safety)

### [Project Initialization]
#### [NEW] [package.json](file:///./package.json)
- **Dependencies**: 
    - `fastify`, `@fastify/cors`, `@fastify/swagger`, `@fastify/swagger-ui`, `@fastify/jwt`
    - `@prisma/client`, `fastify-type-provider-zod`, `zod`, `dotenv`
- **DevDependencies**: 
    - `prisma`, `typescript`, `ts-node`, `@types/node`, `tap` (testing)

### [Database Layer]
#### [NEW] [schema.prisma](file:///./prisma/schema.prisma)
- **Models**:
    - `Usuario` (User) & `Auth` (Security)
    - `Emprendimiento` (Business)
    - `Producto` (Product - NEW)
    - `Categoria` (Category)
    - `Resena` (Review - NEW)
    - `Mentoria` (Mentorship) & `Tutor` (Mentor - NEW)
    - `Evento` (Event - NEW)
- **Configuration**:
    - DataSource: `provider = "mysql"`, `url = env("DATABASE_URL")`
    - Connection Pooling: Standard Prisma pooling.

### [API Layer (Modular Architecture)]
#### [NEW] [src/server.ts](file:///./src/server.ts)
- Entry point. Starts the server and handles graceful shutdown.

#### [NEW] [src/app.ts](file:///./src/app.ts)
- App factory. Registers plugins (Prisma, Swagger, Zod Provider) and routes.

#### [NEW] [src/plugins/prisma.ts](file:///./src/plugins/prisma.ts)
- Prisma Client singleton plugin for Fastify.

#### [NEW] [src/modules/](file:///./src/modules/)
- **Structure**: Domain-Driven Design (DDD) like structure.
    - `auth/`: `auth.routes.ts`, `auth.schema.ts`, `auth.service.ts`
    - `entrepreneurship/`: Routes for managing businesses.
    - `marketplace/`: Routes for Products and Catalog search.
    - `community/`: Routes for Reviews and Events.
    - `mentorship/`: Routes for Tutors and Sessions.

## Verification Plan
### Automated Tests
- **Framework**: `tap` (Lightweight, recommended for Fastify).
- **Strategy**: 
    - Integration tests for critical endpoints (Auth, Create Product).
    - `npm test` command configuration.
