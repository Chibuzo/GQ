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
						{% for result in gq_results %}
							<tr>
								<td>{{ result.test_title }}</td>
								<td>{{ result.score }}</td>
								<td>{{ result.percentage }}%</td>
								<td class="text-center">{{ result.average }}</td>
								<td>{{ result.result }}</td>
							</tr>
						{% endfor %}

						{% for result in xpr_results %}
							<tr>
								<td>{{ result.test }}</td>
								<td>{{ result.percentile }}%</td>
								<td>{{ result.percentage }}</td>
								<td>{{ result.average_score }}</td>
								<td>{{ result.test.result }}</td>
							</tr>
						{% endfor %}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

{% endblock %}