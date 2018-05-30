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

#home {
	height: 34vh;
}

#home .home-wrapper {
	top: 82%
}

select.input-lg {
	line-height: 19px;
}

h2 {
	font-size: 34px;
}

h4 {
	font-size: 22px;
}

.jobs {
	padding: 0px 20px;
}

.job {
	clear: both;
	padding: 15px;
	padding-left: 0px;
	line-height: 1.3;
	border-bottom: 1px solid #EEE;
	margin-bottom: 50px;
}

.job img {
	float: left;
	width: 59px;
	height: 53px;
	margin-right: 18px;
	padding: 1px;
	border: 1px solid #e0e0e0;
}

.job-desc {
	clear: both;
	color: #333;
	margin-top: 50px;
	line-height: 24px;
}

.info-thumb {
	padding-bottom: 3px;
	font-size: 13px;
	line-height: 19px;
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

.sidebar {
	background-color: #f9f9f9;
	padding: 20px 6px;
}

.mobile-view {
	display:none;
}

.desktop-view {
	display: block;
}

@media screen and (min-width: 200px) and (max-width: 600px) {
	#home {
		height: 50vh;
	}

	#home .home-wrapper {
		top: 60%
	}
	
	h2 {
		font-size: 26px;
	}
	
	.job {
		margin-bottom: 22px;
	}
	
	.job-desc {
		margin-top: 17px;
		line-height: 21px;
	}
	
	.desktop-view {
		display: none;
	}
	
	
	.mobile-view {
		display: block
	}
	
	.jobs {
		padding: 0 15px;
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

<div class="clearfix container" style="margin-top: 50px">
	<div class="row" style="margin-top: 0px; margin-bottom: 70px">
		<div class="col-md-8 jobs">
			<h2>Active Jobs</h2>
			{% for job in jobs %}
				{% set path = job.job_title.split(' ') %}
				{% if job.company.logo_name.length > 3 %}
					{% set logo_name = job.company.logo_name %}
				{% else %}
					{% set logo_name = 'company.png' %}
				{% endif %}
				<div class="job">
					<img src="/logos/{{ logo_name }}" class="desktop-view" />
					<h4 style="margin-top:3px; margin-bottom: 10px"><a href="/job/{{ job.id }}/{{ path | join('-') }}">{{ job.job_title }}</a></h4>
					<div class="info-thumb">
						<div class="row mobile-view">
							<div class="col-md-3 col-xs-12"><i class="fa fa-briefcase fa-fw"></i> &nbsp;{{ job.company.company_name }}</div>
							<div class="col-md-2 col-xs-12"><i class="fa fa-map-marker fa-fw"></i> &nbsp;{{ job.location }} </div>
							<div class="col-md-2 col-xs-12"><i class="fa fa-asterisk fa-fw"></i> &nbsp;{{ job.job_level }} Level</div>
							<div class="col-md-3 col-xs-12"><i class="fa fa-calendar fa-fw"></i> &nbsp;Closing date: {{ job.closing_date | date('d.m.Y') }}</div>
						</div>
						<ul class="info-thumb-ls desktop-view">
							<li><i class="fa fa-briefcase"></i> &nbsp;{{ job.company.company_name }}</li>
							<li><i class="fa fa-map-marker"></i> &nbsp;{{ job.location }} </li>
							<li><i class="fa fa-asterisk"></i> &nbsp;{{ job.job_level }} Level</li>
							<li><i class="fa fa-calendar"></i> &nbsp;Closing date: {{ job.closing_date | date('d.m.Y') }}</li>
						</ul>

					</div>
					{#<div class="job-desc">{{ job.job_description | raw | truncate }}</div>#}
				</div>
			{% endfor %}
		</div>

		<div class="col-md-4">
			<div class="sidebar">
				<h3>&nbsp;Job Categories</h3>
				<ul class="job-categories">
				{% for cat in job_categories %}
					{% if cat.jobs > 0 %}
						{% set cat_path = cat.category.split(' ') %}
						<li>&nbsp;<a href="/jobcategory/{{ cat.id }}/{{ cat_path.join('-') }}">{{ cat.category }} [ {{ cat.jobs }} ]</a></li>
					{% endif %}
				{% endfor %}
				</ul>
			</div>	
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
	$(".navbar-right li:contains('Jobs')").addClass('active');
});
</script>
{% endblock %}