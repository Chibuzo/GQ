{% extends 'layout.swig' %}
{% set title = 'Test Result' %}
{% block page_title %}
	<i class="pe-7s-bell"></i> Application Test Notice
{% endblock %}

{% block body %}
	<h2>{{ test.category.category }} Test Result</h2>
	<p>{{ result.jobtest.test_title }}</p>
	<div><strong>Type: </strong>{{ test.category.category }}</div>
	<div><strong>Percentage Score: </strong>{{ result.percentage }}</div>
	<div><strong>Percentile: </strong>{{ result.percentile }}</div>
	<div><strong>Average Score: </strong>{{ result.average_score }}</div>
	<div><strong>Result: </strong>{{ result.test_result }}</div>
{% endblock %}