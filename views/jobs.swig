{% extends 'theme.swig' %}
{% set title = 'Job Board' %}
{% block body %}
<style>
select.input-lg {
	line-height: 19px;
}

.jobs {
	padding: 10px 50px;
}

.job {
	padding: 15px;
	line-height: 1.3;
}

.job-desc {
	clear: both;
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
<div class="clearfix container" style="margin-top: 100px">
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
					<button class="btn btn-default btn-block btn-lg"><i class="fa fa-search"></i> Search</button>
				</div>
			</form>
		</div>
	</div>
	<div class="row" style="margin-top: 30px">
		<div class="col-md-9 jobs">
			{% for job in jobs %}
				{% set path = job.job_title.split(' ') %}
				<div class="job">
					<h3><a href="/job/{{ job.id }}/{{ path | join('-') }}">{{ job.job_title }}</a></h3>
					<div class="info-thumb">
						<ul class="info-thumb-ls">
							<li><i class="fa fa-institution"></i> {{ job.company.company_name }} UBA</li>
							<li><i class="fa fa-map-marker"></i> {{ job.location }} Lagos</li>
							<li><i class="fa fa-asterisk"></i> {{ job.level }} Entry</li>
						</ul>
					</div>
					<div class="job-desc">{{ job.job_description }}</div>
				</div>
			{% endfor %}
		</div>

		<div class="col-md-3">
			Options
		</div>
	</div>
</div>
{% endblock %}