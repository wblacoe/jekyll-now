---
layout: page
titel: Blog Archive
permalink: /archive/
---



<script>
var choose = function(index){
  document.getElementById("label" + index).style["font-weight"]="bold";
  document.getElementById("label" + (3 - index)).style["font-weight"]="normal";
  document.getElementById("section" + index).style["display"]="block";
  document.getElementById("section" + (3 - index)).style["display"]="none";
}
</script>

<table style="text-align:center; vertical-align:middle; width:100%; border-width:1px;">
  <tr>
    <td id="td1" onclick="choose(1); padding:5px;">
      <span id="label1" style="cursor:pointer; font-weight:bold;">Sort By Tags</span>
    </td>
    <td id="td2" onclick="choose(2); padding:5px;">
      <span id="label2" style="cursor:pointer; font-weight:normal;">Sort By Tags</span>
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


<br/>
<h1>All Blog Tags
{% for tag in tags %}
<a href="#{{ tag | slugify }}" class="tag"> {{ tag }} </a> &nbsp;
{% endfor %}

<br/>
<h1>All Posts grouped by Tags
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

{% assign postsByYearMonth = site.posts | group_by_exp:"post", "post.date | date: '%Y %b'"  %}
{% for yearMonth in postsByYearMonth %}
  <h3>{{ yearMonth.name }}</h3>
    <ul>
      {% for post in yearMonth.items %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
{% endfor %}
</div>