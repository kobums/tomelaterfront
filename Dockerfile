# Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy ONLY package.json to force npm to resolve dependencies for Linux
# This bypasses any cross-platform issues in package-lock.json
COPY package.json ./

# Install all dependencies (npm install will correctly fetch Linux binaries)
RUN npm install --no-audit --prefer-offline

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-slim

WORKDIR /app

# Copy package files (again, without lockfile to be safe)
COPY package.json ./

# Install dependencies (required for 'vite preview' to load config)
RUN npm install --no-audit --prefer-offline

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy vite config (required for preview)
COPY vite.config.ts ./

# Expose port
EXPOSE 9006

# Run preview server
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "9006"]