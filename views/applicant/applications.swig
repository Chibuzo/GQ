{% extends 'layout.swig' %}
{% set title = 'Manage Applications' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Manage Applications
{% endblock %}

{% block body %}
	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">All Applications</h4>
					<p class="category"></p>
				</div>
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped">
					<thead>
					<tr>
						<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
						<th>Date</th>
						<th>Job Title</th>
						<th><i class="fa fa-map-marker"></i> Location</th>
						<th>Job Level</th>
						<th>Status</th>
						<th><i class="fa fa-calendar"></i> Closing Date</th>
						<th class="text-center">Action</th>
					</tr>
					</thead>
					<tbody>
					{% set n = 0 %}
					{% for job in jobs %}
						{% set n = n + 1 %}
						{% if job.tests.length < 1 %}
							{% set status = 'Under Review' %}
							{% set btn_state = "disabled" %}
						{% else %}
							{% set status = job.status %}
							{% set btn_state = "" %}
						{% endif %}
						<tr id="{{ job.id }}">
							<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
							<td>{{ job.createdAt | date('d-m-Y') }}</td>
							<td>{{ job.job.job_title }}</td>
							<td>{{ job.job.location }}</td>
							<td>{{ job.job.job_level }}</td>
							<td>{{ status }}</td>
							<td>{{ job.job.closing_date | date('d-m-Y') }}</td>
							<td class="opt-icons text-center dropdown">
								<a href="" {{ btn_state }} class="view-tests btn btn-success btn-fill btn-xs" rel="tooltip" title="Tests" data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'> Take Test</a>
								<ul class='dropdown-menu pull-left'>
									<li class='dropdown-header'>Required Online Tests for the Job</li>
									{% for test in job.tests %}
										{% if test.test_source == 'gq' %}
											<li><a href="/gqtest/gettest/{{ test.gq_test.id }}" class=""><i class="fa fa-hand-o-right"></i> {{ test.test_title }}</a></li>
										{% else %}
											<li><a href="/gettest/{{ test.test.test_id }}/{{ job.id }}" class=""><i class="fa fa-hand-o-right"></i> {{ test.test_title }}</a></li>
										{% endif %}
									{% endfor %}
								</ul>
							</td>
						</tr>
					{% endfor %}
					</tbody>
				</table>
				{% if n == 0 %}
					<div class="alert alert-info">You have not applied for any jobs.</div>
				{% endif %}
			</div>
		</div>
	</div>

{% endblock %}


{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$(".jobs").addClass('active');

	$(".get-test").click(function (e) {
		e.preventDefault();
		var test_id = $(this).data('test_id');
		$.post('/test/getlanding-page', { 'test_id': test_id }, function (d) {

		})
	})
});
</script>
