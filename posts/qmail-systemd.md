---
title: 'Qmail & systemd'
short: 'Qmail & systemd'
date: '2012-11-30'
image: '/images/libri.webp'
tags: ['Linux', 'Qmail', 'Systemd']
---

Perché? E perché no!

Insomma, ok, far partire qmail tramite **sysv** non era il massimo. Anzi sono pienamente convinto che i daemontools sono <span style="text-decoration: underline;">necessari</span>. Se non si ha a disposizione altro..

E poi a me non piace avere software duplicato sulla macchina, voglio solo un sistema che mi avvii e spenga i processi, non due o tre differenti tra loro, che magari tengo solo per <span style="text-decoration: underline;">**prigrizia**</span>.

E allora? Allora ho convertito gli script utilizzati dai **daemontools** per avviare **qmail** con **systemd:**

**Unit Files**

Creiamo gli unit files necessari sotto la directory */etc/systemd/system* :

***qmail-send.service***

> [Unit]  
>  Description=Qmail Delivery service  
>  After=syslog.target network.target
> 
> [Service]  
>  Type=forking  
>  PIDFile=/var/run/qmail-send.pid  
>  ExecStart=/var/qmail/rc.systemd  
>  Restart=always
> 
> [Install]  
>  WantedBy=multi-user.target

 

***qmail-smtd.service***

> [Unit]  
>  Description=Qmail Receiver service  
>  After=syslog.target network.target
> 
> [Service]  
>  Type=forking  
>  PIDFile=/var/run/qmail-smtd.pid  
>  ExecStart=/var/qmail/smtpd.systemd  
>  Restart=always
> 
> [Install]  
>  WantedBy=multi-user.target

dove diamo una descrizione (*Description*) e indichiamo dopo quali servizi deve partire (*After*). Informiamo *Systemd* che lo script (perché di uno script si tratta) si chiuderà subito, qual’è il PID che deve monitorare, lo script da lanciare e che va riavviato in caso muoia. Inoltre gli indichiamo pure in quale *target* va installato.

**Scripts**

Dobbiamo creare quindi gli scripts che ci avvieranno qmail-send e qmail-smtp che di creare i files pid non ci pensano proprio:

***rc.systemd***

> #!/bin/sh
> 
> # Using splogger for logging  
>  # Using control/defaultdelivery from qmail-local to deliver messages by default
> 
> exec env – PATH=”/var/qmail/bin:$PATH”  
>  qmail-start “`cat /var/qmail/control/defaultdelivery`” splogger qmail-send > /dev/null 2>&1 &  
>  pidof qmail-send > /var/run/qmail-send.pid

dove nel primo rigo (saltando ovviamente il bin/sh e i commenti) lanciamo lo qmail-start come normalmente faremmo e nel secondo ricaviamo il PID interrogando i processi attivi e conseguentemente lo scriviamo nel file delegato a contenerlo.

***smtpd.systemd***

> #!/bin/sh
> 
> # Varie cose che dipendono dalla vostra installazione di Qmail
> 
> exec /usr/local/bin/softlimit -m “$SOFTLIMIT”  
>  /usr/local/bin/tcpserver -v -R -l “$LOCAL”  
>  -x /etc/tcp.smtp.cdb -c “$MAXSMTPD”  
>  -u “$QMAILDUID” -g “$NOFILESGID” 0 smtp  
>  /var/qmail/bin/qmail-smtpd 2>&1 &  
>  PID=$(ps -ef | grep “tcp.smtp.cdb” | grep -v “grep” | awk {‘print $2’});  
>  echo $PID > /var/run/qmail-smtpd.pid

dove nel primo rigo (saltando ovviamente il bin/sh e i commenti) lanciamo lo qmail-smtpd tramite tcpserver, come normalmente faremmo e nel secondo ricaviamo il PID interrogando i processi attivi e conseguentemente lo scriviamo nel file delegato a contenerlo.

Questi files li ho posizionate nella directory di Qmail, ovvero /var/qmail.

