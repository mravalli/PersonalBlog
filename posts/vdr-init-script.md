---
title: 'vdr init script'
short: 'vdr init script'
date: '2010-07-10'
image: '/images/libri.jpg'
tags: ['Linux', 'VDR', 'init', 'inttab', 'daemontools']
---

vdr ed il caricamento dello stesso come servizio/demone non è complicato. Anzi, lo stesso autore di vdr ci mette a disposizione uno script che permette l’avvio di vdr e che con qualche opportuna modifica può diventare anche un servizio a se stante.  
Allora perchè scrivere un articolo sull’avvio di vdr?  
Perchè vdr si pianta (ogni tanto, da me giornalmente). E’ da notare inoltre che lo script “runvdr” dello stesso autore tiene conto di tale possibilità e riavvia il vdr automaticamente. Solo che lo fa un numero finito di volte.  
Dato che a me non funziona neanche la prima, come risolvo il problema? come riavvio vdr automaticamente?  
Semplice, con init.  
Funziona, esattamente come voglio ma nella singola riga inittab non posso mettere tutto l’elenco dei plugin e delle opzioni che mi servono.  
Allora provo con uno script sh, ma inittab me lo lancia n volte.  
No, non va.  
Ma oltre init c’è un altro sistema, i daemontools. Mi catapulto quindi su slackbuilds.org e scarico runit. Compilo, installo, configuro, creo il servizio e… stessa situazione ?  
mm, riedito lo script di runvdr, elimino tutto tranne quello che server per lanciare vdr ed elimino pure l’opzione -d che indica a vdr di girare come demone e questa volta va!!
Ed ecco qui lo script  
[codesyntax lang=”bash”]  
 #!/bin/sh  
 #  
 exec 2>&1

 VDROPTIONS=”-u vdr –no-kbd -l 3 -w 60″  
 VDRPLUGINS=”-P epgsearch -P vnsiserver”

 exec /usr/local/bin/vdr $VDROPTIONS $VDRPLUGINS  
[/codesyntax]  
Mi sa che ora funziona pure se lo metto in inittab, ma sono troppo prigro per togliere runit e rimettere le cose a posto -.-‘