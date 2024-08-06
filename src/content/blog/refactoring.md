---
title: 'Refactoring, quello buono'
description: Refactoring
pubDatetime: 2021-11-15
abstract: 'Cosa ritengo sia caratterizzante di un buon refactoring'
ogImage: '/assets/refactoring.webp'
tags: ['Agile', 'TDD', 'Integration Test', 'Developing']
---

L'**Agile**¹ manifesto, tra i suoi principi, ha quello di consegnare frequentemente software funzionante, con cadenza variabile da un paio di settimane a un paio di mesi, predeligendo periodi brevi.

Questo principio è molto importante e, a parer mio, getta le basi per il refactoring e le pratiche di *Continious Development* e *Continious Integration*.

È importante perché implica che ogni rilascio deve essere affidabile, imponendoci a rilasciare sempre software di qualità. E in più ci chiede di farlo in un periodo di tempo breve, così da obbligarci quasi ad intervenire su piccoli porzioni del nostro programma, abituandoci quasi automaticamente alla pratica del **Refactoring**

## Cos'è il refactoring
Il refactoring è quella pratica per cui si prende una porzione di codice, spesso legacy, e lo si aggiorna e riscrive utilizzando tecniche più innovative, introducendo magari paradgmini che ne semplifichino la complessità.

Riscrivere e rivedere codice scritto da altri (o da noi stessi, non fa alcuna differenza), ci aiuta a comprendere meglio ciò che si è fatto e a come migliorare quella determinata funzionalità oggetto del refactoring.

## Fine a se stesso
Se non si aderisce al manifesto **Agile**, si potrebbe obiettare che se una cosa funziona, non si tocca. E potrei non avere nulla in contrario a questa affermazione. Però verrà un momento in cui un bug salterà fuori o vorremo introdurre una qualche nuova funzionalità. E in quel momento ci renderemo conto che alcune cose potevano essere fatte diversamente, rese più efficienti, anche solo più leggibili.
Inotlre, spesso, offetto del refactoring è codice che va adeguato a nuove esigenze, che siano dell'ambiente di esecuzione o necessarie per l'interoperabilità con servizi terzi.

---

¹ **Agile**: *Il manifesto Agile individua quattro punti fondamentali nello sviluppo del software: gli individui e le interazioni fra essi, il software funzionante, la collaborazione con il cliente e la risposta al cambiamento. [Agile Manifesto](https://agilemanifesto.org/iso/it/manifesto.html)*
