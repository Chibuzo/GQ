{% extends 'theme.swig' %}
{% set title = 'Job Board' %}
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

select.input-lg {
	line-height: 19px;
}

.jobs {
	padding: 10px 50px;
}

.job {
	padding: 15px;
	padding-left: 0px;
	line-height: 1.3;
}

.job img {
	float: left;
	width: 55px;
	margin-right: 18px;
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
	margin-left: 0px;
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

<div class="clearfix container" style="margin-top: 70px">
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
					<img src="/logos/{{ job.company.logo_name }}" />
					<h4 style="margin-top:5px"><a href="/job/{{ job.id }}/{{ path | join('-') }}">{{ job.job_title }}</a></h4>
					<div class="info-thumb">
						<ul class="info-thumb-ls">
							<li><i class="fa fa-institution"></i> {{ job.company.company_name }} UBA</li>
							<li><i class="fa fa-map-marker"></i> {{ job.location }} </li>
							<li><i class="fa fa-asterisk"></i> {{ job.job_level }} Level </li>
						</ul>
					</div>
					{#<div class="job-desc">{{ job.job_description }}</div>#}
				</div>
			{% endfor %}
		</div>

		<div class="col-md-3">
			Options
		</div>
	</div>
</div>
{% endblock %}