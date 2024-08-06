---
title: 'Git: Rinominare il branch locale e remoto'
description: 'Git: Rinominare un branch'
pubDatetime: 2022-12-06
ogImage: '/assets/git.webp'
tags: ['Git', 'Versioning', 'Branch', 'Easy']
---

Immaginate questo scenario: state lavorando a un progetto, create un nuovo branch su cui operare e scrivete il vostro codice, effettuando i commit necessari nonchè i push. Ma, ad un certo punto, vi accorgete che il nome che avete scelto per il branch non è più adatto.

Siete fortunati, Git permette di rinominare il branch molto facilmente, usando il comand >git branch -m

Questa breve guida spiega come rinominare sia il branch locale che quello remoto.

## Rinominare il Branch

01. Iniziate col posizionarvi sul branch che desiderate rinominare:
```sh
> git checkout <old_name>
```

02. Rinominate il branch locale:
```sh
> git branch -m <new_name>
```
A questo punto, avete rinominato il branch localmente.
Se avevate già caricato il branch <old_name> sul repository remoto, proseguite con gli step successivi per rinominare il branche remoto.

03. Effettuate il push del branch locale e il reset dell'upstream
```
> git push origin -u <new_name>
```

04. Eliminate il vecchio branch remoto
```
> git push origin --delete <old_name>
```

Questo è tutto: avete rinominato sia il branch locale che quello remoto.

## Conclusioni
I branch fanno parte del processo di sviluppo di un software, ed è possibile rinominarli. Tuttavia non è possibile rinominare direttamente un branch remoto; è necessario rinominarlo localmente, effettuarne il push ed eliminare il branche con il vecchio nome.
