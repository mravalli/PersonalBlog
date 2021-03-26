---
title: 'Google Music Manager & OpenSuSE'
short: 'Google Music Manager & OpenSuSE'
date: '2013-08-29'
image: '/images/libri.webp'
tags: ['Dipendenza', 'Google Music Manager', 'Linux', 'OpenSuSE', 'Pacchetti mancanti', 'qWebKit']
---

Avete provato a installare [Google Music Manager](https://play.google.com/music/listen#/manager "Google Music Manager") su [OpenSuSE?](http://www.opensuse.org "Sito web Ufficiali openSUSE")

Sì, non si installa. Cerca un pacchetto (qtwebkit) che apparentemente tale distribuzione non fornisce.

In realtà, openSUSE, ha già questo pacchetto e quindi le relative librerie necessarie. Si chiama

E allora?

Allora nulla, installatelo ugualmente ignorando tale segnalazione errata.

Per farlo, scaricate il pacchetto da Google (alla richiesta di aprirlo con il gestore dei pacchetti, selezionate di scaricare il file), e digitate da terminale questo comando, dopo esservi posizionati nella cartella dove è stato scaricato detto pacchetto (generalmente ~/Scaricati):

`sudo zypper in google-musicmanager-beta_current_x86_64.rpm`

da notare che io ho la versione a 64bit dell’openSUSE. Se avete la versione a 32bit, il comando è questo:

`sudo zypper in google-musicmanager-beta_current_i386.rpm`

A questo punto il sistema vi chiederà:

>Problem: nothing provides qtwebkit needed by google-musicmanager-beta-1.0.71.8015-0.x86_64<br></br>
>Solution 1: do not install google-musicmanager-beta-1.0.71.8015-0.x86_64<br></br>
>Solution 2: break google-musicmanager-beta-1.0.71.8015-0.x86_64 by ignoring some of its dependencies
>
>Choose from above solutions by number or cancel [1/2/c] (c):

digitate 2, ovvero ignorate tale mancanza. Successivamente confermate e Google Music Manager è pronto a entrare in funzione.  
 Buon Ascolto ?
