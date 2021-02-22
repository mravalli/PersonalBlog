---
title: 'Come formattare le date in Vue.js'
short: 'Vue: formattare le date'
date: '2020-11-04'
image: '/images/Time-and-Date.png'
tags: ['vue', 'date', 'i18n', 'localization']
---

È da un po di tempo che sto cercando di rimpiazzare tutto il codice che prima scrivevo con jQuery in Vue, piuttosto che iniziare i nuovi progetti direttamente con Vue come unico frontend.

Vue, a differenza di altri framework, è veramente focalizzato sul rimanere il più leggero e veloce possibile, lasciando allo sviluppatore la scelta (e lo sviluppo) di tutte quelle *"feature"* che non sono considerate così importanti da essere inserite nel progetto principale.

Una di queste è la formattazione delle date.

Cercando online, per vedere come chi, più bravo di me, ha affrontato questo genere di problematica, mi sono imbattuto su un [post](https://jerickson.net/how-to-format-dates-in-vue/) di Joe Erickson.
Sostanzialmente lui, dapprima ha provato a sfruttare le proprietà calcolate ma si è da subito reso conto che non è la soluzione migliore: ad esempio,  se la data da formattare si trova all'interno di un array di oggetti, diventa complicato gestirle.
Allora ha pensato di creare un componente che, di volta in volta, formattasse la data ma, questo significa, doverla richiamare ogni qualvolta se ne ha bisogno, mentre la soluzione migliore sarebbe avere una funzione che ci formatta la data in tutti i nostri componenti.

La soluzione quindi potrebbero essere i filtri.

## Vue Filters

I filtri sono dei metodi che ci servono a facilitare la formattazione dei dati nella vista. Ad esempio:

> {{ nome | capitalize }}

dove **nome** è la variabile che **capitalize** è il filtro che vogliamo applicare.

Questa sembra essere la soluzione migliore quindi: abbiamo la data e possiamo formattarla in base alle nostre esigenze direttamente nella vista.

## Un Semplice Filtro per Vue

Eccone uno: https://github.com/vuejs-community/vue-filter-date-format

Questo filtro prende la data e la restituisce nel formato che ci interessa. L'importante è che la data sia un oggetto di tipo *Date*. Se così non fosse, lo stesso autore ha pensato di creare un altro filtro che ne fa l'interpretazione e la conversione: https://github.com/vuejs-community/vue-filter-date-parse

> {{ '2020-11-04' | dateParse('YYYY-MM-DD') | dateFormat('MMMM D, YYYY') }}

La cosa carina di questi filtri è che non fanno utilizzo di alcuna libreria supplementare, sono estremamente leggeri e utilizzano le funzioni standard dell'oggetto javascript *Date*.
