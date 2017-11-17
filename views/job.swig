{% extends 'theme.swig' %}
{% set title = job.title %}
{% block body %}
<style>
.info-thumb {
	padding-bottom: 13px;
	font-size: 14px;
	margin-bottom: 15px;
}

.info-thumb-ls {
	list-style-type: none;
	padding-left: 0;
	margin-left: -7px;
}

.info-thumb-ls .fa {
	margin-right: 4px;
}

.info-thumb-ls li {
	float: left;
	margin-right: 15px;
}
</style>

<div class="clearfix container" style="margin-top: 100px">
	<div class="row">
		<div class="col-md-9">
			<div class="job">
				<h3>{{ job.job_title }}</h3>
				<div class="info-thumb">
					<ul class="info-thumb-ls">
						<li><i class="fa fa-institution"></i> {{ job.company.company_name }} UBA</li>
						<li><i class="fa fa-map-marker"></i> {{ job.location }} Lagos</li>
						<li><i class="fa fa-asterisk"></i> {{ job.level }} Entry</li>
					</ul>
				</div>
				<div class="job-desc">{{ job.job_description }}</div>
			</div>
			<button class="btn btn-danger btn-lg apply" id="{{ job.id }}">Apply for this job</button>
		</div>

		<div class="col-md-3">

		</div>
	</div>
</div>

	<div class="modal fade in" id="resumeModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						×
					</button>
					<h4 class="modal-title" id="myModalLabel">Complete Your Resume</h4>
				</div>

				<div class="modal-body">
					<div class="alert alert-info">Your resume is incomplete.<br>You must complete your resume before you can apply for this job.</div>
				</div>
				<span id="course_id" class="hidden"></span>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times"></i> Close
					</button>
					<a href="/applicant/resume-page" class="btn btn-info">
						Continue
					</a>
				</div>
			</div>
		</div>
	</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$(".apply").click(function() {
		var job_id = $(this).attr('id');
		$.get('/job/apply/' + job_id, function(d) {
			if (d.status.trim() == 'success') {
				location.replace('/applicant/view-applications');
			} else if (d.status.trim() == 'login') {
				location.replace('/login/jobs');
			} else if (d.status.trim() == 'error') {
				if (d.msg.trim() == 'IncompleteResume') {
					$("#resumeModal").modal();
				}
			}
		}, 'JSON');
	});
})
</script>