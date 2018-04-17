{% set title = 'Candidate GQ Profile' %}

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
                                {% if showContactInfo == true  %}
                                    <h4 class="title"><i class="fa fa-user"></i>&nbsp; {{ resume.fullname }} - GQ Profile</h4>
                                {% else %}
                                    <h4 class="title"><i class="fa fa-user"></i>&nbsp; {{ me.fname }} {{ me.lname|first }} - GQ Profile</h4>
                                {% endif %}
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
							<!-- Resume -->
							<div class="tab-pane fade in active" id="resume">
								{% include 'includes/resume.swig' %}
							</div>

							<div class="tab-pane fade in" id="test">

								<div class="col-md-7 col-md-offset-2" id="result-div">
									<div class="result">
										{% if result %}
											<h3 class="test-title hidden">{{ test_title }}</h3><br>
											<table class="table table-striped">
											<thead>
												<tr>
													<th></th>
													<th>Score</th>
													<th>Percentage</th>
												</tr>
											</thead>
											<tbody>
												<tr id="general">
													<td>General Ability</td>
													<td>{{ result.general_ability }}</td>
													<td>{{ result.general_percentage }}%</td>
												</tr>
												<tr id="verbal">
													<td>Verbal Reasoning</td>
													<td>{{ result.verbal }}</td>
													<td>{{ result.verbal_percentage }}%</td>
												</tr>
												<tr id="maths">
													<td>Numerical Reasoning</td>
													<td>{{ result.maths }}</td>
													<td>{{ result.maths_percentage }}%</td>
												</tr>
												<tr id="total">
													<td>Total Score</td>
													<td>{{ result.score }}/60</td>
													<td>{{ result.percentage }}%</td>
												</tr>
											</tbody>
										</table>
										{% else %}
											<br><br>
											<div class="alert alert-info">This candidate hasn't taken the basic assessment.</div>
										{% endif %}
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="video">
								<div class="row" style="margin-top: 40px">
									{% if resume.video_status == true %}
										<div class="col-md-6 col-md-offset-2">
											<h4>Video Profile</h4>
											{#<video style="margin-top: 50px;" width="450" height="300" controls=controls>#}
												{#<source src="/applicant_videos/{{ resume.video_file }}" type="video/mp4"></source>#}
											{#</video>#}
											<iframe width="700" height="540" src="https://youtube.com/embed/{{ resume.youtube_vid_id }}"></iframe>
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

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestFrontend.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$(".applicants").addClass('active');
});
</script>
{% endblock %}
