---
title: 'Istruire SpamAssassin'
short: 'Istruire SpamAssassin'
publishedAt: '2019-09-13'
image: '/images/mail-boxes-filled-of-leaflets.webp'
tags: ['Linux', 'SpamAssassin', 'sa-learn', 'apprendimento', 'training']
---

Nella maggior parte delle installazioni in cui mi imbatto, il riconoscimento dello spam è delegato a SpamAssassin. Fa il suo sporco lavoro ma non è infallibile, anzi spesso capita di ritrovarsi inondati di spam che passa sotto il naso del filtro senza che questo batta ciglio.
Questo perché SpamAssassin non solo va aggiornato ma andrebbe anche istruito, ovvero gli si deve far capire anche cosa noi consideriamo spam.
Per farlo ci viene incontro il comando sa-learn.
>sa-learn --spam /<direcotry mail>/Maildir/.Junk
Con questo comando altro non facciamo che dire a sa-learn di considerare spam tutte le mail salvate nella cartella .Junk.
Ovviamente in detta cartella devono essere già spostate tutti le mail che abbiamo considerato come spam.
N.B. se utilizzate mbox come formato, il comando diventerà qualcosa tipo: **sa-learn --spam --mbox /var/spool/mail/junk**