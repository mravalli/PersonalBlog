---
title: 'Active Directory'
short: 'Active Directory'
date: '2008-04-27'
image: '/images/libri.jpg'
tags: ['Active Directory', 'Group Policy', 'DNS', 'Windows', 'Dominio', 'GPM', 'GPO', 'User']
---

**Cos’è l’Active Directory**

L’active directory è un insieme di strutture usata da Microsoft Windows per salvare e gestire informazioni e dati attraverso una rete di computer e server.

L’Active Directory offre numerose funzionalità, tra le quali la possibilità di associare delle informazione ad un oggetto, facilitare l’organizzazione di questo oggetto, permettere l’accesso a questo oggetto da parte degli utenti finali ed agli amministratori permettendo di impostare dei criteri di sicurezza per l’accesso allo stesso.

L’Active Directory può quindi essere definita come una struttura gerarchica al cui interno l’interazione tra i vari oggetti deve sottostare alle politiche di sicurezza impostate dall’amministratore.

Questa struttura può essere suddivisa in tre categorie: le risorse messe a disposizione, come le stampanti; i servizi a cui possono accedere gli utenti, come la mail; gli oggetti che compongono l’active directory stessa, quali gli utenti o le workstation, piuttosto che i server o le impostazioni di sicurezza.

**Sfruttarla**

Sfruttare appieno l’Active Directory non è cosa semplice, ma iniziare ad usarla può semplificare la vita agli amministratori di rete. Infatti, partendo dal concetto che l’Active Directory si basa sulla gestione dei computer appartenenti alla rete, l’amministratore troverà giovamento dalla possilità di gestire la propria con un unico gestore degli accessi definendo i criteri di sicurezza una sola volta.

Per fare questo occorre quindi una struttura già in essere composta almeno da un Domain Controller su cui sta girando Active Directory.

**Implementarla**

Il primo passo verso un’implementazione “corretta” dovrebbe essere quello della definizione della struttura, ovvero organizzare visibilmente la struttura della propria rete, la quale magari è suddivisa in reparti. Basterà quindi riportare questi reparti nell’Active Directory e questo lo si fa tramite un strumento chiamato “utenti e computer di Active Directory”.

Come si vede dall’immagine, l’active directory viene visualizzata come un albero, nel quale ogni ramo corrisponde ad un’unità organizzativa e le cui foglie sono gli oggetti da amministrare.

Per creare un’unità organizzativa, basta posizionarsi sul ramo padre, cliccare col destro e selezionare nuova → unità organizzativa; lo stesso vale se vogliamo creare un oggetto di tipo utente.

Disposta l’organizzazione delle unità, possiamo creare i singoli utenti che dovranno accedere a tale struttura, ovvero tutti gli utenti che dovranno accedere ad un qualsiasi computer della ns rete collegato ad Active Directory.

**Creazione Utenti**

La creazione dell’utente è abbastanza semplice e sostanzialmente basta seguire il wizard proposto ed inserire i dati così come ci vengono richiesti.

Durante la creazione dell’utente, il sistema ci proporrà delle impostazioni di default, le quali sono:

- cambio obbligatorio password all’accesso successivo: ci permette di creare un utente definendo una password qualsivoglia, comunicarla all’utente ed obbligarlo a cambiarla al primo accesso, in modo quindi che la password dell’utente stesso rimanga strettamente personale;
- cambio password non consentito: inibiamo il cambiamento autonomo della password;
- nessuna scadenza password: imponiamo al sistema di non far scadere la password di suddetto utente;
- account disabilitato: informiamo il sistema che tale utente non ha alcun diritto ad accedere ad alcuna risorsa, neanche quella di autenticazione.

Creati gli utenti abbiamo quindi la necessità di farli accedere ad Active Directory, ovvero di far entrare a dominio le workstation che andranno ad utilizzare.

**Ingresso a dominio dei Computer**

