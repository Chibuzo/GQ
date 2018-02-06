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
	width: 57px;
	height: 51px;
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

input[type="text"] {
	height: 46px;
	background: #fff;
	opacity: 1;
}

.job-categories li {
	padding: 4px 8px;
}

@media screen and (min-width: 200px) and (max-width: 600px) {
	#home {
		height: 50vh;
	}

	#home .home-wrapper {
		top: 60%
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
	<div class="row" style="margin-top: 30px; margin-bottom: 70px">
		<div class="col-md-9 jobs">
			{% for job in jobs %}
				{% set path = job.job_title.split(' ') %}
				{% if job.company.logo_name.length > 3 %}
					{% set logo_name = job.company.logo_name %}
				{% else %}
					{% set logo_name = 'company.png' %}
				{% endif %}
				<div class="job">
					<img src="/logos/{{ logo_name }}" />
					<h4 style="margin-top:3px; margin-bottom: 10px"><a href="/job/{{ job.id }}/{{ path | join('-') }}">{{ job.job_title }}</a></h4>
					<div class="info-thumb">
						<ul class="info-thumb-ls">
							<li><i class="fa fa-briefcase"></i> {{ job.company.company_name }} UBA</li>
							<li><i class="fa fa-map-marker"></i> {{ job.location }} </li>
							<li><i class="fa fa-asterisk"></i> {{ job.job_level }} Level </li>
						</ul>
					</div>
					{#<div class="job-desc">{{ job.job_description }}</div>#}
				</div>
			{% endfor %}
		</div>

		<div class="col-md-3">
			<h3 style="color: #666;">&nbsp;Job Categories</h3><hr style="margin-top: -10px">
			<ul class="job-categories">
			{% for job in jobs %}
				{% set cat_path = job.category.split(' ') %}
				<li><i class="fa fa-hand-o-right"></i> &nbsp;<a href="/jobcategory/{{ cat.id }}/{{ cat_path.join('-') }}">{{ job.category }} [ {{ cat.jobs.length }} ]</a></li>
			{% endfor %}
			</ul>
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