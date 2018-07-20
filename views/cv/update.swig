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
<link href="/styles/gq-cbt.css?v=2" rel="stylesheet" />
<link href="/styles/proctor-style.css" rel="stylesheet" />
<link href="https://api.neon.ventures/proctor/css/pavp.css" rel="stylesheet" />
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

	.addable, .RC-video-canvass {
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

	.video-div img {
		width: 100%;
	}

	.question-title {
		cursor: pointer;
		font: 100 16px 'Open Sans Light', san-serif, Tahoma;
		padding: 3px 10px 10px;
		border-bottom: #ccc solid thin;
	}

	.quest-instruction {
		display: none;
		padding-left: 20px;
	}

	.gq-datep {
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

	.loader-text {
		text-align: center;
	}

	.fa-trash {
		color: red;
	}

	#btn-submit {
		margin-top: 10px;
	}

	.loader {
		margin: auto;
	    border: 16px solid #f3f3f3; /* Light grey */
	    border-top: 16px solid #3498db; /* Blue */
	    border-radius: 50%;
	    width: 120px;
	    height: 120px;
	    animation: spin 2s linear infinite;
	}

	.disable-tab {
		cursor: default;
		color: gray !important;
		border-color: transparent !important;
		border-bottom-color: #ddd !important;
	}

	.disable-tab:hover {
		color: gray !important;
		border-color: transparent !important;
		border-bottom-color: #ddd !important;
	}

	.profile-tabs .active a {
		color: #1DC7EA !important;
	}

	.delete-entry-container {
		margin-top: 5px;
		position: relative;
		display: inline-block;
		background: white;
		border-radius: 5%;
		padding: 5px;
		border: 1px solid red;
	}

	.add-entry-container {
		display: inline-block;
		margin-top: 10px;
		background: white;
		border-radius: 5%;
		padding: 5px;
		border: 1px solid #1DC7EA;
		color: #1DC7EA;
	}

	.delete-entry-col {
		align-self: flex-end;
		text-align: center;
	}

	.delete-entry-container:hover {
		background: red;
		border-radius: 5%;
		padding: 5px;
		border: 1px solid red;
	}

	.delete-entry-container:hover .delete-entry {
		color: white;
	}

	.delete-entry {
		color: red;
	}

	.delete-entry-test:hover {
		color: white;
	}

	/** CV Styles **/

	.div-cv {
		padding: 2px 20px;
	}

	h4 {
		/**font-size: 28px;
		font-weight: 400;**/
		margin-top: 5px;
	}

	hr {
		margin-top: -8px;
		border-top: 1px solid #ccc;
	}

	#cv-view .row {
		padding: 1px 7px;
	}


	@keyframes spin {
	    0% { transform: rotate(0deg); }
	    100% { transform: rotate(360deg); }
	}

	@media screen and (min-width: 200px) and (max-width: 600px) {
		#test-notice {
			padding: 10px 5px;
		}

		.question-image img {
			width: 100%;
		}

		.nav-btns {
			text-align: center;
		}

		.cell {
			left:-50px;
			top:-100px;
		}

		.main-panel > .content {
			padding: 30px 0;
		}

		.div-cv {
			padding: 2px 17px;
		}
	}