Per mettere a dominio una workstation, i passaggi sostanzialmente sono due:

1. Verificare le corrette impostazioni di rete del computer, ovvero che come risolver dns abbia solamente i domain controller e nessun altro e che abbia un indirizzo e delle rotte tali da poterli raggiungere correttamente; che il nome della macchina non contenga caratteri strani e che sia preferibilmente corto, magari che sia facilmente riconducibile ai servizi offerti piuttosto che all’utente che andrà ad usarlo;
2. Andare sulle proprietà di Risorse del Computer, andare nella scheda nomi e cliccare sul pulsante apposito inserendo il nome completo del dominio (es. dominio.local), fornire le proprie credenziali di amministratore ed alla richiesta riavviare il computer.

Al riavvio il computer ci proporrà una schermata di accesso con la possibilità di accedere con un utente locale (ammesso che esista) o con utente del dominio. Da notare che una volta a dominio è buona prassi eliminare gli utenti locali preesistenti lasciando solamente l’amministratore.  
 A questo punto il computer consentirà l’accesso solamente agli utenti che ne hanno il diritto; se non è stato ancora applicato nessun criterio di sicurezza, in pratica potranno accedere tutti gli utenti presenti nella struttura dell’Active Directory; naturalmente ogni utente entrerà in un ambiente distinto conservando quindi la privacy dei propri documenti piuttosto che della propria corrispondenza.

**Gestione e creazione Policy**

Popolata l’Active Directory, possiamo dare un rapido sguardo alla creazione/modifica di semplici regole.

Avviamo il tool dedicato, ovvero il “Group Policy Management”.

Graficamente è molto simile al precedente, solo che mentre nel precedente sfogliavo l’Active Directory per visualizzare gli oggetti, qui la posso sfogliare solo a livello di unità organizzative, al quale ho la possibilità di associare una o più regole.

Posizioniamoci su “Group Policy Objects”. Al suo interno noteremo che sono già presenti almeno due set di regole: “Default Domain Policy” e “Default Domain Controller Policy”.

Clicchiamo su “Default Domain Policy”.

Nella schermata accanto compariranno una serie di informazioni che ci dovrebbero subito far rendere l’idea dello scopo di questa regola. Nello specifico ci fa vedere a quali unità organizzative è stata applicata. Nel ns caso l’intero dominio.

Se ci posizioniamo sulla scheda “Settings” potremo avere un’anteprima delle regole che verranno applicate. Nello specifico questa regola imposta i criteri a cui devono soddisfare le password quali lunghezza e durata.

Se vogliamo modificare questo set di regole, basta cliccarci col destro e selezionare edit.

Si aprirà una nuova finestra, la quale ci darà la possibilità di creare regole a cui deve sottostare l’utente in base al computer a cui viene applicato il set di regole e regole a cui deve sottostare l’utente indifferentemente al computer a cui ha avuto accesso.

Per cambiare quindi le regole concernenti lunghezza, complessità e durata della password, basta sfogliare l’albero sino ad arrivare al ramo interessato e modificarne i valori interessati.

Naturalmente è fortemente sconsigliato modificare le policy di base.

Per creare una nuova policy, non basta far altro che posizionarsi su “Group Policy Objects” e cliccare sul menù contestuale la voce “New”, modificarne a piacimento il nome e cliccare su edit.

Una volta creata ed opportunamente modificata, tale policy va applicata sulle unità organizzative interessate. Per farlo basta posizionarsi sull’unità organizzativa interessata, cliccarci col destro e selezionare “link an existing GPO” e scegliere dalla finestra che si aprirà la policy. Una volta configurata ed assegnate le policy, quest’ultimi entreranno da subito a far parte delle regole a cui gli oggetti dell’Active Directory devono sottostare, ma gli oggetti cominceranno a rispettarle solo dopo averne ricevuta notifica; generalmente questo avviene al riavvio del computer o può essere forzato con un semplice comando dalla prompt: gpupdate /force.