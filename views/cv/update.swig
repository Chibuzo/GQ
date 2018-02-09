{% extends '../applicant/layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
	<i class="pe-7s-user"></i> &nbsp;My Resume
{% endblock %}

{% block body %}
<link href="/styles/gq-cbt.css" rel="stylesheet" />
<link href="/styles/jquery.countdownTimer.css" rel="stylesheet" />
<style>
	.plus-btn {
		position: relative;
		top: 35px;
		margin-left: 10px;
	}

	.addable {
		display: none;
	}

	fieldset {
		margin-top: 23px;
	}

	.tab-pane {
		overflow: hidden;
		min-height: 500px;
	}

	#test-notice {
		padding: 10px 120px;
	}

	.cell {
		opacity: 0;
		position: absolute !important;
		right: -1500px;
	}

	/* CBT Styles */

	.empty-vid {
		border: #ccc solid thin;
		text-align: center;
		min-height: 300px;
		border-radius: 6px;
		background-color: #f0f0f0;
		margin-top: 54px;
	}

	.empty-vid .pe-7s-video {
		font-size: 80px;
		vertical-align: middle;
		margin-top:80px;
	}

	.question-title {
		cursor: pointer;
		font: 100 17px 'Open Sans Light', san-serif, Tahoma;
		padding: 3px 10px 10px;
		border-bottom: #ccc solid thin;
	}

	.quest-instruction {
		display: none;
		padding-left: 20px;
	}

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
								<h4 class="title"><i class="fa fa-edit"></i>&nbsp; Complete Your GQ Profile</h4>
							</div>
							<div class="col-md-3 text-right">
								{% set status = 0 %}
								{% if resume.status == 'Complete' %}
									{% set status = status + 1 %}
								{% endif %}
								{% if result %}
									{% set status = status + 1 %}
									{% set test_status = 1 %}
								{% endif %}
								{% if resume.video_file.length > 0 %}
									{% set status = status + 1 %}
									{% set video_status = 1 %}
								{% endif %}
								<strong>{{ status }}/3</strong> - Resume completion
							</div>
						</div>
					</div><br>

					<div class="cell">
						<div class="proctor-container" style="position: relative; width: 640px; height: 360px">
							<video id="proctor-video" width="640" height="360" preload autoplay loop muted style="position: absolute; top: 0; left: 0"></video>
							<canvas id="proctor-canvas" width="640" height="360" style="position: absolute; top: 0; left: 0"></canvas>
						</div>
					</div>

					<div class="cell">
						<div id="vol-meter"></div>

						<div class="stats">

						</div>
					</div>

					<div class="content">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#resume" data-toggle="tab"> &nbsp;Resume</a></li>
							<li><a href="#test" data-toggle="tab"><i class="fa fa-edit"></i> &nbsp;Basic Assessment</a></li>
							<li><a href="#video" data-toggle="tab"> <i class="fa fa-video-camera"></i> &nbsp;My Video</a></li>
						</ul>
						<div class="tab-content">
						  	<div class="tab-pane fade active in" id="resume">
								<div class="row">
									<div class="col-md-12" style="padding: 50px">
									<small>Fields marked in asterisk are compulsory</small>
										{% include 'includes/resume-form.swig' %}
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="test">
								{% if !result %}
									{% set test_visibility = '' %}
									{% set result_visibility = 'hidden' %}
								{% else %}
									{% set test_visibility = 'hidden' %}
								{% endif %}

								<div class="{{ result_visibility }} col-md-7 col-md-offset-2" id="result-div">
									<div class="result">
										<h3 class="test-title"></h3><br>
										<div class="panel panel-default">
											<div class="panel-heading">
												{{ test_title }}
											</div>

											<ul class="list-group">
												<li class="list-group-item">Score: <span id="score">{{ result.score }}/{{ result.no_of_questions }}</span></li>
												<li class="list-group-item">Percentage: <span id="percentage">{{ result.percentage }}%</span></li>
												<li class="list-group-item">Average: <span id="average">{{ result.average }}</span></li>
											</ul>
											<div class="panel-body">
												{#<strong>Note: </strong>You can always pay and retake the test to improve your score...#}
											</div>
										</div>

										<div class="text-center">
											<div class="col-md-12"><br>
												<button class="btn btn-info" id="retake-test">Retake Test</button>
											</div>
										</div>
									</div>
								</div>

								<div class="{{ test_visibility }}" id="test-div">
									<div class="text-center"><br>

										<div id="test-notice">
											<h3>Test Instruction</h3>
											<p> The following test is in one part and will take 25 minutes. It is simply a test of your aptitude and it is standardized.
											Please read each question carefully and choose your best answer.</p>
											<p class="text-left"><br>
												<ol class="text-left">
													<li>This test is accompanied by anti-cheating technology and it requires you take this test in a well-lit and quiet room with no assistance. Taking test otherwise might reflect in your result and your standing</li>
													<li>It is advised you take this test with a computer.</li>
													<li>You will not be penalized for guessing.</li>
													<li>The test auto-submits when your test time is up.</li>
												</ol>
											</p><br>
											<p>Proceed to take the test. Good luck!</p>
											<br>
											<button class="btn btn-primary btn-lg load-test" data-test_id="1">Take test</button>
										</div>
									</div>

									<div class="test">
										<h3 class="test-title text-center"></h3>
										<div id="instructions">
											<div class="instruction"></div>
											<div class="text-center">
												<button class="btn btn-lg btn-primary hidden" id="start-test" data-test_id="1"><i class="fa fa-clock-o"></i> Start Test</button>
											</div>
										</div>

										<div class="test" style="display: none;">
											<div id="countdowntimer" class="text-right"><span id="hms_timer"><span>00:00</div>
											<div class="question-count text-right" style="display: none;"><span id="current_quest"></span> / <span id="total_questions"></span></div>
											<div class="row">
												<div class="col-md-3 col-sm-12 col-xs-12 pull-right">
													<div class="question-nums">

													</div>
												</div>

												<div class="col-md-9 col-sm-12 col-xs-12">
													<div class="question"></div>
													<div class="question-image"></div>
													<div class="options">
														<ul class="opts">
															<li><label class="radio"><span id="span-opt-a"></span> <input name="opt" id="opt_a" type="radio" class="form-control" data-toggle="radio" value="A" /></label></li>
															<li><label class="radio"><span id="span-opt-b"></span> <input name="opt" id="opt_b" type="radio" class="form-control" data-toggle="radio" value="B" /></label></li>
															<li><label class="radio"><span id="span-opt-c"></span> <input name="opt" id="opt_c" type="radio" class="form-control" data-toggle="radio" value="C" /></label></li>
															<li><label class="radio"><span id="span-opt-d"></span> <input name="opt" id="opt_d" type="radio" class="form-control" data-toggle="radio" value="D" /></label></li>
															<li><label class="radio"><span id="span-opt-e"></span> <input name="opt" id="opt_e" type="radio" class="form-control" data-toggle="radio" value="E" /></label></li>
														</ul>
													</div>
												</div>
											</div>

											<div class="nav-btns">
												<button class="btn btn-info btn-fill hidden">Pev <i class="fa fa-caret-left"></i> </button>
												<button class="btn btn-primary btn-fill" id="submit-test">Submit Test</button>
												<button class="btn btn-info btn-fill pull-right" id="next-question">Next <i class="fa fa-caret-right"></i> </button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="video">
								<div class="row" style="margin-top: 40px">
									<div class="col-md-6">
										<h3>Instructions</h3>
										<div class="">
											<h5 class="question-title" id="about"><i class="fa fa-caret-right"></i> Introduce yourself</h5>
											<div class="quest-instruction" id="about-text">Don’t answer this question by rambling on about your hobbies and your pets. Use this as another opportunity to direct the recruiter or hiring manager’s attention to your skills and accomplishment to really impress them. Talk about what interests you about the industry and what you hope to bring to their organization</div>
											<h5 class="question-title" id="work"><i class="fa fa-caret-right"></i> Describe your work ethic</h5>
											<div class="quest-instruction" id="work-text">Again, this question is asked to find out how well you can fit into a company’s culture. Describe how important it is to you to complete all of the tasks assigned to you effectively and efficiently.</div>
											<h5 class="question-title" id="strength"><i class="fa fa-caret-right"></i> What are your key strengths?</h5>
											<div class="quest-instruction" id="strength-text">Your response should relate to the job description and your ability to perform the tasks assigned to you. For example, if you are being interviewed for a position where you will be leading a large group of people discuss your strong communication skills and ability to work with a variety of people and personalities.</div>
											<h5 class="question-title" id="environment"><i class="fa fa-caret-right"></i> What is your ideal work environment?</h5>
											<div class="quest-instruction" id="environment-text">This question is asked so a recruiter or hiring manager can determine if you’d be a good fit for a company’s culture. Be honest in your response. If you would work well in a large, bustling office, say so. If you prefer working in a small office so you can easily collaborate with colleagues, explain why this is important to you.</div>
											<h5 class="question-title" id="future"><i class="fa fa-caret-right"></i> Where do you see yourself in 5 years?</h5>
											<div class="quest-instruction" id="future-text">There is no perfect answer to this question because responses will vary depending on the industry and the individual. A recruiter or hiring manager simply wants to find out how well you plan ahead and if your goals match those of the company. It’s important, though, to avoid saying anything that makes you seem abrasive, short-term minded, or lacking in goals.</div>
										</div>
									</div>
									{% if resume.video_file.length > 3 %}
										<div class="col-md-5">
											<video style="margin-top: 50px;" width="450" height="300" controls=controls>
												<source src="/applicant_videos/{{ resume.video_file }}" type="video/mp4"></source>
											</video>
											<div class="row text-center"><br><a href="" id="change-video">Change Video</a></div>
										</div>
									{% else %}
										<div class="col-md-5">
											<div class="empty-vid">
												<i class="pe-7s-video"></i>
												<p><button class="btn btn-danger" id="add-video"><i class="fa fa-video-camera"></i> Upload Your Video</button></p>
												{#<p><strong>Note: </strong></p>#}
												<br>
												<ul class="text-left">
													<li>Video file type MUST be in .mp4 format</li>
													<li>The video file size must not be more than 100MB</li>
													<li>Then length of the video must not be more than 15 minutes</li>
													<li>It is recommended you use a WIFI network to upload your profile video or compress video size before upload.</li>
												</ul>
											</div>
										</div>
									{% endif %}
									</div>
								</div>

								<form action="/applicant/add-video" method="post" id="form-video-upload" enctype="multipart/form-data">
									<input type="hidden" name="video_title" value="{{ me.fname }}-{{ me.lname }}" />
									<input type="hidden" name="video_file" value="{{ resume.video_file }}">
									<input type="hidden" name="resume_id" value="{{ resume.id }}">
									<input type="file" name="video_file" style="display: none" id="file-control" />
								</form>
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
<script type="text/javascript" src="/js/plugins/jquery.countdownTimer.min.js"></script>
	<!-- Defaults: resumable not necessary depending on how uploading goes -->

	{#<!-- Facial tracking -->#}
	{#<script src="/js/proctor/tracking-min.js"></script>#}
	{#<script src="/js/proctor/face-min.js"></script>#}
	{#<script src="/js/proctor/eye-min.js"></script>#}
	{#<script src="/js/proctor/mouth-min.js"></script>#}

	{#<!-- Audio Volume metering -->#}
	{#<script src="/js/proctor/volume-meter.js"></script>#}

	{#<!-- Audio tracking -->#}
	{#<script src="/js/proctor/recorder.min.js"></script>#}
	{#<!-- Main Setup -->#}
	{#<script src="/js/proctor/setup.js"></script>#}
<script type="text/javascript">
$(document).ready(function() {
	$(".resume").addClass('active');

	//$.getScript('/js/proctor/tracking-min.js');


	$("select[name=country]").find('option').filter(function(i) {
		return 'Nigeria' == $(this).val();
	}).attr("selected", "selected");


	//fetch universities
	var schools = [], options = [];
	$.get('/get-schools', function(d) {
		if (d.status == 'success') {
			d.schools.forEach(function(schl) {
				schools.push(schl.school_name);
			});

			options = {
				data: schools,
				list: {
					match: { enabled: true }
				}
			};
			$(".school").easyAutocomplete(options);
		}
	});


	// add one row to institution
	$("#institutions").on("click", ".add-institution", function(e) {
		e.preventDefault();
		$("#another-inst").clone().insertBefore("#another-inst").slideDown().removeAttr("id");
		$(this).removeClass("add-institution").html("<i class='fa fa-minus'></i>").addClass("remove-institution-btn");
		$('.datep').datepicker({
			format: 'yyyy-mm-dd',
			autoHide: true
		});

		$(".school").easyAutocomplete(options);
	});


	// remove one row from institutiob
	$("#institutions").on("click", ".remove-institution-btn", function(e) {
		e.preventDefault();
		$(this).parents(".inst-row").slideUp(function() {
			$(this).remove();
		});
	});

	// add one row to qualifications
	$("#qualifications").on("click", ".add-qualification", function(e) {
		e.preventDefault();
		$("#another-qualification").clone().insertBefore("#another-qualification").slideDown().removeAttr("id");
		$(this).removeClass("add-qualification").html("<i class='fa fa-minus'></i>").addClass("remove-qualification-btn");
		$('.datep').datepicker({
			format: 'yyyy-mm-dd',
			autoHide: true
		});
	});


	// remove one row from qualifications
	$("#qualifications").on("click", ".remove-qualification-btn", function(e) {
		e.preventDefault();
		$(this).parents(".qual-row").slideUp(function() {
			$(this).remove();
		});
	});

	// add one row to emplyment
	$("#employments").on("click", ".add-employment", function(e) {
		e.preventDefault();
		$("#another-employment").clone().insertBefore("#another-employment").slideDown().removeAttr("id");
		$(this).removeClass("add-employment").html("<i class='fa fa-minus'></i>").addClass("remove-employment-btn");
		$('.datep').datepicker({
			format: 'yyyy-mm-dd',
			autoHide: true
		});
	});


	// remove one row from employment
	$("#employments").on("click", ".remove-employment-btn", function(e) {
		e.preventDefault();
		$(this).parents(".employment-row").slideUp(function() {
			$(this).remove();
		});
	});


	// add one row to reference contact
	$("#referenceContacts").on("click", ".add-reference", function(e) {
		e.preventDefault();
		$("#another-reference").clone().insertBefore("#another-reference").slideDown().removeAttr("id");
		$(this).removeClass("add-reference").html("<i class='fa fa-minus'></i>").addClass("remove-reference-btn");
	});


	// remove one row from reference contact
	$("#referenceContacts").on("click", ".remove-reference-btn", function(e) {
		e.preventDefault();
		$(this).parents(".reference-row").slideUp(function() {
			$(this).remove();
		});
	});


	$("#form-resume").submit(function(e) {
		e.preventDefault();

		$("#btn-submit").html("<i class='fa fa-cog fa-spin'></i> Updating...").prop('disabled', true);
		$.post('/resume/update', $(this).serialize(), function(d) {
			if (d.status.trim() == 'success') {
				var msg = "Your corporate profile has been successfully updated!";
				showNotification('top', 'right', 'success', msg, 'pe-7s-bell');
			} else {
				showNotification('bottom', 'center', 'danger', d.msg, 'pe-7s-bell');
			}
			$("#btn-submit").html("Update Profile").prop('disabled', false);
		}, 'JSON');
	});


	// video handlers
	$("#add-video, #change-video").click(function(e) {
		e.preventDefault();
		$("#file-control").click();
	});

	$("#file-control").change(function() {
		$("#form-video-upload").submit();
		$("#add-video").html("<i class='fa fa-cog fa-spin'></i> Uploading").prop("disabled", true);
	});


	$(".question-title").click(function() {
		$('.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
		$(this).find('.fa').removeClass('fa-caret-right').addClass('fa-caret-down');
		var id = $(this).attr('id');
		$(".quest-instruction").slideUp();
		$('#' + id + "-text").slideDown();
	});
});
</script>
{% endblock %}