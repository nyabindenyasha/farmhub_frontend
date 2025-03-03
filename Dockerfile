## Step 1: Build the Next.js app
#FROM node:18-alpine AS builder
#
#WORKDIR /app
#
#COPY package.json package-lock.json ./
#RUN npm install --frozen-lockfile
#
#COPY . .
#RUN npm run build && npm run export
#
## Step 2: Serve with Nginx
#FROM nginx:1.25.3-alpine
#
## Copy built files from previous stage
#COPY --from=builder /app/out /usr/share/nginx/html
#
## Copy custom Nginx config
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build Next.js App
FROM node:18.19.1-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve with Nginx
FROM nginx:1.25.3-alpine
COPY --from=builder /app/.next /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose Port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


