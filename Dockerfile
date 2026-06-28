# =====================
# DEV STAGE
# =====================
FROM node:22-alpine AS dev
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]


# =====================
# BUILD STAGE
# =====================
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production
RUN ls -R /app/dist  # This will print the exact path in your build logs


# =====================
# PROD STAGE
# =====================
FROM nginxinc/nginx-unprivileged:alpine AS prod

# 1. Delete the default configuration folder contents to avoid conflicts
USER root
RUN rm -rf /etc/nginx/conf.d/*
USER nginx

# 2. OVERWRITE the main nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# 3. Copy your app files
COPY --from=build --chown=nginx:nginx /app/dist/budget-me/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


