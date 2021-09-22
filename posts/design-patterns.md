---
title: 'Che cosa è un Design Pattern'
short: 'Design Patterns'
date: '2021-05-04'
next: 'cenni-storici'
image: '/images/libri.webp'
tags: ['Design Pattern', 'General Concept', 'Developing', 'Motivation', 'Structure', 'Software Design']
---

***Disclaimer** Lungi da me voler insegnare cosa sia un Desgin Pattern e come sceglierlo. Ci sono voci ben più autorevoli della mia. Quello che andrete a leggere è più un riassunto di quanto io ne abbia compreso, prendendo a pien mani da varie risorse disponibili online*

I **Design Patterns** sono soluzioni tipiche a problemi comuni che si presentano nella progettazioni del software.
Sono da immaginare come dei progetti precompilati, personalizzabili, che ci aiutano a risolvere problemi ciclici che si presentano (o si presenteranno) nella stesura del nostro codice.
Non sono di certo dei pezzi di codice da copiare e incollare all'interno delle nostre funzioni e librerie. I pattern sono concetti di carattere generale che risolvono problemi specifici. Quindi, possiamo seguire i dettami del design scelto e implementare una soluzione che meglio aderisca al nostro programma.

I patterns sono spesso confusi con gli algoritmi, dato che ambedue i concetti descrivono una soluzione tipica per un problema conosciuto. Ma vi è una differenza sostanziale: mentre un algoritmo definisce sempre un chiaro set di azioni per raggiungere l'obiettivo, un patterm è la descrizione della soluzione. Un codice che rispetta lo stesso pattern, applicato a due differenti programmi può essere quindi differete.

Un analogia con un algoritmo la potremmo vedere in una ricetta da cucina: entrambi hanno degli step chiari per raggiungere l'obiettivo. Il pattern invece è più uno schema concettuale: possiamo vedere il risultato e le feature di cui sarà dotato, ma non l'esatto ordine di implementazione.

## In cosa consiste un pattern?
Molti pattern sono descritti in maniera così formale che possiamo riprodurli in molti contesti.
Generalmente, nella presentazione di un pattern, abbiamo questi punti:
- **Intent**, ovvero una breve introduzione nella quale si descrive sia il problema che la soluzione che si vanno ad affrontare;
- **Motivation**, dove si spiega qual'è stato il problema e la soluzione che ha reso possibile la creazione del pattern;
- **Structure**, nella quali si suddividono in classi le varie parti del pattern e si spiega come sono correlate tra loro;
- **Code Example**, in uno dei linguaggi più popolari, in modo da renderne semplice la comprensione delle idee che stanno dietro al pattern stesso.

Alcuni pattern presentano altri dettagli utili, come l'applicaiblità, gli step di implementazione e la relazione con gli altri pattern.