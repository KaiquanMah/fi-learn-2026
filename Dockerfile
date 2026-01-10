FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
# Using --legacy-peer-deps to avoid potential conflicts, though not strictly necessary if clean
RUN npm install

# Copy source
COPY . .

# Expose Vite port
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]
