---
layout: page
titel: Blog Archive
permalink: /archive/
---



<script>
var choose = function(index){
  document.getElementById("label" + index).style["background-color"]="#0df";
  document.getElementById("label" + (3 - index)).style["background-color"]="transparent";
  document.getElementById("section" + index).style["display"]="block";
  document.getElementById("section" + (3 - index)).style["display"]="none";
}
</script>

<table style="text-align:center; vertical-align:middle; width:100%;">
  <tr>
    <td>
      <span id="label1" style="cursor:pointer; padding:20px 20px 20px 20px; background-color:#0df;" onclick="choose(1);">Sort By Tags</span>
    </td>
    <td>
      <span id="label2" style="cursor:pointer; padding:20px 20px 20px 20px; background-color:transparent;" onclick="choose(2);">Sort By Months</span>
    </td>
  </tr>
</table>





<div id="section1">
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





<div id="section2">
{% comment%}
https://gist.github.com/tuananh/7432553
{% endcomment%}

{% assign postsByYearMonth = site.posts | group_by_exp:"post", "post.date | date: '%B %Y'"  %}
{% for yearMonth in postsByYearMonth %}
  <h2>{{ yearMonth.name }}</h2>
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