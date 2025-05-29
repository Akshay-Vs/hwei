# Multi-stage Dockerfile for NestJS Turborepo Project

# Base stage for shared setup
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    pnpm install turbo --global

# Builder stage to prepare the project
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /usr/src/app

# Copy workspace files for dependency installation
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml turbo.json ./
COPY apps/server/package.json ./apps/server/package.json
COPY apps/server/prisma ./apps/server/prisma
COPY apps/server/tsconfig*.json ./apps/server/
COPY packages/ ./packages/

# Use turbo to prune the project for the specific service
RUN turbo prune --scope=@hwei/server --docker

# Installer stage to install dependencies
FROM base AS installer
WORKDIR /usr/src/app

# Copy pruned project files
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/out/full/ .
COPY apps/server/src ./apps/server/src
COPY apps/server/tsconfig*.json ./apps/server/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Create generated directory for Prisma
RUN mkdir -p apps/server/generated

# Generate Prisma client
RUN npx prisma generate --schema apps/server/prisma/schema.prisma

# Build the server application
RUN turbo run build --filter=@hwei/server...

# Runner stage for the final production image
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Install necessary runtime dependencies and create non-root user
RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy production dependencies and build artifacts
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/package.json ./
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/server/package.json ./apps/server/
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/server/dist ./apps/server/dist
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/server/node_modules ./apps/server/node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/server/generated ./apps/server/generated

# Copy Prisma files
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/server/prisma ./apps/server/prisma

# Copy shared packages if they exist
RUN mkdir -p /usr/src/app/packages
# COPY --from=installer --chown=nodejs:nodejs /usr/src/app/packages/. /usr/src/app/packages/

# Set user and working directory
USER nodejs
WORKDIR /usr/src/app/apps/server

# Command to run the application
CMD ["node", "dist/main.js"]