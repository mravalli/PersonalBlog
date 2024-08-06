---
title: 'Tivoli Storage Manager Scheduler Client & Systemd'
description: 'TSM Scheduler Client & Systemd'
pubDatetime: 2012-11-30
ogImage: '/assets/libri.webp'
tags: ['Linux']
---

Per chi fosse interessato a far girare sotto le moderne distribuzioni, che utilizzano systemd come gestore di avvio dei processi di sistema, lo scheduler del TSM (Tivoli Storage Manager), qui di seguito trovate lo Unit da creare che avvierà tale scheduler e lo riavvierà qualora morisse, ipotesi tutt’altro che rara.

## Unit
Per prima cosa va creato lo unit file sotto la directory /etc/systemd/system :
```c
[Unit]
  Description=Dsm Scheduler
  After=syslog.target network.target

[Service]
  Type=forking
  PIDFile=/var/run/dsmsched.pid
  ExecStart=/usr/local/sbin/dsmsched.sh
  Restart=always

[Install]
  WantedBy=multi-user.target
```
dove diamo una descrizione (Description) e indichiamo dopo quali servizi deve partire (After). Informiamo Systemd che lo script (perché di uno script si tratta) si chiuderà subito, qual’è il PID che deve monitorare, lo script da lanciare e che va riavviato in caso muoia. Inoltre gli indichiamo pure in quale target va installato.
Io questo file l’ho chiamato **dsmsched.service**.

## Script
Dobbiamo creare quindi uno script che ci lanci lo scheduler vero e proprio dato che quest’ultimo, di suo, non crea il PID:
```sh
#!/bin/sh
nohup dsmc sched 2>&1 > /dev/null &PID=$(ps -ef | grep “dsmc sched” | grep -v “grep” | awk {‘print $2’});
echo $PID > /var/run/dsmsched.pid
```
dove nel primo rigo (saltando ovviamente il bin/sh) lanciamo lo scheduler come normalmente faremmo da inittab (o da dove l’abbiate mai lanciato), nel secondo ricaviamo il PID interrogando i processi attivi e conseguentemente lo scriviamo nel file delegato a contenerlo.
Questo file io l’ho nominato dsmsched.sh e come avrete già visto nel file unit precedente, l’ho posizionato sotto /usr/local/sbin

##Completiamo
A questo punto non ci resta che rendere eseguibile lo script:
```sh
chmod +x /usr/local/sbin/dsmsched.sh
```
e far caricare il nuovo file unit a systemd, abilitarlo per l’avvio e naturalmente avviarlo:
```sh
systemctl load dsmsched.service
systemctl enable dsmsched.service
systemctl start dsmsched.service
```
se tutto è andato bene al comando systemctl status dovremmo avere un output simile a questo:
```sh
systemctl status dsmsched.service
  dsmsched.service – Dsm Scheduler
  Loaded: loaded (/etc/systemd/system/dsmsched.service; enabled)
  Active: active (running) since Thu, 29 Nov 2012 16:02:45 +0100; 22h ago
  Main PID: 1505 (dsmc)
  CGroup: name=systemd:/system/dsmsched.service
          └ 1505 dsmc sched
```
se così non è, perché ad esempio quando ne avete effettuato lo start, molto probabilmente c’è qualche errore all’avvio dello scheduler stesso, quindi vi consiglio di eseguire magari lo script dsmsched.sh da shell e verificare i messaggi che ritorna in output (se non ne da, togliete la redirezione a /dev/null)

## Considerazioni finali
Systemd è stato oramai adottato dalle maggiori distribuzioni che puntano sull’innovazione (no debian non ne fa, è debian) (si, neanche slackware..). E’ multithread, sfrutta i cgroups, è veloce all’avvio e un fulmine allo spegnimento. Riavvia i servizi da solo se istruito per farlo e fa anche molto altro, come avviare sottoprocessi, monitorare gli stessi, inviarci una mail, ect.
C’è e allora perché non conoscerlo e iniziarlo a sfruttare al pieno delle sue potenzionalità?