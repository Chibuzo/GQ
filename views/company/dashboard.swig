{% extends 'layout.swig' %}
{% set title = 'Company Dashboard' %}
{% block page_title %}
	<i class="pe-7s-graph"></i> Dashboard
{% endblock %}

{% block body %}
<style>
	.widget-box {
		padding: 11px;
		border: #e0e0e0 solid thin;
		/*margin: 10px;*/
		margin-top: 0;
		overflow: auto;
		background: #fff;
		margin-bottom: 25px;
	}

	.widget-box i {
		font-size: 45px;
		margin-top: 15px;
	}

	.widget-box h3 {
		margin: 5px;
	}
</style>


<div class="row">
	<div class="col-md-4">
		<div class="widget-box bg-green">
			<div class="col-md-6">
				<i class="pe-7s-portfolio"></i>
			</div>
			<div class="col-md-6 text-center">
				{% set active_jobs = 0 %}
				{% set applicants = 0 %}
				{% set views = 0 %}
				{% for job in jobs %}
					{% if job.status == 'Active' %}
						{% set active_jobs = active_jobs + 1 %}
					{% endif %}
					{% set applicants += job.applications.length %}
					{% set views += job.view_count %}
				{% endfor %}
				<h3>{{ active_jobs }}</h3>
				<p>Active Jobs</p>
			</div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-portfolio"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ jobs.length }}</h3>
				<p>All Jobs</p>
			</div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-users"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ applicants }}</h3>
				<p>Applicants</p>
			</div>
		</div>
	</div>

	<div class="col-md-3 hidden">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-graph3"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ (applicants / views) | toFixed(3) }}</h3>
				<p>Engagements</p>
			</div>
		</div>
	</div>
</div>

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
							<th>Job Role</th>
							<th class="text-center">Applicants</th>
							<th class="text-center">Views</th>
							<th>Closing Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					{% for job in jobs %}
						{% if job.status == 'Active' %}
							{% set app_percent = job.applications.length / job.view_count %}
							<tr>
								<td>{{ job.job_title }}</td>
								<td class="text-center">{{ job.applications.length }}</td>
								<td class="text-center">{{ job.view_count }}</td>
								<td>{{ job.closing_date | date('d-m-Y') }}</td>
								<td></td>
							</tr>
						{% endif %}
					{% endfor %}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
	$('.dashboard').addClass('active');
})