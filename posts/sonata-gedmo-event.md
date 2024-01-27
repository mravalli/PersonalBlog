---
title: 'Sfruttare gli eventi di Sonata Admin per forzare le traduzioni'
short: 'Sonata Admin Event'
publishedAt: '2023-09-08'
abstract: 'Come sfruttare gli eventi di Sonata Admin per verificare e aggiungere informazioni, o rimandare a una nuova pagina'
image: '/images/refactoring.webp'
tags: ['Sonata', 'PHP', 'Gedmo', 'Traduzioni', 'Routing', 'Developing', 'Doctrine']
---
Nelle scorse settimane, ho iniziato a lavorare su un prodotto con già due anni sul groppone. Basato su **Symfony 6.1** e 
guarnito di ogni sorta di libreria che evita di riscrivere la ruota.
Come si può intuire dal titolo, tra le librerie utilizzate, abbiamo **Sonata Admin** e **Gedmo Translation**. La prima 
utile per creare una dashboard di gestione dei dati con praticamente zero impegno, la seconda per tradurre i campi delle
entità definite tramite **doctrine**, sempre senza impegno.
### Il Problema
Se hai un'entità i cui campi vanno tradotti in varie lingue, pena il malfunzionamento di qualcosa, quando questa
viene salvata, sta al buon operato dell'utente ricordarsi di salvare pure le traduzioni.

Ma non sempre questo avviene.
### La soluzione
`Sonata`, ovviamente, non prevede in alcun modo di effettuare controlli del genere. La traduzione dipende da un altro
componente, anche se ben integrato nella logica di questa libreria.

L'obbligatorietà della traduzione, fa parte della logica di business e quindi va trattata in tale ambito.

Fortunatamente Sonata ci dà la possibilità di intervenire nelle varie fasi di manipolazione dell'entità, tramite i
classici eventi di pre e post salvataggio.
Quindi basta una semplice funzione che nella fase subito successiva al salvataggio, controlli che quell'entità è
traducibile e, effettuati i dovuti controlli, rimandi l'utente alla pagina relativa alla lingua da andare a modificare o
aggiornare.

```php
protected function postUpdate(object $object): void
{
    if ($object instanceof Translatable) {
        // Qui codice per verificare se le traduzioni sono state inserite/aggiornate
        (new RedirectResponse('edit?tl=<lang>'))->send();
    }
}
```

`Translatable` è l'interfaccia di Gedmo che tutte le entità con campi traducibile debbono implementare. 