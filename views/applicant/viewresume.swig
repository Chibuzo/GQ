{% extends '../admin/layout.swig' %}
{% set title = 'Candidates Resume' %}
{% block page_title %}
	<i class="pe-7s-user"></i> &nbsp;Candidate's Resume
{% endblock %}

{% block body %}
<link href="/styles/gq-cbt.css" rel="stylesheet" />
<style>
	.tab-pane {
		overflow: hidden;
		min-height: 500px;
	}

	.school {
		font-size: 17px;
		font-weight: bold;
	}

	.school small {
		color: #3f729b;
	}

	hr { margin-top: 0; border-color: #999; margin-bottom: 30px }

	h4 { margin-bottom: 8px; font-weight: 600; font-family: 'Open Sans', SansSerif }


	@media screen and (min-width: 200px) and (max-width: 600px) {
		#test-notice {
			padding: 10px 5px;
		}

		.question-image img {
			width: 100%;
		}
	}
</style>
<div class="content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="header">
						<div class="row">
							<div class="col-md-9">
								<h4 class="title"><i class="fa fa-user"></i>&nbsp; {{ resume.fullname }} - GQ Profile</h4>
							</div>
							<div class="col-md-3 text-right">
								<a href="/admin/applicants" class="btn btn-info btn-fill"><i class="fa fa-caret-left"></i> Go Back</a>
							</div>
						</div>
					</div><br>

					<div class="content">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#resume" data-toggle="tab"><i class="fa fa-newspaper-o"></i> &nbsp;Resume</a></li>
							<li><a href="#test" data-toggle="tab"><i class="fa fa-edit"></i> &nbsp;Assessment Score</a></li>
							<li><a href="#video" data-toggle="tab"> <i class="fa fa-video-camera"></i> &nbsp;Video</a></li>
						</ul>
						<div class="tab-content">
						  	<div class="tab-pane fade active in" id="resume">
								<div class="row">
									<div class="col-md-12" style="padding: 50px; padding-top: 10px">
										<h3 class="text-center">{{ resume.fullname }}</h3>
										<h4>Contact:</h4><hr>
										<p>{{ resume.address }}<br>{{ resume.city }}, {{ resume.r_state }}</p>
										<p>
											<strong>Tel: </strong>{{ resume.phone }}<br>
											<strong>Email: </strong>{{ resume.email }}
										</p>
										<h4>Introduction</h4><hr>
										<div>{{ resume.introduction }}</div>

										<h4>Eduacation</h4><hr>
										{% for edu in resume.educations %}
											<div class="row">
												<div class="col-md-4">{{ edu.start_date | date('m.Y') }} - {{ edu.end_date | date('m.Y') }}</div>
												<div class="col-md-8"><div class="school">{{ edu.institution }}<br><small>{{ edu.honour }}. {{ edu.programme }}</small></div></div>
											</div>
											<br>
										{% endfor %}

										<h4>Qualifications</h4><hr>
										{% for qual in resume.qualifications %}
											<div class="row">
												<div class="col-md-4">{{ qual.date_obtained | date('M, Y') }}</div>
												<div class="col-md-8">{{ qual.qualification }}</div>
											</div>
											<br>
										{% endfor %}

										<h4>Employment History</h4><hr>
										{% for emp in resume.employments %}
											<div class="row">
												<div class="col-md-4">{{ emp.start_date | date('m.Y') }} - {{ emp.end_date | date('m.Y') }}</div>
												<div class="col-md-8">
													<div class="school">{{ emp.company }}<br><small>{{ emp.role }}</small></div>
													<p>{{ emp.duties | raw | safe }}</p>
												</div>
											</div>
										{% endfor %}

										<h4>Referees</h4><hr>
										{% for ref in resume.referencecontacts %}
											<div class="row">
												<div class="col-md-4">
													<h5>{{ ref.name }}</h5>
													<div>{{ ref.email }}</div>
													<div>{{ ref.phone }}</div>
												</div>
												<div class="col-md-8">
													<div class="school"> {{ ref.company }}</div>
													<div>{{ ref.job_title }}</div>
												</div>
											</div>
											<br>
										{% endfor %}

									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="test">

								<div class="col-md-7 col-md-offset-2" id="result-div">
									<div class="result">
										{% if result %}
											<h3 class="test-title hidden">{{ test_title }}</h3><br>
											<div class="panel panel-default">
												<div class="panel-heading">
													{{ test_title }}
												</div>

												<ul class="list-group">
													<li class="list-group-item">Score: <span id="score">{{ result.score }}/{{ result.no_of_questions }}</span></li>
													<li class="list-group-item">Percentage: <span id="percentage">{{ result.percentage }}%</span></li>
													<li class="list-group-item">Average: <span id="average">{{ result.average }}</span></li>
												</ul>
											</div>
										{% else %}
											<br><br>
											<div class="alert alert-info">This candidate hasn't taken the basic assessment.</div>
										{% endif %}
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="video">
								<div class="row" style="margin-top: 40px">
									{% if resume.video_file.length > 3 %}
										<div class="col-md-5 col-md-offset-3">
											<h4>Video Profile</h4>
											<video style="margin-top: 50px;" width="450" height="300" controls=controls>
												<source src="/applicant_videos/{{ resume.video_file }}" type="video/mp4"></source>
											</video>
										</div>
									{% endif %}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestFrontend.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$(".applicants").addClass('active');
});
</script>
{% endblock %}