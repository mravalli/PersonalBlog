---
title: 'Limite delle Sessioni Telnet'
description: 'Limite Sessioni Telnet'
pubDatetime: 2008-12-11
ogImage: '/assets/libri.webp'
tags: ['Linux', 'xinetd', 'telnetd', 'sessions']
---

So che è una cosa insana, ma purtroppo alcuni clienti tendono ad usare solo ed esclusivamente il vecchio e glorioso telnet.

Le sessioni telnet sono limitate, almeno quelle gestite via xinetd. In particolare sulla RedHat Enterprise 5, tale limite è settato ad un massimo di 50.

Per variarlo, incrementarlo o diminuirlo, basta editare il file di configurazione di xinetd (/etc/xinetd.conf) ed alla riga *instance = cambiare il valore*. Qui uno spezzato del file:
```c
# Define access restriction
defaults {
    max_load   = 0
    cps        = 50 10
    instances  = 250
    per_source = 10
}
```
Tale valore non è strettamente legato al telnet, bensì al numero di istanze dello stesso programma che xinetd può lanciare e quindi se fate partire altri servizi tramite xinetd, incrementerrano o diminueranno anche per loro le istanze possibili.