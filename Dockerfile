FROM nginx

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY / /usr/share/nginx/html/