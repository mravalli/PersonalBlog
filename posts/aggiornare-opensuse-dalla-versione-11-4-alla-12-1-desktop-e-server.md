---
title: 'Aggiornare OpenSUSE dalla versione 11.4 alla 12.1 (Desktop e Server)'
short: 'Aggiornare OpenSUSE dalla versione 11.4 alla 12.1 (Desktop e Server)'
publishedAt: '2012-01-30'
image: '/images/libri.webp'
tags: ['Repositories', 'Aggiornamento', 'Distribuzione', 'Asparagus', 'Celadon', 'Linux', 'OpenSuSE', 'update', 'upgrade', 'zypper']
---

**G**li aggiornamenti sono importanti, ci permettono di avere il software sempre aggiornato e soprattutto con gli eventuali [bug](http://it.wikipedia.org/wiki/Bug) corretti. In altre parole ci aiuta a proteggerci dagli attachi dei vari malintenzionati nel caso di un server o di avere finalmente il supporto per quell’hardware che sin’ora non abbiamo potuto utilizzare. Non meno importante (e qualcuno di mia conoscenza me ne vorrà) ci permetterà di utilizzare il nostro software preferito alla versione stabile più aggiornata o, comunque di provare una finalmente decente di qualche altro software che avevamo addochiato ma che era ancora troppo acerbo per poterlo utilizzare.

**D**a tempo utilizzo **OpenSUSE** come distribuzione principale su tutti i server che gestisco (a parte quello di casa che rimane su **Slackware**) nonchè sul portatile e sulla workstation lavorativa. Inutile tessere lodi ad una delle distribuzioni più importanti nel panorama internazionale, basti dire che il sistema di aggiornamento è valido e la rosa di software su cui poter scegliere è sufficentemente vasta ma soprattutto aggiornata.

**O**ra, ad un mese dal rilascio dell’ultima versione stabile, è arrivato anche per i miei server il momento di effettuare l’upgrade.

**E**ffettuarlo è un’operazione semplice; in fondo son 4/5 passaggi (che ora andrò ad esplicitare), ma che non si trovano facilmente sul sito della distribuzione; si, si ci arriva, ma diciamo che non è pubblicizzata a dovere..

**Note preliminari**  
**G**li aggiornamenti si fanno da command line, più per immediatezza e semplicità che per una motivazione ben specifica. Diciamo che spesso gli aggiornamenti effettuati tramite **GUI** danno meno piacere.** **

**Installiamo gli ultimi aggiornamenti**

Prima di iniziare l’upgrade della distribuzione, è buona prassi (se non addirittura passaggio obbligato) aggiornare il software attualmente installato sulla macchina. Apriamo quindi un terminale e verifichiamo che il repositories degli aggiornamenti sia abilitato**:**

~ # zypper lr # | Alias             | Name                  | Enabled | Refresh --+-------------------+-----------------------+---------+-------- 1 | repo-11.4-non-oss | openSUSE-11.4 Non-OSS | Yes     | No     2 | repo-11.4-oss     | openSUSE-11.4 OSS     | Yes     | No     3 | repo-11.4-update  | openSUSE-11.4 Updates | Yes     | Yes

nel mio caso il repositorie interessato è il terzo che risulta abilitato sia per installazioni/aggiornamenti che per la verifica degli aggiornamenti del repository stesso.  
 Se non fosse così, è necessario dapprima abilitarlo:

~ # zypper mr -er 3

dove diciamo a zypper di modificare il terzo repositorie (mr 3) abilitandolo per l’aggiornamento ed il refresh (-er).  
 Quindi effettuiamo l’uppublishedAt:

~ # zypper ref ~ # zypper up

**Effettuamo l’upgrade della distribuzione**

**O**ra che abbiamo effettuato gli ultimi update dobbiamo disabilitare tutti i repository attuali, non più necessari:

~ # zypper mr -ad

e installiamo i nuovi repositories:

~ # zypper addrepo --name "openSUSE-12.1 OSS" http://download.opensuse.org/distribution/12.1/repo/oss/ repo-12.1-oss ~ # zypper addrepo --name "openSUSE-12.1 Non-OSS" http://download.opensuse.org/distribution/12.1/repo/non-oss/ repo-12.1-non-oss ~ # zypper addrepo --name "openSUSE-12.1 Updates" http://download.opensuse.org/update/12.1/ repo-12.1-update

Quindi effettuiamo un aggiornamento completo della distribuzione:

~ # zypper ref ~ # zypper dup

alla fine di tutto ciò, riavviate il sistema e godetevi la vostra nuova **openSUSE 12.1**!

**Note finali**

**S**e avete repositories terzi, tipo [packman](http://packman.links2linux.org/) o [virtualbox](https://www.virtualbox.org/wiki/Linux_Downloads), ricordatevi che non dovete riabilitarli, ma verificare dapprima che siano compatibili ed eventualmente installare quelli aggiornati adatti alla nuova versione della distribuzione**  
**