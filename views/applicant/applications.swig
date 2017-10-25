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
						<th><i class="fa fa-calendar"></i> Closes On</th>
						<th class="text-center">Action</th>
					</tr>
					</thead>
					<tbody>
					{% set n = 0 %}
					{% for job in jobs %}
						{#{% set applications = job.applications.length %}#}
						<tr id="{{ job.id }}">
							<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
							<td>{{ job.createdAt | date('d M, Y') }}</td>
							<td>{{ job.job.job_title }}</td>
							<td>{{ job.job.location }}</td>
							<td>{{ job.job.job_level }}</td>
							<td>{{ job.status }}</td>
							<td>{{ job.job.closing_date | date('d M, Y') }}</td>
							<td class="opt-icons text-center">
								<a href="" class="view-tests btn btn-success btn-fill btn-xs" rel="tooltip" title="Tests"> Write Test</a>
							</td>
						</tr>
					{% endfor %}
					</tbody>
				</table>
			</div>
		</div>
	</div>

{% endblock %}


{% block scriptTag %}
<script type="text/javascript">
	$(document).ready(function() {

	});
</script>
