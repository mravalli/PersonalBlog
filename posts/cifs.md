---
title: 'Cifs'
short: 'Cifs'
date: '2008-12-03'
image: '/images/libri.jpg'
tags: ['Linux']
---

Oramai si è passati de facto all’utilizzo del file system in oggetto per montare le directory condivise su computer windows o comunque tramite protocollo samba.

Non sto qui ad elencare differenze od eventuali migliorie, ma solo risolvere un problema che con smbfs non mi si è mai presentato, ovvero:

montata la condivisione in questione, scrittoci un file (qualsiasi) dopo un po’ a detto file vengon cambiati i permessi facendoli cambiare da un classico 0666 (o 0777) a -rwxrwSrwt rendendo così il file inutilizzabile per alcuni programmi.

Per risolvere ciò basta passare come parametri dir_mode=0777 e file_mode=0666.