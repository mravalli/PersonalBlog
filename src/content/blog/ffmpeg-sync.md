---
title: 'ffmpeg sync'
description: 'ffmpeg sync'
pubDatetime: 2018-10-24
ogImage: '/assets/libri.webp'
tags: ['Fuffa']
---

Capita a volte che (anche dopo una conversione con lo stesso ffmpeg) l’audio e il video in un filmato non siano sincronizzati, ossia l’uno è in ritardo o in anticipo rispetto all’altro. Ho escogitato un metodo – a dire il vero piuttosto artigianale – per rimediare, e senza conversione, quindi senza perdere qualità.

Anzitutto dividiamo il problema in due casi:

1. l’audio è in ritardo rispetto al video
2. l’audio è in anticipo rispetto al video

Primo caso (il più semplice)

Poniamo di avere questo problema all’interno del file film.avi; ecco come procedere:

1) calcoliamo a quanto ammonta il ritardo (personalmente utilizzo mplayer per fare questo, pigiando il tasto + durante la riproduzione finchè audio e video risultano allineati). Poniamo che sia di 0.6 secondi.

2) Da terminale entriamo nella directory che ospita film.avi col comando cd

3) isoliamo il video del filmato così:
```sh
> ffmpeg -i film.avi -an -vcodec copy video.avi
```
4) isoliamo e tagliamo l’audio del filmato così:
```sh
> ffmpeg -i film.avi -ss 0.6 -vn -acodec copy audio.mp3
```
NOTA: assicurati di dare la corretta estensione al file audio; di solito è .mp3 oppure .m4a (come ad esempio l’estensione dei video di youtube, che hanno codec aac). Per l’opzione -ss inserire il valore del ritardo – nel nostro caso 0.6.

5) ricongiungiamo audio e video:
```sh
> ffmpeg -i video.avi -i audio.mp3 -vcodec copy -acodec copy titolo_del_file.avi
```
Secondo caso

Poniamo di avere questo problema all’interno del file film.avi; ecco come procedere:

1) calcoliamo a quanto ammonta il ritardo (personalmente utilizzo mplayer per fare questo, pigiando il tasto – durante la riproduzione finchè audio e video risultano allineati). Poniamo che sia di 0.6 secondi.

2) Da terminale entriamo nella directory che ospita film.avi col comando cd

3) Qui le cose si comlplicano perchè, a differenza di un flusso audio, ffmpeg non è in grado di tagliare con buona precisione un flusso video. Tagliamolo dunque di un tempo x superiore a quello di desincronizzazione x>0.6. Per esempio tagliamolo di 1 secondo:
```sh
> ffmpeg -i film.avi -ss 1 -an -vcodec copy video.avi
```
Siccome, come già detto, il taglio non è preciso, con un lettore (mplayer o ffplay con l’opzione -stats) verifichiamo quanto tempo effettivamente è stato tagliato. Supponiamo che sia 1.4 secondi.

4) Isoliamo e tagliamo il file audio con l’opzione -ss pari alla differenza tra il tempo effettivamente sottratto al video col comando precedente e il tempo di desincronizzazione originale, e cioè: 1.4-0.6=0.8. Quindi:
```sh
> ffmpeg -i film.avi -ss 0.8 -vn -acodec copy audio.mp3
```
NOTA: assicurati di dare la corretta estensione al file audio; di solito è .mp3 oppure .m4a (come ad esempio l’estensione dei video di youtube, che hanno codec aac). Per l’opzione -ss inserire il valore della sottrazione – nel nostro caso 0.8.

In poche parole non abbiamo fatto altro che ricondurre il secondo caso al primo.

5) ricongiungiamo audio e video:
```sh
> ffmpeg -i video.avi -i audio.mp3 -vcodec copy -acodec copy titolo_del_file.avi
```
NOTA: non ho sperimentato il metodo con tutti i tipi di file, ma visto che ffmpeg ha talvolta difficoltà nella gestione di alcuni codec, è possibile che non sempre funzioni.
 Ma coi file più comuni funziona nel 99% dei casi.

NOTA 2: se qualcosa non funziona potete provare a inserire l’opzione -ss dubito dopo il comando ffmpeg e subito prima dell’opzione -i. Ad esempio:
```sh
> ffmpeg -ss 1 -i film.avi -an -vcodec copy video.avi
```