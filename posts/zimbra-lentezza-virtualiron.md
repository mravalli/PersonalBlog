---
title: 'Zimbra, lentezza, VirtualIron'
short: 'Zimbra, lentezza, VirtualIron'
publishedAt: '2008-12-05'
image: '/images/libri.webp'
tags: ['CentOS', 'Disco', 'Disk', 'Lentezza', 'Slow', 'VirtualIron', 'Zimbra']
---

Oggi, ora, son arrivato alla soluzione di un problema che ha tormentato un mio cliente per quasi 3 settimane. In breve. C’è un’installazione della suite Zimbra (la versione grautita) su una macchina virtuale installata con la CentOS 4.5. Il sistema di virtualizzazione utilizzato è VirtualIron.

La lentezza è arrivata di punto in bianco, senza nessun motivo apparente o correlato. Dopo averci lavorato intensamente questi ultimi due giorni ed aver analizzato log, processi e quant’altro, aver fatto tutto ciò che mi consigliava la guida ufficiale di tuning modificando tutti i parametri interessati, stavo per buttare la spugna quando mi vien da pensare: ma non è che cerco il problema nel posto sbagliato?

Il problema in fondo era chiaro: la macchina si rallentava enormemente quando inizia a fare qualche accesso in più al disco.

Allora ho fatto una breve ricerca ed ho scoperto che VirtualIron per far girare efficentemente le macchine che ospita deve avere eguaglianza di versione dei suoi “vstools” installati con la versione di esso stesso.

Insomma, tutto il problema si è risolto semplicemente aggiornando i vstools ?