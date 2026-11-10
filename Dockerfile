FROM nginx:alpine
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY brand.config.js /usr/share/nginx/html/brand.config.js
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY auth /usr/share/nginx/html/auth
COPY reseller /usr/share/nginx/html/reseller
COPY supplier /usr/share/nginx/html/supplier
COPY admin /usr/share/nginx/html/admin
COPY index.html how-it-works.html for-resellers.html for-suppliers.html pricing.html policies.html favicon.svg /usr/share/nginx/html/
ENV PORT=80
ENV NGINX_ENVSUBST_FILTER=PORT
EXPOSE 80
