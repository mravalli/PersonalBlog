---
title: 'Caricare files sul server tramite AJAX, senza fronzoli e continuare a vivere sereni'
short: 'Caricare files sul server tramite AJAX, senza fronzoli e continuare a vivere sereni'
date: '2019-02-15'
image: '/images/libri.webp'
tags: ['Javascript', 'Ajax', 'XMLHttpRequest', 'Upload Files', 'Web Development']
---

Quando fu introdotto AJAX (XMLHttpRequests), il web fece un bel balzo in avanti: per la prima volta una pagina web poteva comunicare con il server senza la necessità di essere ricaricata, aprendo, di fatto, la strada ai siti dinamici.
Ultimamente mi è capitato di dover craere una pagina da cui caricare dei files, senza dover usare il classico form e senza voler usare la miriade di plugin già esistenti che spesso, magari solo per dar mostra di se, riempono la pagina web di grafiche, barre e anteprime. Ho quindi pensato ad AJAX e ad una sua possibile implementazione.
Ecco come!

## Il Form nascosto
Per mantenere una certa pulizia, magari per successive fasi di debug, andremo a creare un form con un unico input di tipo file. Lo nasconderemo all'utente, perchè magari vogliamo che l'utente finale clicchi su una matitina sopra una foto o un qualunque altro pulsante.Il form comunque non è necessario per la riuscita dell'upload dei files.

> <form id="fileInfo" name="fileInfo">
>     <input id="fileSelected" type="file" name="fileSelected[]" style="display:none;" multiple />
> </form>

Creiamo quindi un elemento visibile all'utente che avvierà la selezione ed il caricamento del file:

> <button id="uploadFile">Carica File</button>

##Creazione del pacchetto da inviare
Per prima cosa dobbiamo intecettare la pressione del pulsante e innescare la selezione del file. Per semplicità e velocità di implementazione lo faremo con jQuery
>$('#uploadFile').on('click', function() {
>    $('#fileSelected').trigger('click').on('change', function() {
>        // Codice per l'upload del file
>    });
>});

Nel codice qui sopra, agganciamo al pulsante una funzione da eseguire nel caso venga cliccato. Una volta premuto, emuleremo il click sul classico pulsante "sfoglia" presente in un qualsiasi form con un campo input.A questo input agganciamo una funzione che sarà eseguita nel caso questo campo cambi valore, ovvero avvenga la selezione dei files da caricare.
Fatto questo, creiamo il pacchetto da inviare al server.

>let fileSelected = document.getElementById('fileSelected');
>let files = fileSelected.files;
>let formData = new FormData();
>for (let i=0; i < files.length; i++) {
>    let file = files[i];
>    formData.append('fileSelected[]', file, file.name);
>}

In pratica preleviamo l'elenco dei files da caricare e creiamo un oggetto di tipo FormData. Questo lo usiamo per costruire un insieme di chiavi/valori utile per il pacchetto da inviare tramite la richiesta AJAX.Per aggiungere le coppie di valori a FormData, estraiamo le informazioni inerenti ai files selezionati all'interno di un ciclo For e li aggiungiamo all'oggetto appena creato con il metodo FormData.append().
Il metodo FormData.append() è usato per gestire Files, Blobs o Stringhe.

>// Files
>formData.append(name, file, filename)
>
>// Blobs
>formData.append(name, blob, filename)
>
>// Stringhe
>formData.append(name, value)

Come si può notare è necessario specificare come prima cosa il nome del dato che stiamo aggiungendo. Il secondo parametro è il dato stesso.Nel caso si tratti di blob o file è possibile specificare il nome del file, anche se non è richiesto.

##Invio del pacchetto al Server
A questo punto, selezionati i file e preparato il pacchetto, non dobbiamo far altro che inviarlo.Per farlo è necessario inizializzare XMLHttpRequest, responsabile della comunicazione con il server:

>let xhr = new XMLHttpRequest();

e avviare una connessione. Per farlo useremo il metodo open.Questo metodo si attende tre parametri: il metodo HTTP, l'indirizzo url che gestirà la richiesta e un valore di tipo bool che determinerà se la richiesta deve essere o meno asincrona.

> xhr.open('POST', 'handler.php', true);

Aperta la connessione, è necessario (o quantomento auspicabile) indicare al componente come comportarsi al termine della richiesta/comunicazione.

>xhr.onload = function() {
>    if (xhr.status === 200) {
>        // I files sono stati caricati
>    } else {
>        // Qualcosa è andato storto
>    }
>};

Quindi inviamo il pacchetto creato precedentemente al server:

> xhr.send(formData)

Fatto. Questo è quanto necessario per poter caricare dei files su un server utilizzando AJAX.Ovviamente, lato server, sarà necessario ricevere i files e salvarli, manipolarli e inviare una risposta.

##Supporto da parte dei Browser
Tutti i browser in uso supportano questa tecnologia da tempo, eccezion fatta per Internet Explorer che lo fa dalla versione 10.0 in poi.

##Approfondimenti
[MDN: FormData Documentation]https://developer.mozilla.org/en-US/docs/Web/API/FormData
[MDN: XMLHttpRequest Documentation]https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[MDN: FileList Documentation]https://developer.mozilla.org/en-US/docs/Web/API/FileList
[W3C: XMLHttpRequest Specification]http://www.w3.org/TR/XMLHttpRequest/