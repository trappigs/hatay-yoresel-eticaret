# Medusa v2 backend — production image for Railway
# syntax=docker/dockerfile:1
FROM node:20-slim

# Native build deps for node-gyp based packages (sharp, swc, etc.)
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Lean npm: skip audit/fund/progress network + console overhead
ENV NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_PROGRESS=false

# Install full dependencies first (better layer caching).
# Persistent npm cache mount: first build warms it, later builds reuse it
# (downloads are cached on Railway), so npm ci finishes under the build deadline.
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=s/53182ff1-09c4-4d4d-a0b1-81d4ea2f2224-npm,target=/root/.npm npm ci --prefer-offline

# Copy source and build (compiles backend + admin into .medusa/server)
COPY . .
RUN npm run build

# Install production-only dependencies for the compiled server
WORKDIR /app/.medusa/server
RUN --mount=type=cache,id=s/53182ff1-09c4-4d4d-a0b1-81d4ea2f2224-npm,target=/root/.npm npm install --omit=dev --prefer-offline

ENV NODE_ENV=production
# Railway injects PORT; Medusa listens on it. 9000 is the default, for reference.
EXPOSE 9000

# Run migrations (idempotent; seeds sample data on first run) then start.
# NOTE: WORKDIR is already /app/.medusa/server, so no `cd` is needed.
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
