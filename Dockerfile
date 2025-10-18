# Gunakan Node.js versi LTS
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# check if users.json exists
# Buat storage directory
RUN mkdir -p storage

# Pastikan users.json ada (manual)
RUN test -f storage/users.json || (echo "users.json not found. Please provide it manually." && exit 1)

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]