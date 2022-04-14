---
title: 'Transmission Web Interface & Nginx'
short: 'Transmission Web Interface & Nginx'
publishedAt: '2012-02-13'
image: '/images/libri.webp'
tags: ['Configurazione', 'Linux', 'nginx', 'torrent', 'transmission']
---

volete usare nginx come frontend per transmission? Niente di più semplice:

>server {
>    listen 80;
>    server_name frontend;
>    root /srv/www/htdocs;
>    location /transmission {
>        proxy_pass http://localhost:9091/transmission;
>        proxy_redirect http://localhost:9091/transmission http://frontend/transmission;
>        proxy_set_header X-Real-IP $remote_addr;
>    }
>}