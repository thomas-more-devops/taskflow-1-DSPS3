# -------- Builder stage --------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=development

# 1) Better caching: copy package files first
COPY package*.json ./

# 2) Install ALL deps (dev deps included for builds like TS/Vite/Webpack)
RUN npm ci

# 3) Copy source and build (if your project has a build step)
COPY . .
RUN npm run build --if-present

# 4) Keep only production deps to shrink what we pass to final image
RUN npm prune --omit=dev


# -------- Production stage --------
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# 5) Create and use a non-root user
RUN addgroup -S app && adduser -S app -G app

# 6) Copy only what is needed at runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
# If your app outputs to "dist", copy it. If it’s plain Node (e.g., server.js), this is harmless.
# Copy your runtime files directly
COPY --from=builder /app ./

COPY --from=builder /app/*.js ./

# 7) Permissions + runtime
RUN chown -R app:app /app
USER app

EXPOSE 3000
CMD ["npm", "start"]