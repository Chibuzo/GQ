{% extends 'layout.swig' %}
{% set title = 'Company Dashboard' %}
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
								<th>PERCENTILE</th>
								<th>AVERAGE</th>
								<th>RESULT</th>
							</tr>
						</thead>
						<tbody>
						{% for result in results %}
							<tr>
								<td>{{ result.test.category.cateogry }}</td>
								<td>{{ result.percentage }}%</td>
								<td>{{ result.percentile }}</td>
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