{% extends 'layout.swig' %}

{% block page_title %}
	<i class="pe-7s-user"></i> &nbsp;Candidate's Resume
{% endblock %}

{% block body %}
{% include '../cv/viewresume.swig' %}
{% endblock %}
