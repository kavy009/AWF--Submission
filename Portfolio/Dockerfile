# ==============================================================================
# ITUE301: Advanced Web Development Frameworks - Practical 11
# Frontend Dockerfile: Multi-Stage Build for React 18 + Vite Portfolio App
# Uses Node 20 Alpine (supports styleText in node:util required by modern Vite/Rolldown)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build production bundle
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for Vite build)
RUN npm install

# Copy application source code
COPY . .

# Build optimized production bundle
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Lightweight production preview server (Multi-Stage Optimization)
# ------------------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built distribution assets, config, and runtime dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/vite.config.js ./

# Expose Vite preview web server port
EXPOSE 5173

# Serve production assets on 0.0.0.0:5173 accessible from host browser
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
