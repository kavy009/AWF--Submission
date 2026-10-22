# ==============================================================================
# ITUE301: Advanced Web Development Frameworks - Practical 11
# Backend Dockerfile: Node.js 20 & Express RESTful API with MongoDB & EventEmitter
# ==============================================================================

# Use official lightweight Node.js 20 Alpine runtime
FROM node:20-alpine

# Set container working directory
WORKDIR /app

# Copy dependency definitions first to leverage Docker layer caching
COPY package*.json ./

# Install application dependencies inside Linux container environment
RUN npm install

# Copy application source code
COPY . .

# Expose backend API port
EXPOSE 5000

# Set production environment defaults
ENV NODE_ENV=production
ENV PORT=5000

# Start Express.js API server
CMD ["node", "server.js"]
