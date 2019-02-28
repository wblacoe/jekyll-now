---
layout: post
title: Web-scraping with Java
tags: [Computer Science, Programming, Java]
---

<img class="floatleft" src="/images/dukeInSpiderWeb.png" />
Recently I decided to practise web-scraping. At the time I was looking into medical NLP. So I thought I would combine the two and collect some medical data. I chose the website for the German edition of the International Statistical Classification of Diseases and Related Health Problems (ICD). It can be thought of as semi-structured online data.

[The initial page](http://www.icd-code.de/icd/code/ICD-10-GM.html) lists the 22 chapters of the ICD 10. Each chapter consists of bundles of sections on three levels of granularity. Scarlet fever, for example is found by selecting chapter I for "certain infectious and parasitic diseases", which is comprised of sections A00-B99. Next going to sections A30-A49 for "other bacterial diseases", and you find section A38 for scarlet fever. Each section and bundle of sections is on its own web page.

All sections are thus leaves in a tree, and the initial page showing the chapter index is the tree's root. Intermediate tree nodes group related diseases and have a description of their own. Generally speaking, each node has a title and a description, and some have a description of excluded and included diseases. The goal of my web-scraping program is to collect all these data points from the website and store them in an XML document. Traversing the site is simple because of its tree-shaped structure: Each non-leaf web document contains hyperlinks to its constituent documents.

The more difficult and unstructured part is extracting the text for each data point from the webpages' HTML code.  Since this differs at each level/generation in the tree, I created one extractor object per level:
- The first extractor handles the root by going through each entry in the table of chapters.
- The second extractor grabs the title, a description, the "included" and "excluded" information if it is available, and then the list of lower-order (bundles of) sections. This extractor is applied to two subsequent levels in the tree, as they are conceptually equal.
- The third and final extractor is similar to the second except that it need not look for further subordinated documents. It also needs to be more flexible in parsing the HTML code because at this level more divers formatting is encountered.

My program's parsing methods are ad hoc because I wrote them having only eye-balled the HTML documents. After some trial and error the processing ran smoothly and culminated in a well-formed XML document. Below is an excerpt of the entire tree, first as XML text and below that as an interactive tree that you can expand and collapse. I created the latter using a JavaScript tool called [jsTree](http://jstree.com).

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

To view the **code** of my web-scraper go to [this repository](https://github.com/wblacoe/icd10_scraper).

<link rel="stylesheet" href="/jstree/themes/default/style.min.css" />
<script src="/jstree/jquery.min.js"></script>
<script src="/jstree/jstree.min.js"></script>
<script>
	$(document).ready(function(){
		$('#ulli').jstree()
	});
</script>

Update: In the mean time I also found editions of [ICD 10](https://icd.who.int/browse10/2016/en) and the recently published [ICD 11](https://icd.who.int/browse11/l-m/en) that are structured as an expandable/collapsable tree similar to the one above. The latter even comes with an [API](https://icd.who.int/icdapi).