# 1) Base image
FROM node:22-alpine

# 2) Workdir
WORKDIR /app

# 3) Copy only package files first (better caching)
COPY package*.json ./

# 4) Install deps (prod only)
RUN npm install --omit=dev

# 5) Copy the rest of the app
COPY . .

# 6) Expose port
EXPOSE 3000

# 7) Start command
CMD ["npm", "start"]