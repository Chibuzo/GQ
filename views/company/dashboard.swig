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

	.tests-alert {
		text-align: center;
	}

	.alert-container {
		border-style: solid;
		border-width: 3px;
		border-radius: 5px;
		border-color: white;
		background: white;
	}

	.empty-warning {
		color: black;
		background: none;
		font-weight: bold;
	}

	th {
		text-align: center;
		cursor: default;
	}

	td {
		text-align: center;
		cursor: default;
	}
</style>

	<div class="col-xs-12">
		<div class="row">
			<div class="col-md-4">
				<div class="widget-box">
					<div class="col-xs-6">
						<i class="pe-7s-portfolio"></i>
					</div>
					<div class="col-xs-6 text-center">
						<h3>{{ jobs.length }}</h3>
						<p>All Jobs</p>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="widget-box bg-green">
					<div class="col-xs-6">
						<i class="pe-7s-portfolio"></i>
					</div>
					<div class="col-xs-6 text-center">
						{% set applicants = 0 %}
						{% set views = 0 %}
						{% for job in jobs %}
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
					<div class="col-xs-6">
						<i class="pe-7s-users"></i>
					</div>
					<div class="col-xs-6 text-center">
						<h3>{{ applicants }}</h3>
						<p>Applicants</p>
					</div>
				</div>
			</div>
		</div>

		{% if jobs.length > 0 %}

			<div class="row">
				<div class="col-md-5 pull-right">
					<a href="/job/addjob" class="btn btn-success btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add Job</a>
				</div>
			</div>
			{% if msg.length > 5 %}
				<div class="alert alert-danger">{{ msg }}</div>
			{% endif %}
			<div class="row">
				<div class="col-md-12">
					<div class="card">
						<div class="header row">
							<div class="col-md-6">
								<h4 class="title">All Jobs</h4>
								<p class="category"></p>
							</div>
						</div>
						<div class="content table-responsive table-full-width">
							<ul class="nav nav-tabs">
								<li class="active"><a href="#active_jobs" data-toggle="tab">Active Jobs</a></li>
								<li><a href="#archive" data-toggle="tab">Archived Jobs</a></li>
							</ul>
							<div class="tab-content">

								<div class="tab-pane in fade active" id="active_jobs">
									<table class="table table-striped">
										<thead>
										<tr>
											<th>Date Added</th>
											<th class="text-left">Job Title</th>
											<th>Job Level</th>
											<th>Views</th>
											<th>Applied</th>
											<th>Shortlisted</th>
											<th class="text-left">Posted By</th>
											<th><i class="fa fa-calendar"></i> Closing Date</th>
											<th style="width: 170px">Action</th>
										</tr>
										</thead>
										<tbody>
										{% for job in jobs %}
											{% set applications = job.applications.length %}
											<tr id="{{ job.id }}">
												<td>{{ job.createdAt | date('d-m-Y') }}</td>
												<td class="text-left">{{ job.job_title }}</td>
												<td>{{ job.job_level }}</td>
												<td>{{ job.view_count }}</td>
												<td>{{ applications }}</td>
												{% if job.shortlisted == false %}
													<td> - </td>
												{% else %}
													<td><a href="/job/view-shortlisted/{{ job.id }}">{{ job.shortlisted }}</a></td>
												{% endif %}
												{% if job.poster.id == 0 %}
													<td class="text-left">{{ job.admin_post }}</td>
												{% else %}	
													<td class="text-left">{{ job.poster.fullname }}</td>
												{% endif %}	
												<td>{{ job.closing_date | date('d-m-Y') }}</td>
												<td class="opt-icons text-center">
													<div class="button-group" role="group">
														<a href="/job/editjob/{{ job.id }}" class="edit-job btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Edit Job"><i class="fa fa-pencil fa-lg"></i></a>
														{#<a href="#manageTestModal" data-toggle="modal" class="view-tests" rel="tooltip" title="Manage Tests"><i class="fa fa-book fa-lg"></i></a>#}
														<div class="btn-group">
															<a href="" class="btn btn-secondary btn-xs btn-fill dropdown-toggle" rel="tooltip" title="Add Candidates via CSV Upload" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-file-text-o fa-lg"></i></a>
															<ul class="dropdown-menu dropdown-menu-right">
																<li><a href="" class="upload-csv"><i class="fa fa-upload fa-fw"></i> Upload CSV</a></li>
																<li><a href="/downloadsamplecsv" class="reject-test"><i class="fa fa-download fa-fw"></i>Download Sample CSV</a></li>
															</ul>
														</div>
														<a href="/job/candidates/{{ job.id }}" class="hidden btn btn-secondary btn-xs btn-fill" rel="tooltip" title="View Candidates"><i class="fa fa-users fa-lg"></i></a>
														<a href="" class="del-job btn btn-secondary btn-xs btn-fill btn-danger" rel="tooltip" title="Delete Job"><i class="fa fa-trash-o fa-lg"></i></a>
													</div>
												</td>
											</tr>
										{% endfor %}
										</tbody>
									</table>
								</div>

								<div class="tab-pane fade" id="archive">
									<table class="table table-striped">
										<thead>
										<tr>
											<th>Date Added</th>
											<th class="text-left">Job Title</th>
											<th>Job Level</th>
											<th>Views</th>
											<th>Applied</th>
											<th>Shortlisted</th>
											<th class="text-left">Posted By</th>
											<th><i class="fa fa-calendar"></i> Closing Date</th>
										</tr>
										</thead>
										<tbody>
										{% for job in archived_jobs %}
											{% set applications = job.applications.length %}
											<tr id="{{ job.id }}">
												<td>{{ job.createdAt | date('d-m-Y') }}</td>
												<td class="text-left">{{ job.job_title }}</td>
												<td>{{ job.job_level }}</td>
												<td>{{ job.view_count }}</td>
												<td>{{ applications }}</td>
												{% if job.shortlisted == false %}
													<td> - </td>
												{% else %}
													{#<td><a href="/job/view-shortlisted/{{ job.id }}">{{ job.shortlisted }}</a></td>#}
													<td>{{ job.shortlisted }}</td>
												{% endif %}
												{% if job.poster.id == 0 %}
													<td class="text-left">{{ job.admin_post }}</td>
												{% else %}	
													<td class="text-left">{{ job.poster.fullname }}</td>
												{% endif %}	
												<td>{{ job.closing_date | date('d-m-Y') }}</td>
											</tr>
										{% endfor %}
										</tbody>
									</table>
								</div>

							</div>		
						</div>
					</div>
				</div>
			</div>

		{% else %}

			<div class="row">
				<div class="col-xs-12 alert empty-warning tests-alert" role="alert">
					You've not posted any job yet.
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12" style="text-align: center; margin-bottom: 10px;">
					<a href="/job/addjob" class="btn btn-success btn-fill btnsm" ><i class="fa fa-plus"></i> Add Job</a>
				</div>
			</div>

		{% endif %}

	</div>

	<form action="/company/upload-csv" method="post" id="form-csv" enctype="multipart/form-data">
		<input type="hidden" name="job_id" id="job_id" />
		<input type="file" name="csv" id="csv" class="hidden" />
	</form>

{% endblock %}

{% block modals %}
{#{% include "includes/job-form.swig" %}#}
{#{% include "includes/manage-test-modal.swig" %}#}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$('.dashboard').addClass('active');

	$(".upload-csv").click(function(e) {
		e.preventDefault();
		var job_id = $(this).parents('tr').attr('id');
		$("#job_id").val(job_id);
		$("#csv").click();
	});

	$("#csv").change(function() {
		$("#form-csv").submit();
	});


	$(".view-tests").click(function() {
		var job_id = $(this).parents('tr').attr('id');
		var job_title = $(this).parents('tr').find('td:nth-child(3)').text();
		var job_category = $(this).parents('tr').find('td:nth-child(4)').text();
		var job_level = $(this).parents('tr').find('td:nth-child(5)').text();
		$("#manageTestModal").find('.modal-title').text('Role: ' + job_title);
		$.get('/getJobTest/' + job_category + '/' + job_level, function(d) {
			if (d.status.trim() == 'success') {
				var test_html = '';
				if (d.test.length < 1) {
					$("#manageTestModal .modal-body").find('.alert-info').removeClass('hidden');
					$("#tb-tests").html('');
					return;
				}
				d.test.forEach(function(test) {
					test_html += "<tr>" +
							"<td>" + test.test_title + "</td>" +
							"<td>" + test.job_category + "</td>" +
							"<td>" + test.test.total_questions + "</td>" +
							"<td>" + test.test.duration + "</td>" +
							"</tr>";
				});
				$("#job_id").val(job_id);
				$("#manageTestModal").find(".modal-body").find('.alert-info').addClass('hidden');
				$("#tb-tests").html(test_html);
			}
		}, 'JSON');
	});


	$(".del-job").click(function (e) {
		e.preventDefault();
		var $this = $(this);
		if (confirm("Are you sure you want to delete this job?")) {
			var id = $(this).parents('tr').attr('id');
			$.get('/job/remove', { id: id }, function(d) {
				if (d.status.trim() == 'success') {
					$this.parents('tr').fadeOut();
				}
			}, 'JSON');
		}
	});

	$('#save-rating').click(function() {
		var gq_rating = parseInt($("#gq_assessment").val());
		var jobtest_rating = parseInt($("#job_assessment").val());
		if (gq_rating + jobtest_rating != 100) {
			alert("The contribution of both tests must equal 100");
			return false;
		}
		$.post('/job/set-test-rating', { job_id: $("#job_id").val(), gq_rating: gq_rating , job_test: jobtest_rating });
		$("#manageTestModal").find(".modal-body").find('.alert-success').hide().removeClass('hidden').fadeIn().fadeOut(12000);
	});
});
</script>