**Completiamo**

A questo punto non ci resta che rendere eseguibile gli scripts:

> :~# chmod +x /var/qmail/rc.systemd  
>  :~# chmod +x /var/qmail/smtpd.systemd

e far caricare il nuovo file unit a systemd, abilitarlo per l’avvio e naturalmente avviarlo:

> :~# systemctl load qmail-send.service  
>  :~# systemctl load qmail-smtpd.service  
>  :~# systemctl enable qmail-send.service  
>  :~# systemctl enable qmail-smtpd.service  
>  :~# systemctl start qmail-send.service  
>  :~# systemctl start qmail-smtpd.service

se tutto è andato bene al comando *systemctl status* dovremmo avere un output simile a questo:

> :~# systemctl status qmail-send.service  
>  qmail-send.service – Qmail Delivery service  
>  Loaded: loaded (/etc/systemd/system/qmail-send.service; enabled)  
>  Active: **active (running)** since Thu, 29 Nov 2012 16:02:46 +0100; 22h ago  
>  Main PID: 1725 (qmail-send)  
>  CGroup: name=systemd:/system/qmail-send.service  
>  ├ 1725 qmail-send  
>  ├ 1728 splogger qmail-send  
>  ├ 1729 qmail-lspawn ./.maildir/  
>  ├ 1730 qmail-rspawn  
>  ├ 1731 qmail-clean  
>  ├ 1732 qmail-todo  
>  └ 1733 qmail-clean
> 
> :~# systemctl status qmail-smtpd.service  
>  qmail-smtpd.service – Qmail Receiver Service  
>  Loaded: loaded (/etc/systemd/system/qmail-smtpd.service; enabled)  
>  Active: active (running) since Thu, 29 Nov 2012 16:02:45 +0100; 23h ago  
>  Main PID: 1718 (tcpserver)  
>  CGroup: name=systemd:/system/qmail-smtpd.service  
>  └ 1718 /usr/local/bin/tcpserver -v -R -l mx2.corfilac.it …

se così non è, perché ad esempio quando ne avete effettuato lo start, molto probabilmente c’è qualche errore al lancio dello script stesso, quindi vi consiglio di eseguire magari gli scripts da shell e verificare i messaggi che ritorna in output.

**Log**

Importantissimi per qualunque tipo di controllo o debug, non possiamo dimenticarci dei log.

Se utilizzavate splogger, avrete tutto già configurato al meglio. Se come me, utilizzavate **multilog** sappiate che non c’è modo di rifarlo andare con **systemd.**

Poco male in fondo.

I messaggi di qmail-send andranno direttamente nel file di log *mail* presente in pratica in tutte le distribuzioni.

Bisognerà addestrare solamente il logger di sistema per reindirizzare l’output di qmail-smtp in un file apposito magari.

Se usate **rsyslog** basterà aggiungere le seguenti informazioni nel suo file di configurazione, magari a seguire della sezione mail, ovvero dopo la riga contentente mail.err:

> if ($programname == ‘smtpd.systemd’)  
>  then -/var/log/mail.smtpd  
>  & ~

A questo punto è buono informare della presenza del nuovo file anche **logrotate**. Quindi aprite il file di configurazione interessato, in genere */etc/logrotate.d/syslog*, andate alla riga dove son presenti tutti gli altri mail e aggiungete */var/log/mail.smtpd.*

Tutto qui!

**Considerazioni finali**

**Systemd** è stato oramai adottato dalle maggiori distribuzioni che puntano sull’innovazione (no debian non ne fa, è debian) (si, neanche slackware..). E’ multithread, sfrutta i *cgroups*, è veloce all’avvio e un fulmine allo spegnimento. Riavvia i servizi da solo se istruito per farlo e fa anche molto altro, come avviare sottoprocessi, monitorare gli stessi, inviarci una mail, ect.

C’è perché non conoscerlo e iniziarlo a sfruttare al pieno delle sue potenzionalità?