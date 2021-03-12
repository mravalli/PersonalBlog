---
title: 'Systemd & php-cgi'
short: 'Systemd & php-cgi'
date: '2012-02-15'
image: '/images/libri.webp'
tags: ['Linux', 'fastcgi', 'nginx', 'OpenSuSE', 'php-cgi', 'Systemd']
---

**Una piccola introduzione**

Il sistema di avvio dei servizi dei sistemi unix like è, senza ombra di dubbio, efficiente e semplice. Permette a chiunque abbia interesse di capire come funziona ed apportare le modifiche necessarie per variare la sequenza di avvio a proprio piacimento. Però è vecchio, o meglio, gli manca qualcuna di quelle funzionalità che, per carità, posson esser ottenute con vari espedienti, ma tali rimangono.

Ad esempio una di queste mancanze è il riavvio automatico di un servizio che magari è morto durante l’esecuzione. Mi viene in mente subito Qmail, che, per un motivo o per l’altro può muorire, ed è necessario, per l’ovvia necessità di dare una continuità al servizio, riavviarlo subito. Per fare questo si opta generalmente a far avviare qmail tramite svscan, ovvero tramite i [daemontools](http://cr.yp.to/daemontools.html).

I daemontools però per nulla si integrano con SystemV.

Avendo la necessità di utilizzare questa funzionalità, ma non volendo aggiungere i daemontools, ho pensato bene di studiarmi cosa il nuovo sistema di avvio [systemd](http://www.freedesktop.org/wiki/Software/systemd) oramai di serie su openSUSE 12, e quindi sui server che mantengo.

**Systemd**

Systemd è nient’altro che un gestore dei servizi e di sistema per Linux, compatibilie con SysV e LSB, o, come lo ha definito il suo stesso autore, è un processo che fa da babysitter a tutti gli altri avviati tramite lui.

Systemd permette di avviare i servizi alla bisogna, un po come fa xinetd o udev, fornendo qualche funzione in più. Per saperne di più: http://www.freedesktop.org/wiki/Software/systemd.

**A cosa mi serve?**

Sto migrando i miei server da Apache a nginx dove il primo non mi è più necessario. Nginx non gestisce direttamente gli script php ma ha la necessità di girare le richieste o ad apache o ad un sistema fastcgi. Dato appunto che voglio rimpiazzare apache, ho messo su il secondo sistema utilizzando spawn-cgi che mi esegye php-cgi.

Spawn-cgi mi lancia con le opzioni necessarie php-cgi che, in attesa su un socket (o su una porta TCP) attende le richieste da parte nginx. Può quindi accadere (perchè mi è successo) che php-cgi muoia e mi tocchi riavviarlo. Inoltre, dato che è un comando generico da lanciare in command line, dovrei trovare un modo affidabile per rilanciare in automatico tale comando all’eventuale riavvio del server. Le opzioni che mi si presentavano erano quindi tre:

1. inserire il comando in /etc/inittab;
2. inserirlo negli script di avvio, tipo boot.local;
3. creare un nuovo servizio per systemd e delegargliene la gestione.

Nel primo caso avrei si ottenuto ciò che desideravo, magari anche con il respawn, ma non mi piace come soluzione. Nel secondo avrei si avviato php-cgi ma addio respawn se non artificioso. Ho quindi optato per la terza soluzione.

**Creare un nuovo servizio per systemd**

Ho cercato su google su come fare e le guide portono tutte ad una [pagina](https://fedoraproject.org/wiki/Packaging:Guidelines:Systemd) sul progetto fedora che spiega, più o meno, su come convertire uno script per SysV in un servizio per systemd. Diciamo che non è il massimo, ma è cmq un buon punto di partenza.

In pratica si tratta di creare un file di testo contenente le informazione necessarie per avviare il servizio e quando con il nome nel formato *<nome mnemonico del servizio>.service*.

Tale file contiene 3 sezioni: *Unit, Service e Install*.

In *Unit *dichiariamo che fa il servizio tramite il campo *Description* e quando farlo partire tramite i campi *After* e *Before.*

In *Service* dichiaramo il tipo di servizio (*Type*), cosa eseguire per avviarlo (*ExecStart*) o per riavviarlo (*ExecReload*), e, motivo per cui ho fatto tutto questo, in quale caso riavviarlo da solo (*Restart*).

In *Install* gli diciamo in quale contesto serve questo servizio (*WantedBy*)

Un esempio:

[Unit] Description=Breve descrizione di che fa questo servizio After=syslog.target (ovvero dopo che parte syslog) [Service] Type=... ExecStart=... ExecReload=... [Install] WantedBy=...

**php-cgi.service**

Quindi ecco di seguito il file che mi definisce php-cgi come servizio e me lo fa ripartire in automatico qual’ora muoia.

[Unit] Description=PHP cgi as service After=syslog.target network.target [Service] Type=forking PIDFile=/var/run/php-cgi.pid ExecStart=/usr/bin/spawn-fcgi -s /var/run/php-cgi.socket -u nginx -g nginx -f /usr/bin/php-cgi -P /var/run/php-cgi.pid Restart=always [Install] WantedBy=multi-user.target

Dove specifico che deve partire dopo aver raggiunto sia il target syslog che network, che una volta avviato va in background (*forking*), qual’è il file PID, che deve riavviarsi in qualsiasi situazione si venga a creare, sia che lo killo io (*retval 0*) sia che muoia per conto suo, e in quale target deve essere presente ed avviato, ovvero il multi-user

**Installiamo il servizio ed avviamolo**

****A questo punto basterà copiare il file appena creato dentro la cartella contenente tutti i servizi di systemd, ovvero dentro */lib/systemd/system*:

># cp php-cgi.service /usr/systemd/system

Verifichiamo che systemd lo veda correttamente:

># systemctl list-unit-files

Dovremmo ottenere un risultato tipo questo:

>ldconfig.service          masked
>loadmodules.service       masked
>local.service             static
>localfs.service           static
>php-cgi.service           enabled
>postfix.service           enabled
>poweroff.service          static
>proc.service              masked
>quotacheck.service        static
>quotaon.service           static
>random.service            static

Abilitiamolo:

># systemctl enable php-cgi.service

ed avviamolo:

># systemctl start php-cgi.service

Verifichiamo quindi che sia avviato:

># systemctl status php-cgi.service

risultato tipo:

>php-cgi.service - PHP cgi
>  Loaded: loaded (/lib/systemd/system/php-cgi.service; enabled)
>  Active: active (running) since Wed, 15 Feb 2012 12:15:49 +0100; 2h 58min ago
> Process: 12365 ExecStart=/usr/bin/spawn-fcgi -s /var/run/php-cgi.socket -u nginx -g nginx -f /usr/bin/php-cgi -P /var/run/php-cgi.pid (code=exited, status=0/SUCCESS)
>Main PID: 12366 (php-cgi)
>  CGroup: name=systemd:/system/php-cgi.service
>          └ 12366 /usr/bin/php-cgi

**Testiamo il riavvio**

****Ovvero, ok, funziona, ma cosa succede se muore? Vediamolo subito. Uccidiamo il processo:

># kill 12366

e riverifichiamo lo stato:

># systemctl status php-cgi.service
>php-cgi.service - PHP cgi
>  Loaded: loaded (/lib/systemd/system/php-cgi.service; enabled)
>  Active: active (running) since Wed, 15 Feb 2012 15:19:24 +0100; 1s ago
> Process: 13325 ExecStart=/usr/bin/spawn-fcgi -s /var/run/php-cgi.socket -u nginx -g nginx -f /usr/bin/php-cgi -P /var/run/php-cgi.pid (code=exited, status=0/SUCCESS)
>Main PID: 13329 (php-cgi)
>  CGroup: name=systemd:/system/php-cgi.service
>          └ 13329 /usr/bin/php-cgi

Come si può notare è ripartito da solo.

E se lo volessi stoppare? Beh, che domande, con il classico stop:

># systemctl stop php-cgi.service
># systemctl status php-cgi.service
>php-cgi.service - PHP cgi
>  Loaded: loaded (/lib/systemd/system/php-cgi.service; enabled)
>  Active: inactive (dead) since Wed, 15 Feb 2012 15:20:44 +0100; 2s ago
> Process: 13325 ExecStart=/usr/bin/spawn-fcgi -s /var/run/php-cgi.socket -u nginx -g nginx -f /usr/bin/php-cgi -P /var/run/php-cgi.pid (code=exited, status=0/SUCCESS)
>Main PID: 13329 (code=exited, status=0/SUCCESS)
>  CGroup: name=systemd:/system/php-cgi.service

**Finish**

****Yes, funziona. Notate bene che ho dato per assodato che ste cose le lanciate da root, io non uso ne debian ne ubuntu.