{% extends 'layout.swig' %}
{% set title = 'Test Result' %}
{% block page_title %}
	<i class="pe-7s-bell"></i> Application Test Notice
{% endblock %}

{% block body %}
	<h3>{{ test.category.category }} Test Result</h3>
	<p>{{ result.jobtest.test_title }}</p>
	<dl class="dl-horizontal">
		<dt>Type:</dt><dd>{{ test.category.category }}</dd>
		<dt>Percentage Score:</dt><dd>{{ result.percentage }}%</dd>
		<dt>Percentile: </dt><dd>{{ result.percentile }}</dd>
		<dt>Average Score: </dt><dd>{{ result.average_score }}</dd>
		<dt>Result: </dt><dd>{{ result.test_result }}</dd>
	</dl>
{% endblock %}