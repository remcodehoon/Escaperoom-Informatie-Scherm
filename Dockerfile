FROM node:10 AS builder
RUN apt-get update -y
WORKDIR /workspace
COPY . /workspace
RUN npm install
RUN npm run build.prod

FROM nginx:stable
ADD nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /workspace/dist/Escaperoom-Informatie-Scherm .
