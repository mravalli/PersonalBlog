---
title: 'Certificati SSL: Conversione tra formati'
short: 'Certificati SSL: Conversione tra formati'
date: '2012-02-01'
image: '/images/libri.jpg'
tags: ['Certificati', 'Conversioni', 'Formati', 'Linux', 'openSSL', 'Sicurezza', 'Windows']
---

**A**vendo a che fare con sistemi diversi ed in un ambiente misto windows/linux, ogni tanto mi occorre rendere compatibili ed esportabili i certificati che utilizzo per rendere un po’ più sicure le comunicazioni, ovvero che uso per stabilire connessioni SSL.

Per esempio su Windows Server si possono esportare ed importare chiavi in formato .pfx, mentre il server Apache utilizza chiavi PEM individuali (.crt, .cer).  E’ necessario quindi convertire le chiavi da e per uno di questi formati.

**F**arlo è cosa semplice, a patto di avere bene in mente quali sono i formati che ci occorrono e, soprattutto, avere l’ambiente, ovvero **[openSSL](http://www.openssl.org "openSSL")**, installato

**I Formati**

**F**ormato **PEM**. Questo é il formato più comune con cui le **Certificate Authorities** (ovvero enti di certificazione) generalmente forniscono i certificati. I files hanno estensioni come .pem, .crt, .cer e .key. Questi sono file di testo codificati in Base64 e contengono le dichiarazioni “**—–BEGIN CERTIFICATE—–**” e “**—–END CERTIFICATE—–**“.  
 I certificati per i server, quelli intermedi e le chiavi private possono tutte essere codificate nel formato PEM.  
**A**pache ed altri server simili usano i certificati in formato PEM. Diversi certificati PEM, nonchè la chiave privata, possono essere inclusi in unico file, uno dietro l’altro, ma molte piattaforme, come Apache appunto, si aspettano che i certificati e le chiavi private siano in files separati.

**F**ormato **DER**. Questo è semplicemente un formato binario dello stesso certificato PEM, anzichè averlo in ASCII. A volte l’estensione del file contenente il certificato é .der, ma è più probabile che lo si abbia in .cer, quindi l’unica possibilità di distinguere se si è in presenza di un formato DER o di un formato PEM è aprire il file con un editor di testo e verificare la presenza delle dichiarazioni BEGIN/END.  
 Qualunque tipo di certificato può essere codificato nel formato DER.  
 Tipicamente questo formato è usato nelle piattaforme Java.

**F**ormato **PKCS#7/P7B**. Questo formato è generalmenet un file con estensione .p7b o .p7c al cui interno é presente un certificato in formato ASCII codificato in Base64.  
 I certificati P7B contengono le dichiarazioni “—–BEGIN PKCS7—–” e “—–END PKCS7—–” e possono contenere esclusivamente certificati e catene di certificati, ma non le chiavi private.  
 Diverse piattaforme supportano i files P7B come Microsoft Windows e Java Tomcat.

**F**ormato **PKCS#12/PFX**. Il formato PKCS#12 o PFX è un formato binario per salvare i certificati server, qualunque certificato intermedio  e la chiave privata in un’unico file cryptato. In genere l’estensione utilizzata per tale formato é .pfx e .p12. Tipicamente questo formato è usato sulle macchine Windows per importare ed esportare i certificati e le chiavi private.

**Convertiamo i certificati **utilizzando openssl:**  
**

da **PEM** a **DER**

>openssl x509 -outform der -in certificate.pem -out certificate.der

da **PEM** a **P7B**

>openssl crl2pkcs7 -nocrl -certfile certificate.cer -out certificate.p7b -certfile CACert.cer

da **PEM** a **PFX**

>openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CACert.crt

da **DER** a **PEM**

>openssl x509 -inform der -in certificate.cer -out certificate.pem

da **P7B** a **PEM**

>openssl pkcs7 -print_certs -in certificate.p7b -out certificate.cer

da **P7B** a **PFX**

>openssl pkcs7 -print_certs -in certificate.p7b -out certificate.cer

>openssl pkcs12 -export -in certificate.cer -inkey privateKey.key -out certificate.pfx -certfile CACert.cer

da **PFX** a **PEM**

>openssl pkcs12 -in certificate.pfx -out certificate.cer -nodes

**Q**uando convertiamo un PFX in un PEM, OpenSSL mette tutti i certificati e la chiave privata in un unico file. Dovremo quindi aprire il file con un editor di testo e separare i singoli certificati e la chiave privata (comprese le intestazioni BEGIN/END) copiandoli ognuno nel proprio file individuale salvati poi rispettivamente come certificate.cer, CACert.cer e privateKey.key

E’ molto **raccomandato** convertire da e per il formato .pfx sulla propria macchina usando OpenSSL in modo da avere sempre al sicuro la chiave privata.