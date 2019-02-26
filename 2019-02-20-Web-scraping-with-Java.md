---
layout: post
title: Web-scraping with Java
tags: [Computer Science, Programming, Java]
permalink: /temp/
---

<img class="floatleft" src="/images/dukeInSpiderWeb.png" />

. website for German version of ICD 10
. different extractors for different depths
. JSoup parses the HTML so that I don't have to scan the text manually/in a flat way. I can jump to certain elements and traverse the tree in a systematic way.
. I saw that for each item there is includes, excludes and a description.
. I eye-balled some of the HTML files to understand their structure. Then I used ad hoc methods for extracting the data inside the HTML files at each level.
. Each non-leaf document had a link to a webpage at a lower level. level depth = 3.
. below an excerpt of the scraped data is shown in a single XML tree with very generic tags: node, url, content
. below that is the same excerpt shown in a tree that can be expanded and collapsed because it is written in JavaScript (LINK to jstree.com).
. to view the code go to LINK repository.


<link rel="stylesheet" href="/jstree/themes/default/style.min.css" />
<script src="/jstree/jquery.min.js"></script>
<script src="/jstree/jstree.min.js"></script>
<script>
	$(document).ready(function(){
		$('#ulli').jstree()
	});
</script>

<textarea cols="95" rows="20">
<node>
  <url>ICD-10-GM.html</url>
  <content>ICD-10-GM</content>
  <node>
    <url>A00-B99.html</url>
    <content>A00-B99</content>
    <node>
      <content>titel</content>
      <node>
        <content>Kapitel I</content>
      </node>
      <node>
        <content>Bestimmte infektiöse und parasitäre Krankheiten</content>
      </node>
    </node>
    <node>
      <content>inklusive</content>
      <node>
        <content>Krankheiten, die allgemein als ansteckend oder übertragbar anerkannt sind</content>
      </node>
    </node>
    <node>
      <content>exklusive</content>
      <node>
        <content>Keimträger oder -ausscheider, einschließlich Verdachtsfällen (Z22.-) Bestimmte lokalisierte Infektionen - siehe im entsprechenden Kapitel des jeweiligen Körpersystems Infektiöse und parasitäre Krankheiten, die Schwangerschaft, Geburt und Wochenbett komplizieren [ausgenommen Tetanus in diesem Zeitabschnitt] (O98.-) Infektiöse und parasitäre Krankheiten, die spezifisch für die Perinatalperiode sind [ausgenommen Tetanus neonatorum, Keuchhusten, Syphilis connata, perinatale Gonokokkeninfektion und perinatale HIV-Krankheit] (P35-P39) Grippe und sonstige akute Infektionen der Atemwege (J00-J22)</content>
      </node>
    </node>
    <node>
      <url>A00-A09.html</url>
      <content>A00-A09</content>
      <node>
        <content>titel</content>
        <node>
          <content>Infektiöse Darmkrankheiten</content>
        </node>
      </node>
      <node>
        <url>A00.-.html</url>
        <content>A00.-</content>
        <node>
          <content>titel</content>
          <node>
            <content>Cholera</content>
          </node>
        </node>
        <node>
          <content>A00.0</content>
          <node>
            <content>titel</content>
            <node>
              <content>Cholera durch Vibrio cholerae O:1, Biovar cholerae</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Klassische Cholera</content>
            </node>
          </node>
        </node>
        <node>
          <content>A00.1</content>
          <node>
            <content>titel</content>
            <node>
              <content>Cholera durch Vibrio cholerae O:1, Biovar eltor</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>El-Tor-Cholera</content>
            </node>
          </node>
        </node>
        <node>
          <content>A00.9</content>
          <node>
            <content>titel</content>
            <node>
              <content>Cholera, nicht näher bezeichnet</content>
            </node>
          </node>
        </node>
      </node>
      <node>
        <url>A01.-.html</url>
        <content>A01.-</content>
        <node>
          <content>titel</content>
          <node>
            <content>Typhus abdominalis und Paratyphus</content>
          </node>
        </node>
        <node>
          <content>A01.0</content>
          <node>
            <content>titel</content>
            <node>
              <content>Typhus abdominalis</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Infektion durch Salmonella typhi</content>
            </node>
            <node>
              <content>Typhoides Fieber</content>
            </node>
          </node>
        </node>
        <node>
          <content>A01.1</content>
          <node>
            <content>titel</content>
            <node>
              <content>Paratyphus A</content>
            </node>
          </node>
        </node>
        <node>
          <content>A01.2</content>
          <node>
            <content>titel</content>
            <node>
              <content>Paratyphus B</content>
            </node>
          </node>
        </node>
        <node>
          <content>A01.3</content>
          <node>
            <content>titel</content>
            <node>
              <content>Paratyphus C</content>
            </node>
          </node>
        </node>
        <node>
          <content>A01.4</content>
          <node>
            <content>titel</content>
            <node>
              <content>Paratyphus, nicht näher bezeichnet</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Infektion durch Salmonella paratyphi o.n.A.</content>
            </node>
          </node>
        </node>
      </node>
      <node>
        <url>A02.-.html</url>
        <content>A02.-</content>
        <node>
          <content>titel</content>
          <node>
            <content>Sonstige Salmonelleninfektionen</content>
          </node>
        </node>
        <node>
          <content>inklusive</content>
          <node>
            <content>Infektion oder Lebensmittelvergiftung durch Salmonellen außer durch Salmonella typhi und Salmonella paratyphi</content>
          </node>
        </node>
        <node>
          <content>A02.0</content>
          <node>
            <content>titel</content>
            <node>
              <content>Salmonellenenteritis</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Enteritis infectiosa durch Salmonellen</content>
            </node>
          </node>
        </node>
        <node>
          <content>A02.1</content>
          <node>
            <content>titel</content>
            <node>
              <content>Salmonellensepsis</content>
            </node>
          </node>
        </node>
        <node>
          <content>A02.2</content>
          <node>
            <content>titel</content>
            <node>
              <content>Lokalisierte Salmonelleninfektionen</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Arthritis+ (M01.3-*) durch Salmonellen</content>
            </node>
            <node>
              <content>Meningitis+ (G01*) durch Salmonellen</content>
            </node>
            <node>
              <content>Osteomyelitis+ (M90.2-*) durch Salmonellen</content>
            </node>
            <node>
              <content>Pneumonie+ (J17.0*) durch Salmonellen</content>
            </node>
            <node>
              <content>Tubulointerstitielle Nierenkrankheit+ (N16.0*) durch Salmonellen</content>
            </node>
          </node>
        </node>
        <node>
          <content>A02.8</content>
          <node>
            <content>titel</content>
            <node>
              <content>Sonstige näher bezeichnete Salmonelleninfektionen</content>
            </node>
          </node>
        </node>
        <node>
          <content>A02.9</content>
          <node>
            <content>titel</content>
            <node>
              <content>Salmonelleninfektion, nicht näher bezeichnet</content>
            </node>
          </node>
        </node>
      </node>
      <node>
        <url>A03.-.html</url>
        <content>A03.-</content>
        <node>
          <content>titel</content>
          <node>
            <content>Shigellose [Bakterielle Ruhr]</content>
          </node>
        </node>
        <node>
          <content>A03.0</content>
          <node>
            <content>titel</content>
            <node>
              <content>Shigellose durch Shigella dysenteriae</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Shigellose durch Shigellen der Gruppe A [Shiga-Kruse-Ruhr]</content>
            </node>
          </node>
        </node>
        <node>
          <content>A03.1</content>
          <node>
            <content>titel</content>
            <node>
              <content>Shigellose durch Shigella flexneri</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Shigellose durch Shigellen der Gruppe B</content>
            </node>
          </node>
        </node>
        <node>
          <content>A03.2</content>
          <node>
            <content>titel</content>
            <node>
              <content>Shigellose durch Shigella boydii</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Shigellose durch Shigellen der Gruppe C</content>
            </node>
          </node>
        </node>
        <node>
          <content>A03.3</content>
          <node>
            <content>titel</content>
            <node>
              <content>Shigellose durch Shigella sonnei</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Shigellose durch Shigellen der Gruppe D</content>
            </node>
          </node>
        </node>
        <node>
          <content>A03.8</content>
          <node>
            <content>titel</content>
            <node>
              <content>Sonstige Shigellosen</content>
            </node>
          </node>
        </node>
        <node>
          <content>A03.9</content>
          <node>
            <content>titel</content>
            <node>
              <content>Shigellose, nicht näher bezeichnet</content>
            </node>
          </node>
          <node>
            <content>inklusive</content>
            <node>
              <content>Bakterielle Ruhr [Bakterielle Dysenterie] o.n.A.</content>
            </node>
          </node>
        </node>
      </node>
    </node>
  </node>
