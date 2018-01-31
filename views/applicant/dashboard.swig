{% extends 'layout.swig' %}
{% set title = 'Candidate Dashboard' %}
{% block page_title %}
	<i class="pe-7s-graph"></i> Dashboard
{% endblock %}

{% block body %}
	<div class="row">
		<div class="col-md-6">
			<div class="card">
				<div class="header">
					<h4 class="title">Recent Test Results</h4>
					<p class="category"></p>
				</div>
				<div class="content table-responsive table-full-width">
					<table class="table table-striped">
						<thead>
							<tr>
								<th>TEST TITLE</th>
								<th>SCORE</th>
								<th>PERCENTAGE</th>
								<th class="text-center">AVERAGE</th>
								<th>RESULT</th>
							</tr>
						</thead>
						<tbody>
						{% set n = 0 %}
						{% for result in gq_results %}
							{% set n = n + 1 %}
							<tr>
								<td>{{ result.test_title }}</td>
								<td>{{ result.score }}</td>
								<td>{{ result.percentage }}%</td>
								<td class="text-center">{{ result.average }}</td>
								<td>{{ result.result }}</td>
							</tr>
						{% endfor %}

						{% for result in xpr_results %}
							{% set n = n + 1 %}
							<tr>
								<td>{{ result.test_title }}</td>
								{#<td>{{ result.percentile }}</td>#}
								<td></td>
								<td>{{ result.percentage }}%</td>
								<td>{{ result.average_score }}</td>
								<td>{{ result.test_result }}</td>
							</tr>
						{% endfor %}
						</tbody>
					</table>
					{% if n == 0 %}
						<div class="alert alert-info">You've not taken any test yet</div>
					{% endif %}
				</div>
			</div>
		</div>

		<div class="col-md-6">
			<div class="card">
				<div class="header">
					<h4 class="title">Recent Jobs</h4>
					<p class="category">Recent Jobs you might be interested in</p>
				</div>
				<hr>
				<div class="content table-responsive table-full-width">

				</div>
			</div>
		</div>
	</div>

{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
	$(".dashboard").addClass('active');
});
</script>