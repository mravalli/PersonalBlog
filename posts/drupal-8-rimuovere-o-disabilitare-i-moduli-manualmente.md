---
title: 'Drupal 8: rimuovere o disabilitare i moduli manualmente'
short: 'Drupal 8: rimuovere o disabilitare i moduli manualmente'
publishedAt: '2019-11-10'
image: '/images/libri.webp'
tags: ['Drupal', 'Estensioni', 'Aggiornamento']
---

Drupal è un ottimo CMS: stabile, veloce e ben strutturato.Però può accadere che l'aggiornamento di qualche estensione renda il sistema non più utilizzabile e eliminare file temporanei e cache non serve a nulla.
Spesso l'unica soluzione è disabilitare manualmente il modulo colpevole e per farlo si deve intervenire direttamente nel database, ovvero:
Trovare il record 'core.extension' nella tabella `config`, che contiene una array serializzato con tutti i moduli abilitati;
Rimuovere quindi il modulo interessato deserializzando la stringa ed eliminandolo dall'array;

`$data = unserialize('a:4:{s:6:"module";a:93:{s:6:"action";i:0;s:7:"antibot";i:0;s:14:"automated_cron";i:0;s:3:"ban";i:0;s:5:"blazy";i:0;s:8:"blazy_ui";i:0;s:5:"block";i:0;s:13:"block_content";i:0;s:10:"breakpoint";i:0;s:7:"captcha";i:0;s:8:"ckeditor";i:0;s:11:"ckwordcount";i:0;s:13:"collapse_text";i:0;s:5:"color";i:0;s:7:"comment";i:0;s:6:"config";i:0;s:18:"config_translation";i:0;s:7:"contact";i:0;s:13:"contact_block";i:0;s:10:"contextual";i:0;s:6:"ctools";i:0;s:8:"datetime";i:0;s:5:"dblog";i:0;s:12:"double_field";i:0;s:18:"dynamic_page_cache";i:0;s:6:"editor";i:0;s:6:"entity";i:0;s:5:"field";i:0;s:11:"field_group";i:0;s:8:"field_ui";i:0;s:4:"file";i:0;s:7:"fillpdf";i:0;s:6:"filter";i:0;s:11:"fontawesome";i:0;s:17:"form_mode_control";i:0;s:16:"google_analytics";i:0;s:4:"help";i:0;s:7:"history";i:0;s:5:"image";i:0;s:4:"imce";i:0;s:8:"language";i:0;s:4:"link";i:0;s:6:"locale";i:0;s:5:"media";i:0;s:11:"menu_markup";i:0;s:17:"menu_multilingual";i:0;s:7:"menu_ui";i:0;s:7:"metatag";i:0;s:4:"nise";i:0;s:4:"node";i:0;s:12:"notification";i:0;s:7:"options";i:0;s:10:"page_cache";i:0;s:11:"panelbutton";i:0;s:4:"path";i:0;s:6:"plugin";i:0;s:3:"rdf";i:0;s:16:"responsive_image";i:0;s:5:"rules";i:0;s:10:"rules_test";i:0;s:6:"search";i:0;s:13:"serialization";i:0;s:8:"shortcut";i:0;s:5:"slick";i:0;s:8:"slick_ui";i:0;s:11:"slick_views";i:0;s:4:"smtp";i:0;s:6:"system";i:0;s:8:"taxonomy";i:0;s:4:"text";i:0;s:5:"token";i:0;s:7:"toolbar";i:0;s:4:"tour";i:0;s:10:"typed_data";i:0;s:6:"update";i:0;s:4:"user";i:0;s:11:"userprotect";i:0;s:18:"vem_migrate_oembed";i:0;s:5:"video";i:0;s:17:"video_embed_field";i:0;s:17:"video_embed_html5";i:0;s:17:"video_embed_media";i:0;s:8:"views_ui";i:0;s:7:"webform";i:0;s:22:"webform_submission_log";i:0;s:10:"webform_ui";i:0;s:10:"contribute";i:1;s:17:"menu_link_content";i:1;s:8:"pathauto";i:1;s:19:"content_translation";i:10;s:5:"views";i:10;s:8:"standard";i:1000;s:20:"eu_cookie_compliance";i:1001;}s:5:"theme";a:5:{s:6:"stable";i:0;s:6:"classy";i:0;s:5:"seven";i:0;s:10:"uniselinus";i:0;s:16:"uniselinus_admin";i:0;}s:7:"profile";s:8:"standard";s:5:"_core";a:1:{s:19:"default_config_hash";s:43:"R4IF-ClDHXxblLcG0L7MgsLvfBIMAvi_skumNFQwkDc";}}');  
 unset($data['module']['nome_modulo']);  
 echo (serialize($data));  
`
Aggiornare la tabella;
Ripetere la stessa procedura per la tabellla `cache_config`;
**Se si vuole allo stesso tempo rimuovere il modulo, eliminare quindi l'intera cartella che lo contiene;**
Finito!!!