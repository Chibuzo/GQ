{% extends 'layout.swig' %}
{% set title = 'Company Jobs' %}
{% block page_title %}
	<i class="pe-7s-timer"></i>{{ company.company_name}} Jobs
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/job/addjob/{{ coy_id }}" class="btn btn-success btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add Job</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">All {{ job_status }} Jobs</h4>
					<p class="category"></p>
				</div>
			</div>
			{% set isAdmin = true %}
			{% include 'includes/jobs-view.swig' %}
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
