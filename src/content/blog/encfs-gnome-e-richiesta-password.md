---
title: 'EncFS, Gnome e richiesta password'
description: 'EncFS, Gnome e richiesta password'
pubDatetime: 2008-09-25
ogImage: '/assets/libri.webp'
tags: ['Linux']
---

Come sapete [EncFS](http://www.arg0.net/encfs) non ha alcuna interfaccia grafica e risulta scomodo all’avvio della propria sessione (gnome) doversi montare in un secondo momento, aprendo magari da terminale, la partizione crittata.
Non sarebbe molto meglio avere almeno una rischiesta di password?
Ebbene ci viene in aiuto [zenity](http://live.gnome.org/zenity), il quale ci da la possibilità di creare finestre dandogli poche specifiche da riga di comando e ritornare il valore (in chiaro) nello stdout. A questo associamo l’opzione –extpass di encfs, tramite la quale quest’ultimo si attende la password come risultato dell’esecuzione del programma lanciato.
Il tutto si risolve quindi nel mettere `encfs ~/.encfs ~/encfs –extpass=”zenity –text=’Sblocca i documenti’ –entry –hide-text –title=’Inserire password'”` all’avvio della sessione e questo è il risultato ?
![](http://mario.raval.li/files/2012/02/encfs.png)
