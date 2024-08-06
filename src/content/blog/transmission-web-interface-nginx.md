---
title: 'Transmission Web Interface & Nginx'
description: 'Transmission Web Interface & Nginx'
pubDatetime: 2012-02-13
ogImage: '/assets/libri.webp'
tags: ['Configurazione', 'Linux', 'nginx', 'torrent', 'transmission']
---

Volete usare nginx come frontend per transmission? Niente di più semplice:
```c
server {
    listen 80;
    server_name frontend;
    root /srv/www/htdocs;
    location /transmission {
        proxy_pass http://localhost:9091/transmission;
        proxy_redirect http://localhost:9091/transmission http://frontend/transmission;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```