---
title: 'XBMC Pvr-testing2 branch & XBMC Addons'
description: 'XBMC Pvr-testing2 branch & XBMC Addons'
pubDatetime: 2010-07-10
ogImage: '/assets/libri.webp'
tags: ['Linux', 'VDR', 'xbmc', 'addons', 'PVR']
---

Da tempo uso XBMC e soprattutto nella versione pvrtesting2 ovvero il branch che permette di fruire della TV ed in particolar modo di renderlo client di VDR.  
Funziona, non senza problemi. Ogni tanto il flusso video/dati proveniente da vdr manda in palla XBMC il quale si pianta inesorabilmente. In fondo è una versione di testing e ci può stare (la versione del client è la 0.0.1..).  
Cmq, il problema che ho riscontrato in questa versione di XBMC che si identifica con la pre10.04 è che plugins e scripts non funzionano più. Con la 10.04 il team di XBMC introdurrà il sistema ad addons con repository centrale ed infatti è già presente tutto il sistema di sottodirectory “addons”. Però, mentre la versione trunk ha già in funzione questo nuovo sistema con la possibilità di installare ed aggiornare gli addons presenti in fase di installazione, questo branch no e quindi come fare ad avere questa nuova funzionalità?  
Dopo averci sbattuto un po son arrivato alla soluzione: basta copiare la cartella addons della versione trunk direttamente nella cartella di installazione di xbmc. Per intenderci:  
– copiare via svn la cartella addons della versione trunk  
 ```sh
 svn co https://xbmc.svn.sourceforge.net/svnroot/xbmc/trunk/addons/ addons  
 ```
– copiare tutto il suo contenuto dentro la cartella addons della ns installazione  
 ```sh
 cd addons; cp -R * /usr/local/share/xbmc/addons/  
 ```
ed il gioco è fatto (premesso che la cartella di installazione sia /usr/local/share/addons).  
Questo ci è premesso naturalmente perchè si tratta di scripts in python e la versione pvr di xbmc è già pronta a sfruttare queste funzionalità  
Prima di cantare vittoria però bisogna apportare un ultima modifica. Con l’aggiunta di questa funzionalità, xbmc prenderà ad aggiornarsi da solo gli addons e se, come me, avete una macchina dedicata per xbmc e che non ha alcun motivo per non far girare xbmc da root, ben presto vi troverete con lo skin di default, ovvero senza il menù “TV”. Dobbiamo quindi impedire a xbmc di modificarci/aggiornarci lo skin. Per fare questo basterà andare dentro la cartella degli addons e rendere immodificabile lo skin, ovvero:  
```sh
chattr -R +i skin.confluence
```