</style>

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
								<strong>{{ status }}/4</strong> - Profile Completion
							</div>
						</div>
					</div><br>

					<div class="content">
						<ul class="nav nav-tabs profile-tabs">
							<li id="resume-tab-header">
								<a href="#resume-tab" data-toggle="tab"><i class="fa fa-user"></i> Resume</a>
							</li>
							<li id="photo-tab-header">
								<a href="#photo" class="{{ disablePhotoTabClass }}" data-toggle="tab" disabled=""> <i class="fa fa-picture-o"></i> &nbsp;My Photo</a></li>
							<li id="test-tab-header">
								<a href="#test" class="{{ disableTestTabClass }}" data-toggle="tab" disabled=""><i class="fa fa-edit"></i> &nbsp;Basic Assessment</a></li>
							<li id="video-tab-header">
								<a href="#video" class="{{ disableVideoTabClass }}"data-toggle="tab"> <i class="fa fa-video-camera"></i> &nbsp;My Video</a></li>
						</ul>
						<div class="tab-content">
							<div class="row loader-container-row">
								<div class="col-xs-2 col-xs-offset-5">
									<p class="loader-text">Loading...</p>
									<div class="loader">
									</div>
								</div>
							</div>

						  	<div class="tab-pane fade in" id="resume-tab">
								<div class="row">
									<div class="col-md-12 div-cv">
										{% include 'includes/resume-form.swig' %}
										{% include 'includes/resume.swig' %}
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
														<li>All tests must be taken preferably on a laptop or desktop computer equipped with a webcam. A smart phone can be used but it should hava a 4G or WiFi connection.</li>
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
										{% include '../gqtest/includes/testpage.swig' %}

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
								<div class="row" style="margin-top: 20px">
									<div class="col-md-6">
										<h4>Basic Instructions</h4>
										<ol style="margin-left: -14px">
											<li>Dress professionally as prospective employers will use this video as part of the candidate selection process</li>
											<li>You can record your video directly on GetQualified using the record button or record elsewhere and upload</li>
											<li>Record your video during daylight hours or in a well lit room</li>
											<li>Ensure that the light source is behind and not in front of the camera to avoid your face being in shadow</li>
											<li>Once finished, please play back the video and ensure audio volume is adequate. </li>
											<li>If audio volume is not appropriate, please try using headphone with a built in microphone and ensure your microphone volume is high</li>
										</ol>	
										<div class="">
											<h4>Questions to Answer</h4>
											<h5 class="question-title" id="about">Briefly introduce yourself to prospective employers</h5>
											<div class="quest-instruction" id="about-text">Give employers a sense for who you are, your motivations and your aspirations. Focus on traits that make you unique and are not readily apparent from you CV. This is your personal “elevator pitch” to employers that ensures you are memorable and hence, stand out from the crowd.</div>
											<h5 class="question-title" id="work">Discuss a time when you were faced with a major obstacle (work or otherwise) and how you overcame it?</h5>
											<div class="quest-instruction" id="work-text">This question tests your ability to be resilient and cope under pressure. It gives you the opportunity to demonstrate how you can use your initiative and act with integrity. Your answer should focus on a work-related issue, explain clearly the measures you took to overcome the obstacle. Don’t fall into the trap of criticising your company or colleagues and trying to present yourself in a superior light. This will come across as unprofessional and arrogant.</div>

											<h5 class="question-title" id="strength">Describe the work environment or culture in which you are most productive and happy?</h5>
											<div class="quest-instruction" id="strength-text">A good way to approach this question is to show that you are aware of the benefits of different work environments or cultures and you understand that you need to be comfortable working in these scenarios. It is fine to have a preference, as many of us will prefer one specific environment to the other. The key is for you to ensure that prospective employers understand your preferred environment or culture (working in a team or individually, working in an unstructured or structured environment, large or smaller team, strict supervision or less supervision, etc).</div>

											<h5 class="question-title" id="environment">Drawing on your work experience or personal life, can you give an example of a time when you wanted to give up, and chose not to?</h5>
											<div class="quest-instruction" id="environment-text">This question is a good way to demonstrate that you are able to work well under pressure and stay focused on the task at hand. This is an opportunity to explain the measures you put in place to prevent an issue from spiralling into a stressful situation. Give an example of when you were faced with a difficult situation and how you kept a cool head and stuck through the situation. Getting overwhelmed by stress can be counter-productive, especially when working in a team. Employers will look to avoid hiring candidates who crack under pressure.</div>

											<h5 class="question-title" id="future">How do you react when asked to do something beyond your capabilities?</h5>
											<div class="quest-instruction" id="future-text">There’s no right or wrong answer for this question. This question tries to establish what makes you tick, and how you manage challenging tasks. Therefore, your answer needs to reflect this. Whatever your answer is, make sure you say why.</div>

											<a id="sample-vid-btn" href="" data-modal-id="modal-sample-video"> See Sample Video </a>
										</div>
									</div>
									{% if resume.video_status == true %}
										<div class="col-md-5 gq-video-canvass">
											<!--<iframe width="470" height="345" src="https://youtube.com/embed/{{ resume.youtube_vid_id }}"></iframe>-->
											<div class="video-div">
												<video width="470" height="345" controls>
													<source src="{{ resume.video_file }}" type="video/mp4">
													Your browser does not support the video tag.
												</video>
											</div>	
											<span id="old-video" class="hidden">{{ resume.video_file }}</span>
											<br>
											<div class="alert alert-warning hidden video-alert"></div>
											<div class="alert alert-warning hidden vid-info"><strong>Note:</strong> After upload, your video won't be available for few minutes while we process it.</div>
											<div class="row text-center"><br>
												<button class="btn btn-default selectfile-button hidden">Change Video</button>
												<button class="btn btn-primary record-video">Record Video</button>
												<div class="progress" style="margin: 10px 5px;">
													<div class="progress-bar progress-bar-success progress-bar-striped active" style="width: 0%" id="progressBar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
														<span class="sr-only">0%</span>
													</div>
												</div>
											</div>
											<!--<span class="hidden" id="video_id">{{ resume.youtube_vid_id }}</span>-->
										</div>
										<!--<span id="video_id" class="hidden">{{ resume.youtube_vid_id }}</span>-->
									{% else %}
										<div class="col-md-5 gq-video-canvass">
											<div class="empty-vid">
												<div class="alert alert-warning hidden video-alert"></div>
												<div class="alert alert-warning hidden vid-info"><strong>Note:</strong> After upload, your video won't be available for few minutes while we process it.</div>
												<i class="pe-7s-video"></i>
												<p>
													<button class="btn btn-danger selectfile-button hidden"><i class="fa fa-video-camera"></i> Upload Your Video</button>
													<button class="btn btn-primary record-video">Record Video</button>	
												</p>
												<br>
												 <div class="progress" style="margin: 10px 5px;">
													<div class="progress-bar progress-bar-success progress-bar-striped active" style="width: 0%" id="progressBar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
														<span class="sr-only">0%</span>
													</div>
												</div>
												<ul class="text-left">
													<li>The video file size must not be more than 100MB</li>
													<li>Then length of the video must not be more than 3 minutes</li>
													<li>It is recommended you use a WIFI network to upload your profile video or compress video size before upload.</li>
												</ul>
											</div>
										</div>
									{% endif %}
									<!--<form action="/applicant/add-profilevideo" method="post" id="form-video-upload" enctype="multipart/form-data">
										<input type="hidden" name="video_name" value="{{ resume.video }}" />
										<input type="hidden" name="user_id" value="{{ resume.user.id }}">
										<input type="file" name="video" style="display: none" id="file-control" />
									</form>-->
									<!--<input id="select-file" type="file" style="display:none">-->
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

	{% include '../applicant/includes/video-recorder-modal.swig' %}
{% endblock %}

