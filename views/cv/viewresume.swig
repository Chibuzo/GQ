{% set title = 'Candidate GQ Profile' %}

<link href="/styles/gq-cbt.css" rel="stylesheet" />
{{ cv.css | safe }}
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

	.profile-image {
		width: 100%;
	}

	.div-cv {
		padding: 2px 20px;
	}

	h4 {
		font-size: 28px;
		font-weight: 400;
	}

	hr {
		margin-top: -8px;
		border-top: 1px solid #ccc;
	}

	#cv-view .row {
		padding: 1px 7px;
	}

	#page-container {
		position: relative !important;
	}


	@media screen and (min-width: 200px) and (max-width: 600px) {
		#test-notice {
			padding: 10px 5px;
		}

		.question-image img {
			width: 100%;
		}

		.div-cv {
			padding: 2px 17px;
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
							<li><a href="#photo" data-toggle="tab"> <i class="fa fa-picture-o"></i>Photo</a></li>
							<li><a href="#test" data-toggle="tab"><i class="fa fa-edit"></i> &nbsp;Assessment Score</a></li>
							<li><a href="#video" data-toggle="tab"> <i class="fa fa-video-camera"></i> &nbsp;Video</a></li>
						</ul>
						<div class="tab-content">
							<!-- Resume -->
							<div class="tab-pane fade in active" id="resume">
								{% if cv && resume.scrapped === true %}
									<div class="row">
										<div class="col-md-12 div-cv">
											{% include 'includes/scrapped-cv.swig' %}
										</div>
									</div>
								{% else %}	
									{% include 'includes/resume.swig' %}
								{% endif %}
							</div>

							<div class="tab-pane fade in" id="photo">
								<div class='row'>
									{% if resume.photo_status == true %}
										<div class='col-sm-10 col-sm-offset-1 col-md-offset-4 col-md-4'>
											{% if resume.photo_status == true %}
												{% if resume.photo.indexOf('http') === -1 %}
													{% set photo_url = '/applicant_profilephoto/' + resume.photo %}
												{% else %}	
													{% set photo_url = resume.photo %}
												{% endif %}	
											{% else %}
												<img class="avatar border-gray" src="/images/face-0.jpg" alt="..."/>
											{% endif %}
											<img class="profile-image" src="{{ photo_url }}" alt="..."/>
										</div>
									{% else %}
										<div class='col-xs-12'>
											<p>User does not have a photo</p>
										</div>
									{% endif %}
								</div>
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
													<td>{{ result.general_ability_name }}</td>
													<td>{{ result.general_ability }}</td>
													<td>{{ result.general_percentage }}%</td>
												</tr>
												<tr id="verbal">
													<td>{{ result.verbal_name }}</td>
													<td>{{ result.verbal }}</td>
													<td>{{ result.verbal_percentage }}%</td>
												</tr>
												<tr id="maths">
													<td>{{ result.maths_name }}</td>
													<td>{{ result.maths }}</td>
													<td>{{ result.maths_percentage }}%</td>
												</tr>
												<tr id="total">
													<td>Total Score</td>
													<td>{{ result.score }}/{{ result.total_num_questions }}</td>
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
											<div class="video-div">
												<video style="margin-top: 50px;" width="640" height="480" preload="metadata" controls>
													{% if resume.youtube_vid_id.length > 5 %}
														<source src="https://api.neon.ventures/gqyt/files/{{ resume.youtube_vid_id }}.mp4" type="video/mp4">
													{% else %}
														<source src="{{ resume.video_file }}" type="video/webm">
														<source src="{{ resume.video_file }}" type="video/mp4">
													{% endif %}	
													Your browser does not support the video tag.
												</video>
											</div>
											<!--<iframe width="800" height="740" src="https://youtube.com/embed/{{ resume.youtube_vid_id }}"></iframe>-->
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
<!--<script type="text/javascript" src="/js/gqTestFrontend.js"></script>-->
<script type="text/javascript">
$(document).ready(function() {
	$(".applicants").addClass('active');
});
</script>
{% endblock %}
