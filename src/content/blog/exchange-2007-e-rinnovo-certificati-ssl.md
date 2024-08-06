---
title: 'Exchange 2007 e rinnovo certificati SSL'
description: 'Exchange 2007 e rinnovo certificati SSL'
pubDatetime: 2009-08-25
ogImage: '/assets/libri.webp'
tags: ['Certificati', 'Exchange', 'openSSL', 'SSL', 'Windows']
---

Mio malgrado ho a che fare con Exchange2007. Questa sottospecie di server di posta per abilitare determinate funzionalità o semplicemente implementare un pò di sicurezza, ha necessità che vi siano installati dei certificati validi concessi da un’autorità di certificazione. Ho provveduto a suo tempo a crearli tramite [cacert.org](https://www.cacert.org "CAcert.org"), il quale da la possibilità si di crearli gratuitamente, ma con una scadenza breve, di appena 6 mesi.

La creazione è semplice, basta seguire le istruzioni di technet per la creazione della richiesta ed ottenere il certificato con la chiave privata. Il rinnovo un po meno, in quanto la chiave privata non è inclusa nel nuovo certificato rilasciato da cacert e quindi quando esegui la procedura di importazione su exchange, quest’ultimo dapprima si cala il certificato ma quando gli chiedi di utilizzarlo ti informa che non può usarla per la mancanza appunto della “chiave privata”, anche se quest’ultima non è cambiata, ma in pratica è impossibile dirgli che la deve riutilizzare.

Cercando su google e leggendo mailing list and co., sono approdato all’unica soluzione (macchinosa) razionale: inserire nel nuovo certificato la chiave privata in modo che ad exchange piaccia e non faccia storie.

Il problema sta nell’avere o meno la chiava privata. Se, sapendo preventivamente l’inghippo, ne abbiamo una copia subito disponibile, basterà tramite openssl ricreare il certificato in formato pkcs12 nel quale includeremo sia la chiave privata sia il certificato, altrimenti dobbiamo:

- esportare la chiave precedente (presumibilmente in scadenza se non già scaduta) in formato pkcs12 (.pfx) tramite l’mmc apposita di windows ed il relativo wizard ricordandoci di includere la chiave privata;
- esportare dal pfx la chiave privata tramite openssl;
- ricreare il pfx includendo la chiave privata ed il certificato rinnovato sempre tramite openssl;
- importare sempre tramite mmc la nuova chiave;
- dirgli ad exchange di usare il nuovo certificato.

Esportare la chiave precedente è relativamente semplice. Basta aprire un mmc ed aggiungere la gestione certificati. Selezionare quello interessato, cliccarci col destro e nel menù contestuale selezionare esporta. Il wizard vi guiderà nel’esportazione del certificato chiedendovi appunto se volete inserire la chiave privata e se desiderate la crittografia. Vi chiederà inoltre di inserire una password, in modo da rendere un tantino sicuro questo file.

Una volta ottenuto il pfx basterà usare openssl per esportare la chiave privata tramite il comando:
```sh
> openssl pkcs12 -in <nome file.pfx> -nocerts -out <private.key>
```
ci chiederà quindi la password che abbiamo inserito in fase di esportazione e la passphrase che originariamente abbiamo inserito quando abbiamo creato il certificato la prima volta. Fatto questo avremo un file (private.key) contenente  la chiave privata.

Creiamo quindi il nuovo pfx contenente il nuovo certificato:
```sh
> openssl pkcs12 -export -out <certificato.pfx> -inkey <private.key> -in <certificato.cer> -certfile CAcert.crt
```
dove certificato.cer è il certificato che l’autorità di certificazione ci ha fornito in formato testo e cacert.crt è il certificato root dell’autorità stessa.

A questo punto ci ritroviamo un nuovo pfx (certificato.pfx) contenente sia chiave privata che certificato. Per importarlo basterà andare nell’mmc precedente ed seguire il wizard d’importazione.

Ora non rimane che dirgli ad exchange di utilizzare tale chiave. Per farlo bisognerà utilizzare la management shell e digitare i seguenti comandi:
```sh
> get-exchangecertificate
```
che ci darà un elenco dei certificati disponibili
```sh
> enable-exchangecertificate -thumbprint <numeroesadicimaleidentificato> -services "IMAP,POP,SMTP"
```
dove numeroesadicimaleidentificativo è il thumbprint del certificato (lo si può vedere anche dalla gestione certificati aprendo il certificato e selezionando i dettagli) e services è l’elenco dei servizi su cui vogliamo abilitare il certificato.

Utto qui?