{% block scriptTag %}

<script type="text/javascript">
	$(document).ready(function() {
		$(".resume").addClass('active');

		var urlHash = location.hash;

		$(".loader-container-row").hide();

		if (urlHash == "" || urlHash == "#resume-tab") {
			$("#resume-tab-header").addClass('active');
			$("#resume-tab").addClass('active');
		} else if(urlHash == "#photo") {
			$("#photo-tab-header").addClass('active');
			$("#photo").addClass('active');
		} else if(urlHash == "#test") {
			$("#test-tab-header").addClass('active');
			$("#test").addClass('active');
		} else if(urlHash == "#video") {
			$("#video-tab-header").addClass('active');
			$("#video").addClass('active');
		} else {
			$("#resume-tab-header").addClass('active');
			$("#resume-tab").addClass('active');
		}
	});
</script>


	<script type="text/javascript" src="/js/profile-photo.js"></script>
	<!-- Defaults: resumable not necessary depending on how uploading goes -->

	<!-- Facial tracking -->
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/tracking-new.js?v=2"></script>
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/face-min.js?v=2"></script>
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/eye-min.js?v=2"></script>
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/mouth-min.js?v=2"></script>

	<!-- Audio Volume metering -->
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/volume-meter.js?v=2"></script>

	<!-- Audio tracking -->
    {#<script type="text/javascript" src="/js/proctor/recorder-new.js"></script>#}
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/RecordRTC.js?v=1"></script>
	<!-- Main Setup -->
	<script type="text/javascript" src="https://api.neon.ventures/proctor/js/setup-new.js?v=3"></script>

	<script type="text/javascript" src="/js/gqTestFrontend.js?v=23"></script>

	<script type="text/javascript" src="/js/plugins/timer.jquery.min.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery.easy-autocomplete.min.js"></script>

	<script type="text/javascript">
		$(document).ready(function() {
			$('.disable-tab').on('click', function(evt) {
				evt.preventDefault();
				return false;
			});


			$('.profile-tabs a').on('click', function(evt) {
				var href = $(this).attr('href');
				window.location = href;
			});

			$("select[name=country]").find('option').filter(function(i) {
				return 'Nigeria' == $(this).val();
			}).attr("selected", "selected");

			var initDatepickerField = function() {
				$('.gq-datep').datepicker({
					autoHide: true,
					format: 'yyyy-mm-dd'
				});
			}

			initDatepickerField();


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

				initDatepickerField();

				$(".school").easyAutocomplete(options);
			});

			// remove one row from institution
			$("#institutions").on("click", ".remove-institution-btn", function(e) {
				e.preventDefault();
				if (confirm('Are you sure you want to remove this Educational entry?')) {
					$(this).parents(".inst-row").slideUp(function() {
						$(this).remove();
					});
				}
			});

			// add one row to qualifications
			$("#qualifications").on("click", ".add-qualification", function(e) {
				e.preventDefault();

				let qualificationClone = $("#another-qualification").clone();
				qualificationClone.insertBefore("#another-qualification").slideDown().removeAttr("id");

				initDatepickerField();
			});


			// remove one row from qualifications
			$("#qualifications").on("click", ".remove-qualification-btn", function(e) {
				e.preventDefault();

				if (confirm('Are you sure you want to remove this Certification?')) {
					$(this).parents(".qual-row").slideUp(function() {
						$(this).remove();
					});
				}
			});

			// add one row to emplyment
			$("#employments").on("click", ".add-employment", function(e) {
				e.preventDefault();
				$("#another-employment").clone().insertBefore("#another-employment").slideDown().removeAttr("id");

				initDatepickerField();
			});


			// remove one row from employment
			$("#employments").on("click", ".remove-employment-btn", function(e) {
				e.preventDefault();

				if (confirm('Are you sure you want to remove this Employment History?')) {
					$(this).parents(".employment-row").slideUp(function() {
						$(this).remove();
					});
				}
			});


			// add one row to reference contact
			$("#referenceContacts").on("click", ".add-reference", function(e) {
				e.preventDefault();
				$("#another-reference").clone().insertBefore("#another-reference").slideDown().removeAttr("id");
			});


			// remove one row from reference contact
			$("#referenceContacts").on("click", ".remove-reference-btn", function(e) {
				e.preventDefault();

				if (confirm('Are you sure you want to remove this Reference?')) {
					$(this).parents(".reference-row").slideUp(function() {
						$(this).remove();
					});
				}
			});


			$("#form-resume").submit(function(e) {
				e.preventDefault();

				$("#btn-submit").html("<i class='fa fa-cog fa-spin'></i> Updating...").prop('disabled', true);
				$.post('/resume/update', $(this).serialize(), function(d) {
					if (d.status.trim() == 'success') {
						var msg = "Your GetQualified profile has been successfully updated!";
						showNotification('top', 'right', 'success', msg, 'pe-7s-bell');
                        amplitude.getInstance().logEvent('Update Resume: Successful');
						window.setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else {
						showNotification('bottom', 'center', 'danger', d.msg, 'pe-7s-bell');
                        amplitude.getInstance().logEvent('Update Resume: Failed', {
                            msg: d.msg
                        });
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

                amplitude.getInstance().logEvent("Sample Video Link Clicked");
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

            $('.nav.nav-tabs a').on('click', function(evt) {
                var href = $(this).attr('href');
                href = href.substr(1);
                amplitude.getInstance().logEvent("Profile/Resume " + href + " Tab");
            });
		});
	</script>

	<script src="https://apis.google.com/js/api.js"></script>
	<script src="https://api.neon.ventures/proctor/js/adapter-latest.js"></script>
	<script src="https://api.neon.ventures/proctor/js/pavp.js"></script>
	<!--<script src="/js/youtubeUpload.js"></script>-->

<script>
$(document).ready(function() {
	// $(".selectfile-button").click(function() {
	// 	$("input[name=video]").click();
	// });
	
	$(".record-video").click(function() {
		$("#videoRecorderModal").modal();

		pavp = new Pavp({
			onUploadButtonClicked: function($this, video_file) {
				var video = video_file;
				uploadFile(video);
				$("#videoRecorderModal").modal('hide');
				$(".record-video").prop('disabled', true);
			}
		});
	});

		//var vd = new FormData($("#form-video-upload")[0]);

	$("#videoRecorderModal").on("hidden.bs.modal", function () {
        pavp.stop();
    });
});

function uploadFile(video) {
	var old_video = $("#old_video").text();
	$.ajax({
		type: "POST",
		url: '/applicant/add-profilevideo',
		data: { data: video, old_video: old_video },
		success: function (data) {
			location.reload(true);
		},
		xhr: function(){
			//Get XmlHttpRequest object
			var xhr = $.ajaxSettings.xhr() ;
			//Set onprogress event handler
			xhr.upload.onprogress = function(data){
				var perc = Math.round((data.loaded / data.total) * 100);
				$('#progressBar span.sr-only').text(perc + '%');
				$('#progressBar').css('width', perc + '%');
			};
			return xhr ;
		},
		error: function (e) {
			//HideLoad();
			console.log(e)
			console.error('Error has occurred while uploading the media file.');
		}
	});
}
</script>
{% endblock %}