</node>
</textarea>

<div id="ulli" style="width:100%">
<ul><li class="jstree-open">
  ICD-10-GM
  <ul><li class="jstree-open">
    A00-B99
    <ul><li class="jstree-open">
      titel
      <ul><li>
        Kapitel I
      </li></ul>
      <ul><li>
        Bestimmte infektiöse und parasitäre Krankheiten
      </li></ul>
    </li></ul>
    <ul><li>
      inklusive
      <ul><li>
        Krankheiten, die allgemein als ansteckend oder übertragbar anerkannt sind
      </li></ul>
    </li></ul>
    <ul><li>
      exklusive
      <ul><li>
        Keimträger oder -ausscheider, einschließlich Verdachtsfällen (Z22.-) Bestimmte lokalisierte Infektionen - siehe im entsprechenden Kapitel des jeweiligen Körpersystems Infektiöse und parasitäre Krankheiten, die Schwangerschaft, Geburt und Wochenbett komplizieren [ausgenommen Tetanus in diesem Zeitabschnitt] (O98.-) Infektiöse und parasitäre Krankheiten, die spezifisch für die Perinatalperiode sind [ausgenommen Tetanus neonatorum, Keuchhusten, Syphilis connata, perinatale Gonokokkeninfektion und perinatale HIV-Krankheit] (P35-P39) Grippe und sonstige akute Infektionen der Atemwege (J00-J22)
      </li></ul>
    </li></ul>
    <ul><li class="jstree-open">
      A00-A09
      <ul><li class="jstree-open">
        titel
        <ul><li>
          Infektiöse Darmkrankheiten
        </li></ul>
      </li></ul>
      <ul><li>
        A00.-
        <ul><li>
          titel
          <ul><li>
            Cholera
          </li></ul>
        </li></ul>
        <ul><li>
          A00.0
          <ul><li>
            titel
            <ul><li>
              Cholera durch Vibrio cholerae O:1, Biovar cholerae
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Klassische Cholera
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A00.1
          <ul><li>
            titel
            <ul><li>
              Cholera durch Vibrio cholerae O:1, Biovar eltor
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              El-Tor-Cholera
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A00.9
          <ul><li>
            titel
            <ul><li>
              Cholera, nicht näher bezeichnet
            </li></ul>
          </li></ul>
        </li></ul>
      </li></ul>
      <ul><li>
        A01.-
        <ul><li>
          titel
          <ul><li>
            Typhus abdominalis und Paratyphus
          </li></ul>
        </li></ul>
        <ul><li>
          A01.0
          <ul><li>
            titel
            <ul><li>
              Typhus abdominalis
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Infektion durch Salmonella typhi
            </li></ul>
            <ul><li>
              Typhoides Fieber
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A01.1
          <ul><li>
            titel
            <ul><li>
              Paratyphus A
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A01.2
          <ul><li>
            titel
            <ul><li>
              Paratyphus B
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A01.3
          <ul><li>
            titel
            <ul><li>
              Paratyphus C
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A01.4
          <ul><li>
            titel
            <ul><li>
              Paratyphus, nicht näher bezeichnet
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Infektion durch Salmonella paratyphi o.n.A.
            </li></ul>
          </li></ul>
        </li></ul>
      </li></ul>
      <ul><li class="jstree-open">
        A02.-
        <ul><li class="jstree-open">
          titel
          <ul><li>
            Sonstige Salmonelleninfektionen
          </li></ul>
        </li></ul>
        <ul><li class="jstree-open">
          inklusive
          <ul><li>
            Infektion oder Lebensmittelvergiftung durch Salmonellen außer durch Salmonella typhi und Salmonella paratyphi
          </li></ul>
        </li></ul>
        <ul><li>
          A02.0
          <ul><li>
            titel
            <ul><li>
              Salmonellenenteritis
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Enteritis infectiosa durch Salmonellen
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A02.1
          <ul><li>
            titel
            <ul><li>
              Salmonellensepsis
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A02.2
          <ul><li>
            titel
            <ul><li>
              Lokalisierte Salmonelleninfektionen
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Arthritis+ (M01.3-*) durch Salmonellen
            </li></ul>
            <ul><li>
              Meningitis+ (G01*) durch Salmonellen
            </li></ul>
            <ul><li>
              Osteomyelitis+ (M90.2-*) durch Salmonellen
            </li></ul>
            <ul><li>
              Pneumonie+ (J17.0*) durch Salmonellen
            </li></ul>
            <ul><li>
              Tubulointerstitielle Nierenkrankheit+ (N16.0*) durch Salmonellen
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A02.8
          <ul><li>
            titel
            <ul><li>
              Sonstige näher bezeichnete Salmonelleninfektionen
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A02.9
          <ul><li>
            titel
            <ul><li>
              Salmonelleninfektion, nicht näher bezeichnet
            </li></ul>
          </li></ul>
        </li></ul>
      </li></ul>
      <ul><li>
        A03.-
        <ul><li>
          titel
          <ul><li>
            Shigellose [Bakterielle Ruhr]
          </li></ul>
        </li></ul>
        <ul><li>
          A03.0
          <ul><li>
            titel
            <ul><li>
              Shigellose durch Shigella dysenteriae
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Shigellose durch Shigellen der Gruppe A [Shiga-Kruse-Ruhr]
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A03.1
          <ul><li>
            titel
            <ul><li>
              Shigellose durch Shigella flexneri
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Shigellose durch Shigellen der Gruppe B
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A03.2
          <ul><li>
            titel
            <ul><li>
              Shigellose durch Shigella boydii
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Shigellose durch Shigellen der Gruppe C
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A03.3
          <ul><li>
            titel
            <ul><li>
              Shigellose durch Shigella sonnei
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Shigellose durch Shigellen der Gruppe D
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A03.8
          <ul><li>
            titel
            <ul><li>
              Sonstige Shigellosen
            </li></ul>
          </li></ul>
        </li></ul>
        <ul><li>
          A03.9
          <ul><li>
            titel
            <ul><li>
              Shigellose, nicht näher bezeichnet
            </li></ul>
          </li></ul>
          <ul><li>
            inklusive
            <ul><li>
              Bakterielle Ruhr [Bakterielle Dysenterie] o.n.A.
            </li></ul>
          </li></ul>
        </li></ul>
      </li></ul>
    </li></ul>
  </li></ul>
</li></ul>
</div>

To view the **code** go to this [repository](https://github.com/wblacoe/...).