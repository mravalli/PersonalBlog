---
title: 'Le proprietà ACID'
description: 'Solo un appunto sul significato dell’acronimo'
abstract: 'Le proprietà ACID definiscono il comportamento che un database dovrebbe rispettare nelle "transaction"'
pubDatetime: 2023-02-18
ogImage: '/assets/refactoring.webp'
tags: ['Transaction', 'ACID', 'SQL', 'Motivation', 'Structure', 'Software Design']
---

Durante l'esecuzione di una query su un database, per assicurarci la coerenza dei dati, possiamo fare affidamento
alle transazioni.

Quest'ultime, per essere definite tali e darci un certo livello di sicurezza, debbono rispettare le proprietà ACID:

**A** sta per Atomic: che la transazione deve essere eseguita del tutto o se per qualsiasi motivo ciò non è possibile la transazione subisce quello che viene chiamato un "rollback" e le modifiche già eseguite a tabelle e righe vengono annullate e la parte rimanente di la transazione viene ignorata.

**C** sta per Consistent: i risultati di una transazione devono essere coerenti soprattutto in situazioni di concorrenza (molto comuni in un sistema di database) in cui più transazioni sono intercalate e rischiano di operare su stati di dati incoerenti.

**I** sta per Isolated: a una transazione viene concesso l'isolamento nella sua esecuzione senza dipendere da altre transazioni; una proprietà molto utile data la natura altamente concorrente delle transazioni di database.

**D** sta per Durable: poiché i risultati una volta che il sistema del database concorda sullo stato della transazione devono essere permanenti e registrati come tali dagli interni del database.