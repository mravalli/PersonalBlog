---
title: 'Firma automatica per ogni post'
short: 'Firma automatica per ogni post'
publishedAt: '2013-08-28'
image: '/images/libri.webp'
tags: ['Fuffa', 'Wordpress']
---

Migliorare la propria presenza sul web, questo è l’obiettivo! Di chi direte voi. Di chiunque in pratica

Se possedete un blog basato su wordpress, come questo, con una semplice aggiunta di codice è possibile fare in modo che ogni vostro articolo (post) presenti alla fine di esso una “firma”, che può essere il vostro nome, un motto o qualunque cosa vi venga in mente di mettervi senza doverlo riscrivere ogni volta; in maniera del tutto automatizzata quindi.

Per farlo basterà aggiungere il seguente codice al file functions.php, generalmente editabile da Bacheca -> Aspetto -> editor  
`<br></br>
add_filter('the_content','add_signature');
function add_signature($text) {  
 global $post;  
 if($post->post_type == 'post')  
 $text .= '<div> - scritto da Mario Ravalli</div>';  
 return $text;  
 }`

dove al posto di ” – scritto da Mario Ravalli” metterete ciò che più vi aggrada ?