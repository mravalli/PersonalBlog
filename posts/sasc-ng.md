---
title: 'Sasc-ng'
short: 'Sasc-ng'
date: '2009-11-27'
image: '/images/libri.jpg'
tags: ['Linux']
---

anche detto “softcam”, è un software che rende possibile la decodifica di un segnale satellitare criptato che può essere usato in vari casi, tipo :

- la scheda DVB-S(2) non è provvista  di Common Interface;
- non si ha voglia di comprare una Common Interface e la relativa CAM;
- si vuole condividere la propria carta su più sintonizzatori presenti sul proprio sistema (perfettamente legale anche se a volte dipende dal contratto che si è stretto con il proprio provider);
- si vuole partecipare al “cardsharing” attraverso internet (e questo si che è illegale).

In pratica sasc-ng si interpone tra la scheda DVB-S ed il nostro software preferito che utilizziamo per visionare i canali satellitari intervenendo in caso di segnali cryptati passando le richieste ad un terzo software che dialoga con la card del’abbonamento.

Sasc-ng è reperibile tramite svn direttamente su https://opensvn.csie.org/opensascng/open-sasc-ng/ e l’installazione è quella classica, ovvero configurazione, compilazione e compilazione dei moduli del kernel che creano una scheda sat fittizia.

L’unico problema che si può riscontrare è quello dovuto alla versione del compilatore che si intende usare, e che generalmente è dettato dalle scelte effettuato dal gestore della ditribuzione che usiamo. Inoltre, dato che sasc-ng sembra integrare un plugin per vdr, non si compila con la nuova versione di LinuxDVB inserita oramai di default nelle ultime release del kernel (S2API); vdr infatti richiede la pressenza  dei DVB API 3 mentre nei nuovi kernel, ad esempio il 2.6.29, siamo in presenza dei DVB API 5. Per ovviare a questo è necessario scaricare una revisione specifica di sasc-ng per la quale è stata realizzata una patch che permette l’utilizzo dei nuovi DVB headers, ovvero la 74. Per farlo:

scarichiamo il software

> svn co -r 74 https://opensvn.csie.org/opensascng/open-sasc-ng/ opensasc

scarichiamo la patch

> wget --no-check-certificate https://opensvn.csie.org/traccgi/opensascng/raw-attachment/ticket/43/Makefile.patch

ed applichiamola

> patch -p0 < Makefile.patch

Un altro problema potrebbe incorrere se la versione del compilatore che abbiamo è il GCC 4.4. Sasc-ng non si compila con tale versione senza un ulteriore patch, come da ticket -> [https://opensvn.csie.org/traccgi/opensascng/ticket/43](https://opensvn.csie.org/traccgi/opensascng/ticket/43)

quindi

> wget --no-check-certificate https://opensvn.csie.org/traccgi/opensascng/raw-attachment/ticket/43/gcc.patch patch -p0 < gcc.patch

A questo punto non basta far altro che compilare i sorgenti così ottenuti con i classici:

> ./configure make make module