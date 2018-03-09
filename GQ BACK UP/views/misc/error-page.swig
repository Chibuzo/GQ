{% extends 'layout.swig' %}
{% set title = 'Error: Something Went wrong' %}
{% block page_title %}
	<i class="pe-7s-warning"></i> &nbsp;Error!
{% endblock %}

{% block body %}
<div class="alert alert-warning">{{ error }}<br>To go back, <a href="{{ url }}">click here</a></div>
{% endblock %}