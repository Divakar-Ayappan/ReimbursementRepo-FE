# Stage 1: Build React app
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.29.0
COPY --from=build /app/build /usr/share/nginx/html

# Replace Nginx default config
COPY nginx.conf /etc/nginx/conf.d/default.conf
