---
title: 'Value Objects'
short: 'Value Objects'
abstract: 'Perchè un Value Objects non è un DTO'
publishedAt: '2022-10-01'
image: '/images/refactoring.webp'
tags: ['Design Pattern', 'General Concept', 'Developing', 'Motivation', 'Structure', 'Software Design']
---

A volte, i Value objects vengono confusi con i DTO. Questo perchè entrambi sono dei contenitori di dati ma con una sostanziale differenza: i DTO sono semplici contenitori di dati, senza alcuna logica significativa al loro interno. Servono a dare "concretezza" a un tipo di dati che potrebbe essere composto da uno o più scalari.

Un Value Object, invece, oltre a contenere il dato, si può occupare anche della sua rappresentazione.
Pensiamo a una classe "Currency": conterrà i dati necessari per rappresentare una valuta ma, potrebbe contenere dei metodi che ci restituiscono la sua rappresentazione con il simbolo della moneta, piuttosto che la sua rappresentazione a lettere.
Il dato che contiene, in fondo, é relativamente semplice, sono solo scalari, eppure può contenere la logica necessaria per rappresentarlo.

Prima ho affermato che i Value Objects sono contenitori di dati, ma non è propriamente così.
I Value Objects devono avere delle regole interne per validare il proprio stato: questo tipo di oggetti non devono mai trovarsi in uno stato "invalido", devono essere validati alla loro creazione e, se immutabili, non dovrebbero mai cambiare tale stato.

Un'altra interessante caratteristica è che, nonostante questo tipo di classi può essere salvato (ad es. in un database), esse non hanno un ruolo specifico nel nostro dominio, non hanno una "storia" ne un'identità (ID). Ad esempio, prendiamo il caso di un e-commerce che vende marmellate: la classe che rappresenta il prodotto, avrà una "storia" e un'indentità, ma la classe che rappresenta la quantità no, dato che magari non ci interessa avere una storia specifica di questo valore.

Un'altra caratteristica dei Value object é che, se confrontati, due value object sono uguali solo se i loro valori interni sono uguali.