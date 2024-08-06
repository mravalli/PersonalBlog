---
title: 'Error: 0x80070005 access denied when creating a new task'
description: 'Error: 0x80070005 access denied when creating a new task'
pubDatetime: 2010-05-13
ogImage: '/assets/libri.webp'
tags: ['Windows', 'Windows Server 2003', 'Tasks', 'Scheduling', 'Diritti', 'Permessi']
---

Mi è successo che windows 2003 si rifiuti di farmi creare nuove schedulazioni di batch ed in base al codice di errore , 0x80070005 appunto, ho cercato e googlato.
Per microsoft è un problema di diritti di esecuzione e ti consigliano di controllare che l’utente con il quale tenti di eseguire l’operazione abbia il permesso di esecuzione del programma resposnabile, ovvero di cmd.exe; ma io sto usando administrator e quindi questa soluzione non mi è servita granchè anche se ho comunque controllato che il gruppo administrators avesse tali diritti.
Dato che anche io ero convinto fosse un problema di diritti ho pensato che la cartella che contiene i tasks fosse in sola lettura, ma dato che è una cartella “speciale”, da esplora risorse non ti da la possibilità di controllarne i diritti. Ho ricorso quindi ad un escamotage, ovvero mapparmi la cartella come unità di rete e resettare i diritti da lì, ovver con:
```sh
> net use t:: localhostc$windowstasks /persistent:no
```
A questo punto è bastato andare sulle proprietà di T e verificare che il gruppo administrator avesse il permesso di creare nuovi file, cosa che non aveva.
Risolto il problema, mi son chiesto: perchè questa cartella ha i diritti scombussolati? Presto detto. Queste macchine su cui sto lavorando hanno preso tanti di quei virus ed uno degli ultimi era quello che si propagava mettendosi in schedulazione in tale cartella (ora me ne sfugge il nome) e la soluzione per impedirne la propagazione era proprio rendere impossibile la scrittura in tale cartella..
