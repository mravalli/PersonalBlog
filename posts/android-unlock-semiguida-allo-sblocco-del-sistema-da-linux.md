---
title: 'Android unlock - semiguida allo sblocco del sistema da linux'
short: 'Android unlock - semiguida allo sblocco del sistema da linux'
date: '2014-11-22'
image: '/images/libri.webp'
tags: ['adb', 'Android', 'Fastboot', 'Fuffa', 'Linux', 'Maguro', 'modding', 'root', 'unlock']
---

Se cercate in giro troverete diverse guide su come sbloccare un terminale android (leggersi ottenere i permessi di root). Nella maggior parte dei casi, queste guide son per windows, raramente Mac.  
Sembra che gli utenti smanettoni siano rimasti solo su questi ambienti, mentre quello creato ad-hoc per questi scopi ne è rimasto sprovvisto (ma questa è un’altra storia).  
In fondo dette guide non fanno altro che indicare che comandi eseguire sul terminale interessato, piuttosto che eseguire delle istruzioni tramite l’SDK.  
Ed è qui che casca l’asino. Per un utente windows, non fa alcuna differenza se quei comandi li esegui lui o l’amministratore di sistema, per un utente \*nix invece la differenza è notevole.  
Andando al sodo, per sbloccare un terminale Android, passo necessario per flashare una modding ROM o ottenere i permessi di root, dovete dare i comandi di sblocco da root:

><br></br>
>adb reboot bootloader<br></br>
>sudo fastboot oem unlock<br></br>
>sudo fastboot reboot<br></br>
  
Attenzione che, dopo il secondo comando, il sistema ci avveritrà che perderemo la garanzia, cancellerà tutti i dati dal terminali, e l’angelo della morte si abbatterà sul vicino di casa. Nulla che non possiate sopportare con i dovuti accorgimenti, tipo i backup. (Per il vicino di casa, purtroppo, non c’è soluzione)