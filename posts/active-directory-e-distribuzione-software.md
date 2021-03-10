---
title: 'Active Directory e Distribuzione Software'
short: 'Active Directory e Distribuzione Software'
date: '2007-11-12'
image: '/images/libri.jpg'
tags: ['Active Directory', 'Group Policy', 'Software Distribution', 'Windows Script Host', 'WSH']
---

Bene, bene, bene, bene.

Vi è mai capitato di dover distribuire un software a tutti i pc della vostra rete e di non aver voglia di girarseli tutti per farlo a manina? A me si, soprattutto la seconda parte ?

Molti diranno “utilizza qualche applicativo di Software Distribution”.. si bravi, ma quale? Ce ne son tanti e non tutti di facile comprensione ed immediatezza.

Non volendo quindi installare nient’altro che sia veramente necessario (non è che farò software distribution tutti i giorni) ho pensato di sfruttare quella integrata di Active Directory. Peccato che è un’operazione tutt’altro che semplice.  
  
 Per usare tale oppurtinità offertaci da microsoft senza dover acquistare SMS, bisogna avere o il pacchetto del software già pronto per essere distribuito in tale modalità, o i tools di installazione del software stesso per poterlo modificare.

Niente, ci vuole troppo tempo per fare ciò, mi son detto; ed inoltre non ho a disposizione tali software.

Pensando e ripensando mi son detto: e se automatizzassi il tutto tramite qualche script di Windows Script Host?

Ok, cimentiamoci in questa impresa. I prerequisiti sono: Active Directory, il blocco note ed il software interessato, naturalmente.

Come si fa?

Si deve creare uno script di startup contenente le istruzioni per installare il software e distribuirlo tramite una policy.

**Creazione Script**

Lanciamo il ns editor preferito ed iniziamo col definire l’istanza

' create shell instance set WshShell = WScript.CreateObject("WScript.shell") ' create file object instances set fso = CreateObject("Scripting.FileSystemObject") ' create Network istances set net = CreateObject("WScript.Network")

le variabili che potrebbero servirci

' variables Dim ProgramPath, Program

e l’ambiente

set EnVar = WshShell.environment("Process")

ProgramPath e Program sono rispettivamente la directory contenente il programma e l’eseguibile dello stesso; ci serviranno per effettuare un semplice controllo: il software è già installato?  
 Quindi valorizziamo queste variabili

ProgramPath = EnVar("ProgramFiles") & "-- directory programma --" Program = ProgramPath & "-- eseguibile programma --"

ed effettuiamo il controllo

if fso.FileExists(Program) = false then if fso.FolderExists(ProgramPath) = false then

A questo punto, verificato che il programma non esiste, avviamone l’installazione, magari copiandolo da una cartella condivisa presente sul nostro file server

 net.MapNetworkdrive "R:", "fileservercondivisione","True" fso.CopyFile "R:fileinstallazione.exe", "C:" net.RemoveNetworkDrive "R:", True, True WshShell.Run ("c:fileinstallazione.exe /opzioni")

nello specifico abbiamo mappato la cartella ‘condivisione’ presente sul server ‘fileserver’ come unità R:, ci siam copiati il file eseguibile d’installazione sul ns disco locale, abbiamo rimosso la mappatura ed abbiamo eseguito il file d’installazione con le opzioni adeguate da riga di comando  
 A questo punto non ci resta che completare il codice con la chiusura dei due IF

 end if end if

A questo punto salviamo il file col nome che più ci piace facendo attenzione di modifcare l’estesione in .vbs

**Creazione Policy**

Per iniziare vi consiglio di installarvi, se ancora non lo avete fatto, il Group Policy Management Console. Quindi avviatelo, posizionatevi nei Policy Objects, cliccateci col tasto destro del mouse e selezionate nuovo

![New Policy](http://mario.raval.li/files/2012/02/newpolicy.png)

date il nome che più vi piace e vi ritroverete la policy in elenco. Cliccateci col destro e selezionate edit

![Edit Policy](http://mario.raval.li/files/2012/02/editpolicy.png)

espandete l’albero sino ad arrivare alla definizione degli script di avvio della macchina, doppio click su avvio e premete ‘Visualizza File’

[![Startup](http://mario.raval.li/files/2012/02/editstartuppolicy.png)](http://mario.raval.li/files/2012/02/editstartuppolicy.png "Startup Script Policy")

spostate in questa finestra lo script creato pocanzi e chiudete la finestra  
 cliccate sul pulsante aggiungi e scrivete il nome dello script nel campo nome script  
 confermate tutto e chiudete l’editor delle policy.

![nomescript](http://mario.raval.li/files/2012/02/addscripttostartup.png)

**Applicare la policy**  
 Per applicare la policy basta trascinare la policy appena creata sull’unità organizzativa contenente le macchine interessate.  
 Prima di applicarla prestate attenzione che la condivisione specificata nello script sia esistente ed accessibile, altrimenti all’avvio invece di avere l’effetto desiderato vi ritorvarete con lo script che va in errore :p


