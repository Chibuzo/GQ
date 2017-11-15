{% extends 'layout.swig' %}
{% set title = 'Manage Jobs' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Manage Job Board
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/job/addjob" class="btn btn-danger btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add Job</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">All Jobs</h4>
					<p class="category"></p>
				</div>
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped tablebordered">
					<thead>
					<tr>
						<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
						<th>Date Added</th>
						<th>Job Title</th>
						<th>Job Cateogory</th>
						<th style="width: 60px">Applications</th>
						<th>Status</th>
						<th><i class="fa fa-calendar"></i> Published On</th>
						<th><i class="fa fa-calendar"></i> Closes On</th>
						<th class="text-center">Action</th>
					</tr>
					</thead>
					<tbody>
					{% set n = 0 %}
					{% for job in jobs %}
						{% set applications = job.applications.length %}
						<tr id="{{ job.id }}">
							<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
							<td>{{ job.createdAt | date('d M, Y') }}</td>
							<td>{{ job.job_title }}</td>
							<td>{{ job.category.category }}</td>
							<td class="text-right"><a href="/job/view-candidates/{{ job.id }}">{{ applications }}</a></td>
							<td>{{ job.status }}</td>
							<td>{{ job.date_published | date('d M, Y') }}</td>
							<td>{{ job.closing_date | date('d M, Y') }}</td>
							<td class="opt-icons text-center">
								<a href="/job/editjob/{{ job.id }}" class="edit-job" rel="tooltip" title="Edit Job"><i class="fa fa-pencil fa-lg"></i></a>
								<a href="" class="view-tests" rel="tooltip" title="Manage Tests"><i class="fa fa-book fa-lg"></i></a>
								<a href="" class="upload-csv" rel="tooltip" title="Upload CSV"><i class="fa fa-file-text-o fa-lg"></i></a>
								<a href="" class="del-job" rel="tooltip" title="Delete Job"><i class="fa fa-trash-o fa-lg"></i></a>
							</td>
						</tr>
					{% endfor %}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<form action="/company/upload-csv" method="post" id="form-csv" enctype="multipart/form-data">
		<input type="hidden" name="job_id" id="job_id" />
		<input type="file" name="csv" id="csv" class="hidden" />
	</form>
{% endblock %}

{% block modals %}
{% include "includes/job-form.swig" %}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$(".upload-csv").click(function(e) {
		e.preventDefault();
		var job_id = $(this).parents('tr').attr('id');
		$("#job_id").val(job_id);
		$("#csv").click();
	});

	$("#csv").change(function() {
		$("#form-csv").submit();
	});


//	$(".edit-job").click(function(e) {
//		e.preventDefault();
//
//		var $thisParent = $(this).parents('tr');
//		var category_id = $thisParent.find('td:nth-child(4)').attr('id');
//	})


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
});
</script>
