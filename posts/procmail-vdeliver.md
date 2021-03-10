---
title: 'Procmail & vDeliver'
short: 'Procmail & vDeliver'
date: '2008-07-24'
image: '/images/libri.jpg'
tags: ['Procmail', 'Procmailrc', 'Qmail', 'SpamAssassin', 'vDeliver', 'vDeliver-PostDeliver', 'vDeliver-PreDeliver', 'vmailmgr']
---


Ho cercato in giro e non ho trovato granchè. La mia necessità era quella di poter utilizzare procmail su un dominio virtuale per un utente specifico (il mio) senza stravolgere l’installazione esistente di qmail con vmailmgr e mantenere invariate le funzionalità di quest’ultimo (come l’autoresponder).  
 Alla fine un pezzo qua, un pezzo là sono giunto a questo:  
 creare la direttiva specifica per l’utente, ovvero il file .qmail-<nome-utente>, con all’interno questo:

| /var/qmail/bin/preline /usr/bin/procmail /home/<dominio vmail>/users/<nome utente>/.procmailrc

ed inserire nel fil .procmailrc questo:

DEFAULT=/home/<dominio vmail>/users/<nome utente>/ LOGFILE=$DEFAULT/procmaillog SPAM=$DEFAULT/.spam/ :0 * ^X-Spam-Status: Yes $SPAM :0 | /usr/local/bin/vdeliver

tutto qui ?