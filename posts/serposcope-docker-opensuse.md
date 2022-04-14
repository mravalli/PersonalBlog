---
title: 'Serposcope, Docker & OpenSuSE'
short: 'Serposcope, Docker & OpenSuSE'
publishedAt: '2017-08-02'
image: '/images/libri.webp'
tags: ['Docker', 'java', 'jvm', 'Linux', 'OpenSuSE', 'Semplicità', 'Serposcope']
---

Ieri, in un momento di pausa, ho letto [questo](https://www.ingegnerealbano.com/usare-serposcope-dentro-un-container-docker-vivere-felici-contenti/) breve ma interessante articolo in cui si parla di come usare Serposcope in un container Docker.

Sulle prime ho pensato “per quale motivo installare Serposcope all’interno di un contenitore quando basta avere java installato sulla macchina per avviarlo con un semplicissimo comando?!”.  
 E subito dopo ho pensato “java???! Ma non ho nessuna intenzione di installare una jvm sul mio server”.


## Ecco perché server Docker.

Con docker posso permettermi di usare su una macchina virtualmente separata non solo jvm ma diverse versioni dello stesso. Posso quindi separare due versioni dello stesso framework senza che uno confligga con l’altro. Insomma posso separare in modo più veloce e pulito ambiente di sviluppo con ambiente in produzione sullo stesso server.

Certo, questo in ambienti piccoli, dove non si ci può permettere di avere due o più server fisicamente separati.

Ma le potenzialità non si fermano a questo, ovvero si rende più facile distribuire il proprio software nel proprio ambiente senza curarsi di dove andrà installato.

Ma questa è un’altra storia.


## I comandi usati sono stati

> zypper in docker  
>  systemctl enable docker  
>  systemctl start docker  
>  docker pull serphacker/serposcope  
>  docker run -d -p 7134:7134 –name serposcope serphacker-serposcope

e a questo punto vi troverete serposcope che “gira” sulla porta 7134.

Insomma, più semplice di così!!


