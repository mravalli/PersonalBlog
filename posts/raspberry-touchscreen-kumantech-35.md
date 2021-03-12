---
title: 'Raspberry & TouchScreen KumanTech 35'
short: 'Raspberry & TouchScreen KumanTech 35'
date: '2017-06-06'
image: '/images/libri.webp'
tags: ['Chromium', 'GPIO17', 'HyperCube', 'Kernel', 'Kuman', 'Linux', 'OctoPrint', 'Raspberry Pi', 'Raspbian', 'RPi', 'SC06-3.6TFT-UK', 'Touchscreen', 'TouchUI']
---

Recentemente ho [acquistato](https://www.amazon.it/gp/product/B01CNLYL1C/ref=oh_aui_detailpage_o02_s00?ie=UTF8&psc=1) un display con touchscreen da integrare sul Raspberry Pi che mi controlla la **[stampate 3D](https://www.thingiverse.com/thing:1752766)**. Così, giusto per poter fermare la stampa lanciata da web senza dover riprendere il computer.  
Seguendo [questa](https://github.com/BillyBlaze/OctoPrint-TouchUI/wiki/Setup:-Boot-to-Browser-(OctoPi-or-Jessie-Light)) guida, con il touchscreen in mio possesso si arriva ad avere un sistema non funzionante, ovvero un bellissimo quanto affascinante schermo bianco.  
Sul [sito del produttore ](http://www.kumantech.com/art/technical-faq_a0052.html)c’è un laconico “non aggiornate il kernel” ma, senza aggiornamento, addio browser Chromium.  
Leggendo i log del kernel si nota che sia lo schermo che il touch cercano di prendersi lo stesso GPIO 17

>pinctrl-bcm2835 3f200000.gpio: pin gpio17 already requested by spi0.1; cannot claim for spi0.0

e da qui è partita la mia ricerca.

Ho scoperto che succede la stessa cosa con un altro schermo di fascia economica, del tutto simile a questo: un’[anima pia ](https://www.raspberrypi.org/forums/viewtopic.php?f=29&t=167934&start=200#p1141445)ha fatto un’analisi del driver di quest’ultimo con l’ultimo kernel disponibile per raspbian (4.9) e ha scoperto che esso prenota l’interrupt per il touchscreen e poi, quando il kernel carica nuovamente il driver del touchscreen come gli viene imposto nel file config.txt, tenta nuovamente di occupare lo stesso interrupt, non completando il caricamento dello schermo e nemmeno quello del touch.

La stessa cosa vale per questo touchscreen della Kuman.

In definitiva è bastato commentare la riga incriminata e tutto ha iniziato a funzionare come si deve!!

Ovvero:

>dtoverlay=tft35a:rotate=90  
>#dtoverlay=ads7846,cs=1,penirq=17,penirq_pull=2,speed=1000000,keep_vref_on=1,swapxy=1,pmax=255,xohms=60,xmin=200,xmax=3900,ymin=200,ymax=3900


