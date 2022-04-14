---
title: 'Proftpd e condivisione CIFS (Samba)'
short: 'Proftpd e condivisione CIFS (Samba)'
publishedAt: '2017-07-13'
image: '/images/libri.webp'
tags: ['Linux', 'ProFTPd', 'Samba', 'CIFS', 'Condivisione', 'Permission Denied', 'ChMod']
---

Succede che ho acquistato uno spazio slegato dal server su cui si può accedere in tre modi: sftp, webdav e cifs.Insomma, c'è tutto quello che serve tranne l'FTP
Allora ho pensato bene di "montare" tramite CIFS questo spazio su una directory a cui poter accedere successivamente tramite Proftpd.Fin qui alcun problema: mi loggo, riesco a caricare ed eliminare singoli files senza alcun impedimento, sino a quando provo a creare una directory. Giammai, permission denied.Inizio quindi a fare le mille verifiche del caso, permessi, configurazione di Proftpd, utenti utilizzati, ma niente.Passo quindi alla ricerca della documentazione e scopro che Proftpd, ad ogni tentativo di scrittura, tenta l'uso di chmod, cosa non possibile con SMB la cui versione sia inferiore alla 3 e che ritorna come errore **permission denied**.

Fortunatamente c'è la soluzione, ovvero passare in fase di montaggio della condivisione SMB l'opzione noperm, che non fa altro che dire al sistema di ignorare i permessi.

>//x.x.x.x/share /mnt/share cifs iocharset=utf8,file_mode=0664,dir_mode=0775,noperm 0 0

E niente, ora funziona tutto *like a charm*