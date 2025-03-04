# Stage 1: Build the Vite App
FROM node:20-alpine AS build  

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 100000

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy build artifacts from the previous stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
