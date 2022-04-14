---
title: 'Sincronizzazione Utenti tra Active Directory e Zimbra'
short: 'Sincronizzazione Utenti tra AD - Zimbra'
publishedAt: '2008-06-24'
image: '/images/libri.webp'
tags: ['Active Directoryh', 'LDAP', 'Sincronizzazione', 'Utenti', 'Zimbra']
---


Zimbra ci da la possibilità di autenticare gli utenti richiedendo l’autorizzazione ad un dominio Active Directory. Per fare ciò, in generale, basta creare gli utenti su zimbra stando attenti ad inserire lo stesso userid che viene usato in Active Directory, e poi seguire la procedura guidata per gestire l’autentica da dominio.

Fin qui, ok, ma se gli utenti sono tanti? Daltronde, se son pochi non ha quasi motivo di esistere un’installazione di zimbra, ma dover inserire tutti gli utenti a mano, non è cosa di certo piacevole.

Allora sorge la domanda (ovvia), ma è possibile importarli? Certo, in fondo l’Active Directory è un archivio ldap interrogabile e l’installazione di zimbra ci mette a disposizione il software necessario per farlo, nonchè ci da la possibilità di creare gli utenti da command line.

Interroghiamo quindi l’Active Directory per l’elenco degli utenti che, per comodità, si trovano tutti in un’unità organizzativa specifica, o cmq che contiene altre unità organizzative con all’interno gli utenti interessati. Inoltre, durante l’interrogazione, togliamo tutto ciò che non ci interessa, lasciando in definitiva solo il nome utente e scriviamo questo elenco in un unico file.

ldapsearch -x -b "ou=unti,dc=dominio,dc=local" -D administrator@dominio.local -h <ip server pdc> -w <password administrator> "(objectCategory=CN=Person,CN=Schema,CN=Configuration,DC=aorg,DC=local)" |grep sAMAccountName | sed -e s/sAMAccountName: //g > utenti.tmp

Fatta l’interrogazione ci troveremo quindi con un elenco di utenti da inserire su zimbra. Non possiamo direttamente darglielo in pasto, dato che l’inserimento da command line prevede solo un utente alla volta. Inoltre sarebbe comodo inserire anche i dati aggiuntivi dell’utente, come il Nome ed il cognome. Per fare questo mettiamo su un ciclo che per ogni utente reinterroghi l’Active Directory per i dati mancanti e li inserisca su Zimbra.

let "i=0" while read line do uid[$i]=$line ldapsearch -x -b "ou=unit,dc=dominio,dc=local" -D administrator@dominio.local -h <ip server pdc> -w <password administrator> '(sAMAccountName='${uid[$i]}')' > user.tmp dn[$i]=`grep displayName user.tmp | sed -e s/displayName: //g` sn[$i]=`grep sn: user.tmp | sed -e s/sn: //g` cn[$i]=`grep cn: user.tmp | sed -e s/cn: //g` gn[$i]=`grep givenName: user.tmp | sed -e s/givenName: //g` # echo per avanzamento echo ${uid[$i]} echo $i if [ "${dn[$i]}" == "" ]; then dn[$i]=dv fi if [ "${gn[$i]}" == "" ]; then gn[$i]=dv fi if [ "${cn[$i]}" == "" ]; then cn[$i]=dv fi if [ "${sn[$i]}" == "" ]; then sn[$i]=dv fi zmprov ca ${uid[$i]}@dominio.com '''' displayName "${dn[$i]}" givenName "${gn[$i]}" cn "${cn[$i]}" sn "${sn[$i]}" let "i += 1" done < utenti.tmp

Nella pratica leggiamo l’elenco e ad ogni riga, tramite l’interrogazione dell’Active Directory, recuperiamo il nome completo, il nome, il cognome, controlliamo che i campi siano valorizzati, altrimenti li valorizziamo con un valore significativo tipo “na” (not applicable) e li passiamo all’utility zmprov.

Da notare che il tutto funzionerà in virtù del fatto che il nome utente del dominio corrisponda all’account di posta. Inoltre a zmprov dobbiamo dirgli pure qual’è il dominio in cui creare l’account (nell’esempio, dominio.com).

Fatto questo sarebbe carino poter tenere sincronizzati gli account di Active Directory con quelli su zimbra e per farlo basterà aggiungere poche righe di codice che mi confrontino l’elenco ottenuto precedentemente con il nuovo, ed inserisca o tolga le differenze, ovvero gli utenti.

Aggiungo utenti nuovi anteponendo il seguente comando al ciclo di aggiunta utenti e cambiando il file di destinazione delle ricerca ldap da utenti ad utenti.new:

diff utenti.old utenti.new |grep ">"|sed -s s/'> '//g > utenti.tmp

Rimuovo gli utenti non più presenti in AD:

diff utenti.old utenti.new |grep "<"|sed -e s/'< '//g > utenti.tmp let "l=0" while read line do uid[$l]=$line zmprov da $(uid[$l])@dominio.com let "l += 1" done < utenti.tmp

al termine scambio il vecchio elenco con il nuovo e rimuovo i file temporanei:

mv utenti.new utenti.old rm -f utenti.tmp; rm -f user.tmp

Prima di lanciare lo script per la prima volta, è necessario creare il file vuoto utenti.old, altrimenti la differenza tra l’elenco ricavato dalla ricerca ldap ed un file non esistente, ci tornerà un elenco vuoto.  
Ora basta mettere tutto questo in uno script di bash e farlo eseguire dal cron.