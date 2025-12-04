# Etap 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Kopiuj pliki package
COPY package*.json ./

# Instaluj zależności
RUN npm ci

# Kopiuj kod źródłowy
COPY . .

# Zbuduj aplikację
RUN npm run build

# Etap 2: Production
FROM nginx:alpine

# Kopiuj zbudowaną aplikację
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopiuj konfigurację nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Dodaj skrypt do wstrzykiwania zmiennych środowiskowych w runtime
COPY <<'EOF' /docker-entrypoint.d/40-envsubst-on-env.sh
#!/bin/sh
set -e

find /usr/share/nginx/html -type f -name "config.js" -exec sed -i  \
  -e "s|__UMAMI_SCRIPT_URL__|${VITE_UMAMI_SCRIPT_URL}|g" \
  -e "s|__UMAMI_WEBSITE_ID__|${VITE_UMAMI_WEBSITE_ID}|g" \
  {} +

echo "Environment variables injected successfully"
EOF

RUN chmod +x /docker-entrypoint.d/40-envsubst-on-env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]