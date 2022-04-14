---
title: 'Un po di storia sui Patterns'
short: 'Cenni Storici'
abstract: 'Un po` di storia: perché esistono e le critiche che gli vengono mosse'
publishedAt: '2021-05-10'
image: '/images/scrum-roles.webp'
tags: ['Design Pattern', 'General Concept', 'Developing', 'Motivation', 'Structure', 'Software Design']
---

Chi ha ideato i patterns? Questa è una buona domanda, anche se non è accurata. I patterns, nella programmazione ad oggetti, sono soluzioni tipiche a problemi comuni: quando una soluzione viene riutilizzata più e più volte, qualcuno si prende la briga di dargli un nome e descriverne la soluzione nel dettaglio.

Il concetto di pattern è stato descritto per la prima volta da Christopher Alexander in [A Pattern Language: Towns, Buildings, Construction](https://www.amazon.it/Pattern-Language-Towns-Buildings-Construction/dp/0195019199). In questo libro si descrive un "linguaggio" per la progettazione di un centro urbano. Le unità di questo linguaggio vengono definite patterns (o modelli). Quest'ultimi possono descrivere quanto dovrebbero essere alte le finestre, quanti piani una costruzione dovrebbe avere, quanto debbono essere ampie le aree verdi nelle vicinanze.

L'idea è stata poi ripresa da quattro autori: Eric Gamma, John Vlissides, Ralph Johnson e Richard Helm. Nel 1994, costoro pubblicarono [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.it/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612), in cui applicarono i concetti del design patterns alla programmazione. Il libro propone 23 patterns per risolvere vari problemi della programmazione ad oggetti e diventa velocemente un "best-seller". A causa del nome così lungo, la comunità inizia a chiamarlo *"The book by the gang of four"*, per ridurlo ancora in *"The GoF book"*.
Da questo libro in poi, dozzine di patterns sono stati scoperti. L'approccio per pattern diventa molto popolare negli altri campi della programmazione, tant'è che molti altri patterns affrontano altri metodi di programmazione, diversi da quella ad oggetti.

**Ma la verità è che molti sviluppatori lavorano per anni senza mai conoscere nemmeno l'esistenza di un pattern.**
Spesso può capitare che li usano senza nemmeno saperlo, allora perché spendere tempo ed effort cognitivo per impararli?
Perchè i design pattern sono da considerare delle soluzioni provate e testate a problemi comuni nel design del software: anche se non hai mai incontrato questi problemi, conoscerne i pattern risulta molto utile, perché ti insegnerà a risolvere tutte le problematiche usando i principi del design object-oreinted.
Inoltre i design pattern definiscono un linguaggio comune con cui tu e i tuoi colleghi potete comunicari con più efficienza: ti basterà dire "Usiamo un *Singleton* per risolvere questo" e tutti avranno idea di quale sia la soluzione che suggerisci. Non necessita alcuna spiegazione cos'è un *Singleton* se conosci il pattern che lo definisce e gli da il nome.

Tutto questo, naturalmente, non è esente da critiche..

**Sono necessari per linguaggi di programmazione *deboli***
*In genere hai bisogno di un pattern quando scegli un linguaggio di programmazione o una tecnologia in cui mancano i necessari livelli di astrazione. In questo caso, il pattern darà al linguaggio i necessari super-poteri.
Ad esempio, il pattern [Strategy](https://mario.raval.li/posts/design-pattern-strategy) può essere implementato con una semplice funzione anonima (lambda) in molti linguaggi moderni.*

**Soluzioni inefficienti**
I pattern tentano di uniformare approcci già largamente utilizzati. L'unificazione è vista da molti come un dogma e implementano i pattern così come sono, senza adattarli al contesto.

**Uso ingiustificato**
*Se tutto ciò che hai è un martello, tutto ti sembrerà un chiodo*
Questo è un problema che colpisce molti novizi che hanno preso familiarità con i pattern: tenterà di applicarle ovunque, anche in situazioni dove semplicemente del codice ben scritto è più che sufficiente.