{% extends 'theme.swig' %}
{% set title = job.title %}
{% block body %}
<style>
	@media screen and (min-width: 1200px) and (max-width: 2000px) {
		.gq-container {
			width: 1320px;
			margin: auto;
		}

		.feature-row {
			margin-top: 310px;
		}
	}

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

<header>
	<nav class="navbar navbardefault main-nav">
		<div class="gq-container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbarbrand" href="#"><img src="/images/logo.png" id="logo"/></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a href="/">Home <span class="sr-only">Home</span></a></li>
					<li><a href="/courses">Courses</a></li>
					<li><a href="/jobs">Jobs</a></li>
					<li><a href="/login">Login</a></li>
					<li><a href class="btn btn-default">Sign Up</a> </li>
				</ul>
			</div>
		</div>
	</nav>
</header>

	<div class="clearfix container" style="margin-top: 60px">
	<div class="row">
		<div class="col-md-9">
			<div class="job">
				<h3>{{ job.job_title }}</h3>
				<div class="info-thumb">
					<ul class="info-thumb-ls">
						<li><i class="fa fa-institution"></i> {{ job.company.company_name }} </li>
						<li><i class="fa fa-map-marker"></i> {{ job.location }} </li>
						<li><i class="fa fa-asterisk"></i> {{ job.job_level }} Level</li>
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