{% extends 'layout.swig' %}
{% set title = 'Company Jobs' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Company Jobs
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/job/addjob" class="btn btn-success btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add Job</a>
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
						<th>Job Level</th>
						<th>Contract Type</th>
						<th style="width: 60px">Applications</th>
						<th>Poster</th>
						{#<th>Status</th>#}
						<th><i class="fa fa-calendar"></i> Closing Date</th>
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
							<td>{{ job.job_level }}</td>
							<td>{{ job.contract_type }}</td>
							<td class="text-center"><a href="/job/view-applicants/{{ job.id }}">{{ applications }}</a></td>
							<td>{{ job.poster.fullname }}</td>
							<td>{{ job.closing_date | date('d M, Y') }}</td>
							<td class="opt-icons text-center">
								<div class="button-group" role="group">
									<a href="/job/editjob/{{ job.id }}" class="edit-job btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Edit Job"><i class="fa fa-pencil fa-lg"></i></a>
									{#<a href="#manageTestModal" data-toggle="modal" class="view-tests" rel="tooltip" title="Manage Tests"><i class="fa fa-book fa-lg"></i></a>#}
									<a href="" class="upload-csv btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Add Candidates via CSV Upload"><i class="fa fa-file-text-o fa-lg"></i></a>
									{#<a href="/job/candidates/{{ job.id }}" class="btn btn-secondary btn-xs btn-fill" rel="tooltip" title="View Candidates"><i class="fa fa-users fa-lg"></i></a>#}
									{#<a href="" class="del-job btn btn-secondary btn-xs btn-fill btn-danger" rel="tooltip" title="Delete Job"><i class="fa fa-trash-o fa-lg"></i></a>#}
								</div>
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

{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$(".job-page").addClass('active');
	$(".upload-csv").click(function(e) {
		e.preventDefault();
		var job_id = $(this).parents('tr').attr('id');
		$("#job_id").val(job_id);
		$("#csv").click();
	});

	$("#csv").change(function() {
		$("#form-csv").submit();
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

//
//	$('#save-rating').click(function() {
//		var gq_rating = parseInt($("#gq_assessment").val());
//		var jobtest_rating = parseInt($("#job_assessment").val());
//		if (gq_rating + jobtest_rating != 100) {
//			alert("The contribution of both tests must equal 100");
//			return false;
//		}
//		$.post('/job/set-test-rating', { job_id: $("#job_id").val(), gq_rating: gq_rating , job_test: jobtest_rating });
//		$("#manageTestModal").find(".modal-body").find('.alert-success').hide().removeClass('hidden').fadeIn().fadeOut(12000);
//	});
});
</script>
