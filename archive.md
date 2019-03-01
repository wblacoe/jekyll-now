---
layout: page
titel: Blog Archive
permalink: /archive/
---



<script>
var choose = function(index){
  document.getElementById("square" + index).className="selectedSquare";
  document.getElementById("square" + (1 - index)).className="notSelectedSquare";
  document.getElementById("section" + index).className="visibleSection";
  document.getElementById("section" + (1 - index)).className="invisibleSection";
}
</script>

<table style="text-align:center; vertical-align:middle; width:100%;">
  <tr>
    <td>
      <span id="square0" class="selectedSquare" onclick="choose(0);">Sorted By Tags</span>
    </td>
    <td>
      <span id="square1" class="notSelectedSquare" onclick="choose(1);">Sorted By Months</span>
    </td>
  </tr>
</table>
<div style="height:80px;">&nbsp;</div>




<div id="section0" class="visibleSection">
{% comment%}
Adapted from https://codinfox.github.io/dev/2015/03/06/use-tags-and-categories-in-your-jekyll-based-github-pages/
{% endcomment%}

{% assign rawtags = "" %}
{% for post in site.posts %}
{% assign ttags = post.tags | join:'|' | append:'|' %}
{% assign rawtags = rawtags | append:ttags %}
{% endfor %}

{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}

{% for tag in rawtags %}
{% if tag != "" %}

{% if tags == "" %}
{% assign tags = tag | split:'|' %}
{% endif %}

{% unless tags contains tag %}
{% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
{% endunless %}
{% endif %}
{% endfor %}


{% for tag in tags %}
<a href="#{{ tag | slugify }}" class="tag"> {{ tag }} </a> &nbsp;
{% endfor %}

{% for tag in tags %}
<h2 id="{{ tag | slugify }}">{{ tag }}</h2>
<ul class="codinfox-category-list">
  {% for post in site.posts %}
  {% if post.tags contains tag %}
  <li>
    <h3>
      <a href="{{ post.url }}">
        {{ post.title }}
        <span style="font-size:small;">({{ post.date | date_to_string }})</span>
      </a>
    </h3>
  </li>
  {% endif %}
  {% endfor %}
</ul>
{% endfor %}
</div>





<div id="section1" class="invisibleSection">
{% comment%}
https://gist.github.com/tuananh/7432553
{% endcomment%}

{% assign rawmonths = "" %}
{% for post in site.posts %}
{% assign month = post.date | date: '%B %Y' %}
{% assign rawmonths = rawmonths | append:month | append:'|' %}
{% endfor %}

{% assign rawmonths = rawmonths | split:'|' | sort %}

{% assign months = "" %}

{% for month in rawmonths %}
{% if month != "" %}

{% if months == "" %}
{% assign months = month | split:'|' %}
{% endif %}

{% unless months contains month %}
{% assign months = months | join:'|' | append:'|' | append:month | split:'|' %}
{% endunless %}
{% endif %}
{% endfor %}

{% for month in months %}
<a href="#{{ month | slugify }}" class="tag"> {{ month }} </a> &nbsp;
{% endfor %}


{% assign postsByYearMonth = site.posts | group_by_exp:"post", "post.date | date: '%B %Y'"  %}
{% for yearMonth in postsByYearMonth %}
  <h2 id="{{ yearMonth.name | slugify }}">{{ yearMonth.name }}</h2>
    <ul class="codinfox-category-list">
      {% for post in yearMonth.items %}
        <li>
		  <h3>
		    <a href="{{ post.url }}">
			  {{ post.title }}
			  <span style="font-size:small;">({{ post.date | date_to_string }})</span>
			</a>
		  </h3>
		</li>
      {% endfor %}
    </ul>
{% endfor %}
</div>