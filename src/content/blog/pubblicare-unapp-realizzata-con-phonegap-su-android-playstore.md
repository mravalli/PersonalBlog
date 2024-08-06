---
title: "Pubblicare un'app realizzata con PhoneGap su Android PlayStore"
description: "Pubblicare un'app realizzata con PhoneGap su Android PlayStore"
pubDatetime: 2017-07-31
ogImage: '/assets/libri.webp'
tags: ['Android', 'Cordova', 'Google Play Store', 'PhoneGap']
---


Dopo aver realizzato un’applicazione con PhoneGap, arriva il momento di volerla pubblicare sul PlayStore, così che tutti ne possano usufruire.

Per farlo abbiamo bisogno di “preparare” il file APK per essere “accettato” dal sistema di controllo bastano pochi ma essenziali passaggi. Gli stessi valgono anche per le applicazioni create con Ionic o con Cordova.

Dovremo quindi:

1. Generare l’APK in modalità *release*
2. Generare le chiavi per firmare l’APK
3. Firmare l’App
4. Allineare il contenuto dell’APK

## Step 1: Generare l’APK in modalità *release*
```sh
> phonegap build --release android
```
Questo comando creerà un apk privo delle gestioni di deug (e quindi pronto a essere distribuito) in `platforms/android/build/outputs/apk/android-relase-unsigned.apk`

Per convenienza spostiamo l’APK generato nella directory root dell’applicazione

## Step 2: Generare le chiavi per firmare l’APK
```sh
> keytool -genkey -v -keystore mie-chiavi.keystore -alias nome-app -keyalg RSA -keysize 2048 -validity 10000
```
Dove

- mie-chiavi.keystore va (convenzionalmente) sostituito in <nome dell’app>.keystore
- nome-app va sostituito con il nome che vogliamo dare all’App

## Step 3: Firma l’App
```sh
> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mie-chiavi.keystore <HelloWorld>-release-unsigned.apk nome-app
```
Dove

- per mie-chiavi.keystore e nome-app valgono i nomi del punto precedente
- `<HelloWorld>` va sostituito col nome dell’App

## Step 4: Allineamento del contenuto
```sh
> zipalign -v 4 <HelloWorld>-release-unsigned.apk <HelloWorld>.apk
```
Dove va semplicemente cambiato `<HelloWorld>` coerentemente con quanto sopra.

##Fine!!! Ora puoi caricare la tua nuova App su Google Play Store.
