---
title: 'Incrementare il limite degli allegati'
description: 'Incrementare il limite degli allegati'
pubDatetime: 2008-06-24
ogImage: '/assets/libri.webp'
tags: ['Allegati', 'Attachment', 'Max File Size', 'Zimbra', 'XServer']
---


Lo so che non fanno bene allegati troppo grandi, ma la richiesta da parte degli utenti, ignari dei processi che devono girarci dietro, è pressante e quindi tant’è.
 Bisogna semplicemente accedere come root ed eseguire:
```sh
su - zimbra
zmprov mcf zimbraMtaMaxMessageSize 5000000
zmprov mcf zimbraFileUploadMaxSize 5000000
```
incrementando così a circa 5Mb.
