{% extends 'theme.swig' %}
{% set title = job.title %}

{% block head %}
  {% parent %}
  {% set location = "Job View: " + job.company.company_name  + "--" + job.job_title %}
  {% include "./externalApplications/amplified.swig" %}
{% endblock %}

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

#home {
	height: 34vh;
}

#home .home-wrapper {
	top: 82%
}

.job {
	padding: 0px 40px;
}

.job-desc {
	color: #474747;
}

.job-desc h3 {
	margin-top: 30px;
	margin-bottom: 15px;
}

.info-thumb {
	padding-bottom: 13px;
	font-size: 14px;
	margin-bottom: 35px;
	margin-left: 9px;
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

input[type="text"] {
	height: 46px;
	background: #fff;
	opacity: 1;
}

.job-categories li {
	padding: 4px 8px;
}

.job-categories li a {
	font-size: 14px;
}

@media screen and (min-width: 200px) and (max-width: 600px) {
	#home {
		height: 50vh;
	}

	#home .home-wrapper {
		top: 60%
	}

	.job {
		padding: 20px 10px;
	}
}
</style>

{% block backgroud %}
	<div class="bg-img" style="background-image: url('/images/jobs.jpg');">
		<div class="overlay"></div>
	</div>
{% endblock %}
<div class="home-wrapper">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<form action="" method="get">
					<div class="col-md-5">
						<div class="form-group">
							<input type="text" class="form-control input-lg" placeholder="Use a keyword, company or skill" />
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<input type="text" class="form-control input-lg" placeholder="Sector" />
						</div>
					</div>
					<div class="col-md-2">
						<div class="form-group">
							<select class="form-control input-lg" name="job_level">
								<option value="">Job Level</option>
								<option value="Entry">Entry Level</option>
								<option value="Intermediate">Intermediate</option>
								<option value="Professional">Professional</option>
							</select>
						</div>
					</div>
					<div class="col-md-2">
						<button class="btn btn-info btn-block btn-lg"><i class="fa fa-search"></i> Search</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</header>

<div class="clearfix container" style="margin-top: 60px; margin-bottom: 60px">

	{% if job.source == 'Jobberman' || job.source == 'Ngcareers' %}
		{% set scrapedJob = true %}
	{% endif %}

	<div class="row">
		<div class="col-md-8">
			<div class="job">
				<h2 id="job-title">{{ job.job_title }}</h2>
				<div class="info-thumb">
					<ul class="info-thumb-ls">
						<li><i class="fa fa-institution"></i>{% if scrapedJob === true %} GQ Direct {% else %} {{ job.company.company_name }} {% endif %} </li>
						<li><i class="fa fa-map-marker"></i> {{ job.location }} </li>
						<li><i class="fa fa-asterisk"></i> {{ job.job_level }} Level</li>
						<li><i class="fa fa-calendar"></i> Closes On: {{ job.closing_date | date('d.m.Y') }} </li>
					</ul>
				</div>

				<div class="job-desc">
					<br>
					{#{% if job.job_description %}#}
						<h3>Description</h3>
						{#{% if scrapedJob === true %}#}
							{#{% set job_desc = job.job_description %}#}
							{#{% for desc in job_desc %}#}
								{#<p>{{ desc }}</p>#}
							{#{% endfor %}#}
						{#{% else %}#}
							{{ job.job_description | safe }}
						{#{% endif %}#}
					{#{% endif %}#}

					{% if job.job_requirements %}
						<h3>Requirements</h3>
						{#{% if scrapedJob === true %}#}
							{#{% set job_desc = job.job_requirements %}#}
							{#{% for desc in job_desc %}#}
								{#<p>{{ desc }}</p>#}
							{#{% endfor %}#}
						{#{% else %}#}
							{{ job.job_requirements | safe }}
						{#{% endif %}#}
					{% endif %}

					{% if job.qualifications.length > 3 %}
						<h3>Qualifications</h3>
						{{ job.qualifications | safe }}
					{% endif %}

					{% if job.nice_to_have.length > 3 %}
						<h3>Nice to Have</h3>
						{{ job.nice_to_have | safe }}
					{% endif %}

					{% if job.salary_currency %}
						<h3>Salary Budget <small>[ {{ job.salary_currency }} ]</small></h3>
						{{ job.min_salary_budget }} - {{ job.max_salary_budget }}
					{% endif %}
				</div>
				<br><br>
				<button class="btn btn-info btn-lg apply" id="{{ job.id }}">Apply for this job</button>
			</div>
		</div>

		<div class="col-md-4">
			<h3 style="color: #666; margin-top:20px">&nbsp;Job Categories</h3><hr style="margin-top: -10px">
			<ul class="job-categories">
			{% for cat in job_categories %}
				{% if cat.jobs > 0 %}
					{% set cat_path = cat.category.split(' ') %}
					<li><i class="fa fa-hand-o-right hidden"></i> &nbsp;<a href="/jobcategory/{{ cat.id }}/{{ cat_path.join('-') }}">{{ cat.category }} [ {{ cat.jobs }} ]</a></li>
				{% endif %}
			{% endfor %}
			</ul>
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
		var job_title = $("#job-title").text().split(' ').join('-');
		var path = btoa('job/' + job_id + '/' + job_title); // convert to base64
		$.get('/job/apply/' + job_id, function(d) {
			if (d.status.trim() == 'success') {
				location.replace('/applicant/view-applications');
			} else if (d.status.trim() == 'login') {
				location.replace('/login/' + path);
			} else if (d.status.trim() == 'error') {
				if (d.msg.trim() == 'IncompleteResume') {
					$("#resumeModal").modal();
				}
			}
		}, 'JSON');
	});
})
</script>
