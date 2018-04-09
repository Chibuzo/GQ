{% extends '../applicant/layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
	<i class="pe-7s-user"></i> &nbsp;My Resume
{% endblock %}

{% block head %}
  {% parent %}
  {% set location = "My Resume" %}
  {% include "../externalApplications/amplified.swig" %}
{% endblock %}

{% block body %}
<link href="/styles/gq-cbt.css?v=1" rel="stylesheet" />
<style>
	#sample-vid-btn {
		font-size: 1.2em;
		margin-left: 10px;
	}

	.plus-btn {
		position: relative;
		top: 35px;
		margin-left: 10px;
	}

	.progress-bar {
		-webkit-transition: all .25s ease;
		transition: all .25s ease;
	}

	.test-panel-text {
		font-size: 16px;
	}

	#countdowntimer {
		display: inline-block;
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
		position: fixed !important;
		left:-60px;
		top:122px;
		z-index: 20000;
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

	.datep {
		cursor: default;
	}

	#notification-alert {
		min-height: 40px;
	}

    .photo-instructions-title {
        margin-bottom: 15px;
    }

    .photo-instructions-item {
        margin-bottom: 5px;
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
	<div class="cell hidden">
		<div class="proctor-container" style="position: relative; width: 320px; height: 240px">
			<video id="proctor-video" width="320" height="240" preload autoplay loop muted style="position: absolute; top: 0; left: 0"></video>
			<canvas id="proctor-canvas" width="320" height="240" style="position: absolute; top: 0; left: 0"></canvas>
		</div>
	</div>

	<div class="cell">
		<div id="vol-meter"></div>

		<div class="stats">

		</div>
	</div>
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
								{#{% if resume.status == 'Complete' %}#}
									{#{% set status = status + 1 %}#}
								{#{% endif %}#}
								{% if resume.test_status === true %}
									{% set status = status + 1 %}
									{% set test_status = 1 %}
								{% endif %}
								{% if resume.profile_status && completeResumeEducation %}
									{% set status = status + 1 %}
									{% set profile_status = 1 %}
								{% endif %}
								{% if resume.video_status === true %}
									{% set status = status + 1 %}
									{% set video_status = 1 %}
								{% endif %}
								{% if resume.photo_status === true %}
									{% set status = status + 1 %}
									{% set photo_status = 1 %}
								{% endif %}
								<strong>{{ status }}/4</strong> - Resume completion
							</div>
						</div>
					</div><br>

					<div class="content">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#resume-tab" data-toggle="tab"><i class="fa fa-user"></i> &nbsp;Resume</a></li>
							<li><a href="#photo" data-toggle="tab"> <i class="fa fa-picture-o"></i> &nbsp;My Photo</a></li>
							<li><a href="#test" data-toggle="tab"><i class="fa fa-edit"></i> &nbsp;Basic Assessment</a></li>
							<li><a href="#video" data-toggle="tab"> <i class="fa fa-video-camera"></i> &nbsp;My Video</a></li>
						</ul>
						<div class="tab-content">
						  	<div class="tab-pane fade active in" id="resume-tab">
								<div class="row">
									<div class="col-md-12" style="padding: 50px">
										{% include 'includes/resume.swig' %}
										{% include 'includes/resume-form.swig' %}
										<span id="candidate_fullname" class="hidden">{{ resume.fullname }}</span>
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="photo" style="padding-top: 30px">
								{% include '../applicant/includes/profile-photo.swig' %}
							</div>

							<div class="tab-pane fade in" id="test">
								{% if !result %}
									{% set test_visibility = '' %}
									{% set result_visibility = 'hidden' %}
								{% else %}
									{% set test_visibility = 'hidden' %}
								{% endif %}

								{% if resume.photo_status === true && resume.profile_status === true && completeResumeEducation === true %}
									<div class="{{ result_visibility }} col-md-7 col-md-offset-2" id="result-div">
										<div class="result">
											<h3 class="test-title">{{ test_title }} Result</h3><br>
											<table class="table table-striped">
												<thead>
													<tr>
														<th></th>
														<th>Score</th>
														<th>Percentage</th>
														<th>Rank</th>
													</tr>
												</thead>
												<tbody>
													<tr id="general">
														<td>General Ability</td>
														<td>{{ result.general_ability }}</td>
														<td>{{ result.general_percentage }}%</td>
														<td>-</td>
													</tr>
													<tr id="verbal">
														<td>Verbal Reasoning</td>
														<td>{{ result.verbal }}</td>
														<td>{{ result.verbal_percentage }}%</td>
														<td>-</td>
													</tr>
													<tr id="maths">
														<td>Numerical Reasoning</td>
														<td>{{ result.maths }}</td>
														<td>{{ result.maths_percentage }}%</td>
														<td></td>
													</tr>
													<tr id="total">
														<td>Total Score</td>
														<td>{{ result.score }}/60</td>
														<td>{{ result.percentage }}%</td>
														<td>{{ result.rank }}</td>
													</tr>
												</tbody>
											</table>

											<div class="text-center ">
												<div class="col-md-12"><br>
													<button class="btn btn-info hidden" id="retake-test">Retake Test</button>
												</div>
											</div>
										</div>
									</div>

									<div class="{{ test_visibility }}" id="test-div">
										<div class="text-center"><br>

											<div id="test-notice">
												<h3>Test Instruction</h3>
												<p><i>[60] Minutes - [60] Questions</i></p>
												<p>The GetQualified Assessment is administered online and the purpose is to test your basic problem solving and verbal reasoning abilities. In combination with other important elements of your job applications this assessment helps us, and potential employers, determine your suitability for an advertised role. Please note, this test is free of charge.</p>
												<p><strong>Please read the following instructions very carefully as they describe critical elements of the GQ Assessment.</strong></p>
												<p class="text-left"><br>
													<ol class="text-left">
														<li>All tests must be taken on a laptop or desktop computer equipped with a webcam. Please do not attempt to take the test on a mobile device (phone or tablet).</li>
														<li>Questions are presented as multiple-choice. Please read each question carefully and choose the correct answer.</li>
														<li>You may go back to change your answers to previous questions provided that you are within the time limit indicated for the test</li>
														<li>The test is equipped with Get Qualified’s digital invigilation software, which monitors the candidate as (s)he takes the test to ensure the test is taken under strict exam conditions.</li>
														<li>Please note that you are to take this test on your own, WITH NO OUTSIDE ASSISTANCE.</li>
														<li>Ensure you are in a well lit, QUIET room and ALONE. The presence of others and certain background noises may adversely affect your result.</li>
														<li>Any irregularities observed while taking the test could lead to your test score being rejected, hence preventing you from being able to apply for jobs through our platform.</li>
														<li>Your test is timed and will automatically be submitted upon expiration of the time limit. Upon completion, your score will immediately appear on the screen and saved in your Get Qualified profile </li>
													</ol>
												</p><br>
												<p>Proceed to take the test and Good luck!</p>
												<br>
												<button class="btn btn-primary btn-lg load-test" data-test_id="1">Take test</button>
											</div>
										</div>

										<!-- TEST CONTAINER -->
										<div class="row test">
											<div class="col-md-12 overlay-container">
												<div class="alert alert-warning text-center invisible" id="notification-alert">You are currently disconnected from the internet. You need to be connected on the internet to continue this test</div>
												<div class="test-overlay"></div>

												<div class="row">
													<h3 class="test-title text-center"></h3>
												</div>

												<div class="row">
													<div id="instructions" class="col-md-10 col-md-offset-1">
														<div class="instruction"></div>
														<div class="text-center">
															<button class="btn btn-lg btn-primary hidden" id="start-test"><i class="fa fa-clock-o"></i> Start Test</button>
														</div>
													</div>
												</div>

												<div class="row inner-test-div" style="display: none;">
													<div class="col-md-7">
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

													<div class="col-md-5">
														<!-- Timer -->
														<div class="row test-panel-text text-center">
															<span><strong>Time Remaining: </strong></span>
															<div id="countdowntimer"></div>
														</div>
														<hr>
														<!-- Invigilation Score -->
														<div class="row">
															<div class="col-sm-8 col-sm-offset-2 col-xs-12">
																<div class="invigilation-report test-panel-text">
																	<div><strong>Invigilation Score:</strong></div>
																</div>

																<div class="progress" rel="tooltip" title="This score is a measure of the integrity of your test. Keep it high by taking test alone in a very quiet room." style="margin-bottom: 0px;">
																  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%; ">
																	{#<span class="sr-only">100% Complete (danger)</span>Integrity Score#}
																  </div>
																</div>
															</div>
														</div>

														<hr>

														<div class="row">
															<div class="col-md-12">
																<div class="row" style="text-align: center;font-weight: bold;">
																	Question Key:
																</div>

																<div class="row">
																	<div class="col-xs-3">
																		<p class="key-text">
																			Answered:
																		</p>
																		<div class="question-num-base question-key" style="background-color: #99cc66;"></div>
																	</div>

																	<div class="col-xs-3">
																		<p class="key-text">
																			Skipped:
																		</p>
																		<div class="question-num-base question-key" style="background-color: #c9302c;"></div>
																	</div>

																	<div class="col-xs-3">
																		<p class="key-text">
																			Current:
																		</p>
																		<div class="question-num-base question-key" style="background-color: #A37F2D"></div>
																	</div>

																	<div class="col-xs-3">
																		<p class="key-text">
																			Unanswered:
																		</p>
																		<div class="question-num-base question-key"></div>
																	</div>

																</div>
															</div>
														</div>

														<hr>

														<div class="row">
															<!-- THIS IS HIDDEN -->
															<div class="question-count text-right" style="display: none;"><span id="current_quest"></span> / <span id="total_questions"></span></div>
															<div class="col-md-12">
																<div class="question-nums row">
																</div>
															</div>
														</div>
													</div>
												</div>

												<div class="row nav-row inner-test-div" style="display: none;">

													<div class="col-md-7">
														<div class="nav-btns">
															<button class="btn btn-info btn-fill" id="prev-question"><i class="fa fa-caret-left"></i>Prev</button>
															<button class="btn btn-info btn-fill" id="next-question">Next <i class="fa fa-caret-right"></i></button>
														</div>
													</div>

													<div class="col-md-5">
														<div class="nav-btns" style="text-align: center">
															<button class="btn btn-primary btn-fill" id="submit-test">Submit Section </button>
														</div>
													</div>

												</div>

											</div>
											<div class="test-blocked-screen hidden" style="margin-top: 15px">
												<div class="alert alert-danger">
													<div class="text-center">
														<br><i class="fa fa-ban fa-4x"></i>
														<br><br><h4>Hi {{ resume.fullname }},<br><br>Your microphone and webcam MUST grant access to this page before you can proceed with the test.</h4>
														<p>You will need to refresh this page after granting access to use your webcam and microphone.</p>
													</div>
												</div>
												<span id="integrity-score" class="hidden"></span>
											</div>
										</div>
										<!-- test row end -->
									</div>
								{% else %}
                                    {% if resume.profile_status !== true %}
                                        <div><div class="alert alert-warning">Your GQ profile not complete. Please ensure your name, email address, name of institutions you have attended, and your field of study is filled in before you take the assessment test.</div></div>
                                    {% endif %}

                                    {% if resume.photo_status !== true %}
                                        <div><div class="alert alert-warning">Your GQ profile not complete. Please upload a profile picture.</div></div>
                                    {% endif %}

                                    {% if completeResumeEducation !== true %}
                                        <div><div class="alert alert-warning">Your GQ profile not complete. Please provide us with the name of institutions you have attended, and your field of study.</div></div>
                                    {% endif %}
								{% endif %}
							</div>

							<div class="tab-pane fade in" id="video">
								<div class="row" style="margin-top: 40px">
									<div class="col-md-6">
										<h3>Instructions</h3>
										<div class="">
											<h5 class="question-title" id="about"><i class="fa fa-caret-right"></i>Briefly introduce yourself to prospective employers</h5>
											<div class="quest-instruction" id="about-text">Give employers a sense for who you are, your motivations and your aspirations. Focus on traits that make you unique and are not readily apparent from you CV. This is your personal “elevator pitch” to employers that ensures you are memorable and hence, stand out from the crowd.</div>
											<h5 class="question-title" id="work"><i class="fa fa-caret-right"></i>Discuss a time when you were faced with a major obstacle (work or otherwise) and how you overcame it?</h5>
											<div class="quest-instruction" id="work-text">This question tests your ability to be resilient and cope under pressure. It gives you the opportunity to demonstrate how you can use your initiative and act with integrity. Your answer should focus on a work-related issue, explain clearly the measures you took to overcome the obstacle. Don’t fall into the trap of criticising your company or colleagues and trying to present yourself in a superior light. This will come across as unprofessional and arrogant.</div>

											<h5 class="question-title" id="strength"><i class="fa fa-caret-right"></i>Describe the work environment or culture in which you are most productive and happy?</h5>
											<div class="quest-instruction" id="strength-text">A good way to approach this question is to show that you are aware of the benefits of different work environments or cultures and you understand that you need to be comfortable working in these scenarios. It is fine to have a preference, as many of us will prefer one specific environment to the other. The key is for you to ensure that prospective employers understand your preferred environment or culture (working in a team or individually, working in an unstructured or structured environment, large or smaller team, strict supervision or less supervision, etc).</div>

											<h5 class="question-title" id="environment"><i class="fa fa-caret-right"></i>Drawing on your work experience or personal life, can you give an example of a time when you wanted to give up, and chose not to?</h5>
											<div class="quest-instruction" id="environment-text">This question is a good way to demonstrate that you are able to work well under pressure and stay focused on the task at hand. This is an opportunity to explain the measures you put in place to prevent an issue from spiralling into a stressful situation. Give an example of when you were faced with a difficult situation and how you kept a cool head and stuck through the situation. Getting overwhelmed by stress can be counter-productive, especially when working in a team. Employers will look to avoid hiring candidates who crack under pressure.</div>

											<h5 class="question-title" id="future"><i class="fa fa-caret-right"></i>How do you react when asked to do something beyond your capabilities?</h5>
											<div class="quest-instruction" id="future-text">There’s no right or wrong answer for this question. This question tries to establish what makes you tick, and how you manage challenging tasks. Therefore, your answer needs to reflect this. Whatever your answer is, make sure you say why.</div>

											<a id="sample-vid-btn" href="" data-modal-id="modal-sample-video"> See Sample Video </a>
										</div>
									</div>
									{% if resume.video_status == true %}
										<div class="col-md-5">
											{#<video style="margin-top: 50px;" width="450" height="300" controls=controls>#}
											{#<source src="/applicant_videos/{{ resume.video_file }}" type="video/mp4"></source>#}
											{#</video>#}
											<iframe width="420" height="345" src="https://youtube.com/embed/{{ resume.youtube_vid_id }}"></iframe>
											<div class="row text-center"><br>
												<button class="btn btn-default select-file-button">Change Video</button>
											</div>
											<span class="hidden" id="video_id">{{ resume.youtube_vid_id }}</span>
										</div>
										<span id="video_id" class="hidden">{{ resume.youtube_vid_id }}</span>
									{% else %}
										<div class="col-md-5">
											<div class="empty-vid">
												<i class="pe-7s-video"></i>
												<p><button class="btn btn-danger select-file-button"><i class="fa fa-video-camera"></i> Upload Your Video</button></p>
												<br>
												<ul class="text-left">
													<li>The video file size must not be more than 100MB</li>
													<li>Then length of the video must not be more than 3 minutes</li>
													<li>It is recommended you use a WIFI network to upload your profile video or compress video size before upload.</li>
												</ul>
											</div>
										</div>
									{% endif %}
									<input id="select-file" type="file" style="display:none">
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

{% block modals %}
	<div class="modal fade" id="modal-sample-video" tabindex="-1" role="dialog" aria-labelledby="modal-video-label">
	    <div class="modal-dialog" role="document">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true">&times;</span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="modal-video">
	                    <div class="embed-responsive embed-responsive-16by9">
							<iframe id="sample-video" src="https://player.vimeo.com/video/259674304" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
{% endblock %}


{% block scriptTag %}
	<script type="text/javascript" src="/js/profile-photo.js"></script>
	<!-- Defaults: resumable not necessary depending on how uploading goes -->

	<!-- Facial tracking -->
	<script src="/js/proctor/tracking-new.js"></script>
	<script src="/js/proctor/face-min.js"></script>
	<script src="/js/proctor/eye-min.js"></script>
	<script src="/js/proctor/mouth-min.js"></script>

	<!-- Audio Volume metering -->
	<script src="/js/proctor/volume-meter.js"></script>

	<!-- Audio tracking -->
	<script src="/js/proctor/recorder-new.js"></script>
	<!-- Main Setup -->
	<script src="/js/proctor/setup-new.js?v=2"></script>

	{#<script src="/js/proctorSetup.js"></script>#}
	<script type="text/javascript" src="/js/gqTestFrontend.js?v=11"></script>


	<script type="text/javascript" src="/js/plugins/timer.jquery.min.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery.easy-autocomplete.min.js"></script>
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
				var institutionsClone =  $("#another-inst").clone();
                institutionsClone.insertBefore("#another-inst").slideDown().removeAttr("id");

                $('.is-required', institutionsClone).prop('required', true);

				$('.datep').datepicker({
					format: 'yyyy-mm-dd',
					autoHide: true
				});

				$(".school").easyAutocomplete(options);
			});

			// remove one row from institution
			$("#institutions").on("click", ".remove-institution-btn", function(e) {
				e.preventDefault();
				$(this).parents(".inst-row").slideUp(function() {
					$(this).remove();
				});
			});

			// add one row to qualifications
			$("#qualifications").on("click", ".add-qualification", function(e) {
				e.preventDefault();

				let qualificationClone = $("#another-qualification").clone();
                qualificationClone.insertBefore("#another-qualification").slideDown().removeAttr("id");

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
						var msg = "Your GetQualified profile has been successfully updated!";
						showNotification('top', 'right', 'success', msg, 'pe-7s-bell');
						window.setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else {
						showNotification('bottom', 'center', 'danger', d.msg, 'pe-7s-bell');
					}
					$("#btn-submit").html("Update Profile").prop('disabled', false);
				}, 'JSON');
			});

			$("#candidate-editResumeBtn").on('click', function(e) {
				e.preventDefault();

				// Hide the Resume presentation View
				$("#resume").addClass('hidden');

				// Show the Resume Form View
				$("#resumeForm-container").removeClass('hidden');
                // easyAutocomplete sometimes has a width of 0px. Makes input field look small
                $('.easy-autocomplete .school').parent().css('min-width', '200px');
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

			$("#sample-vid-btn").on('click', function(e) {
				e.preventDefault();
				$( '#' + $(this).data('modal-id') ).modal({
					keyboard: true
				});
			});

			$('#modal-sample-video').on('hide.bs.modal', function(e) {
				var $frame = $('iframe#sample-video');

				// saves the current iframe source
				var vidsrc = $frame.attr('src');

				// sets the source to nothing, stopping the video
				$frame.attr('src', '');

				// sets it back to the correct link so that it reloads immediately on the next window open
				$frame.attr('src', vidsrc);
			});
		});
	</script>

	<script src="https://apis.google.com/js/api.js"></script>
	<script src="/js/youtubeUpload.js?v=2"></script>

{% endblock %}
