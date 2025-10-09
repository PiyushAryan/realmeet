# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY ../package*.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev

# Copy only the ai-server.js file
COPY server/ai-server.js ./

# Copy .env file if needed (or use AWS Secrets Manager)
COPY .env ./

# Expose the AI server port
EXPOSE 3001


# Run the AI server
CMD ["node", "ai-server.js"]