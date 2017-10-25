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
			<a href="/job/apply/{{ job.id }}" class="btn btn-danger btn-lg">Apply for this job</a>
		</div>

		<div class="col-md-3">

		</div>
	</div>
</div>
{% endblock %}