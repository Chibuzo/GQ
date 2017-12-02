{% extends '../applicant/layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
	<i class="pe-7s-user"></i> &nbsp;My Profile
{% endblock %}

{% block body %}
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

	/* CBT Styles */
	.question-num {
		float: left;
		width: 40px;
		height: 40px;
		margin: 5px;
		border-radius: 50%;
		padding-left: 14px;
		padding-top: 9px;
		font-size: 15px;
		border: #ccc solid thin;
		cursor: pointer;
	}

	.question-image img {
		width: 450px;
	}

	.question-num:hover {
		border-color: #999;
	}

	.active_q {
		background-color: #A37F2D;
		color:#fff;
	}

	.answered_q {
		background-color: #99cc66;
		color:#fff;
	}

	.skipped_q {
		background-color: #c9302c;
		color:#fff;
	}

	.result .row {
		border-bottom: #ccc solid thin;
		padding: 8px 3px;
	}

	ul.opts {
		list-style-type: none;
	}

	.nav-btns {
		overflow: auto;
	}
</style>
<div class="content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="header">
						<h4 class="title"><i class="fa fa-edit"></i>&nbsp; Edit Your Resume</h4>
					</div><br>

					<div class="content">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#resume" data-toggle="tab"> &nbsp;Resume</a></li>
							<li><a href="#test" data-toggle="tab"><i class="fa fa-edit"></i> &nbsp;Test</a></li>
							<li><a href="#video" data-toggle="tab"> <i class="fa fa-video-camera"></i> &nbsp;My Video</a></li>
						</ul>
						<div class="tab-content">
						  	<div class="tab-pane fade active in" id="resume">
								<div class="row">
									<div class="col-md-12" style="padding: 50px">
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

								<div class="{{ result_visibility }} col-md-5 col-md-offset-3" id="result-div">
									<div class="result">
										<h3 class="test-title">{{ test_title }}</h3><br>
										<div class="row">
											<div class="col-md-6">Score: </div><div class="col-md-2" id="score">{{ result.score }}</div>
										</div>
										<div class="row">
											<div class="col-md-6">Percentage: </div><div class="col-md-2" id="percentage">{{ result.percentage }}%</div>
										</div>
										<div class="row">
											<div class="col-md-6">Average: </div><div class="col-md-2" id="average">{{ result.average }}</div>
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
											<h5>Would it not make sense to leave a brief message to the applicant about the test why they should care?</h5>
											<br>
											<button class="btn btn-primary btn-lg load-test">Take test</button>
										</div>
									</div>

									<div class="test">
										<h3 class="test-title text-center"></h3>
										<div id="instructions">
											<div class="instruction"></div>
											<div class="text-center">
												<button class="btn btn-lg btn-primary hidden" id="start-test"><i class="fa fa-clock-o"></i> Start Test</button>
											</div>
										</div>

										<div class="test" style="display: none;">
											<div id="countdowntimer" class="text-right"><span id="hms_timer"><span>00:00</div>
											<div class="question-count text-right" style="display: none;"><span id="current_quest"></span> / <span id="total_questions"></span></div>
											<div class="row">
												<div class="col-md-9">
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

												<div class="col-md-3">
													<div class="question-nums">

													</div>
												</div>
											</div>

											<div class="nav-btns">
												<button class="btn btn-info btn-fill hidden">Pev <i class="fa fa-caret-left"></i> </button>
												<button class="btn btn-info btn-fill pull-right" id="next-question">Next <i class="fa fa-caret-right"></i> </button>
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
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestFrontend.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.countdownTimer.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {

	// add one row to institution
	$("#institutions").on("click", ".add-institution", function(e) {
		e.preventDefault();
		$("#another-inst").clone().insertBefore("#another-inst").slideDown().removeAttr("id");
		$(this).removeClass("add-institution").html("<i class='fa fa-minus'></i>").addClass("remove-institution-btn");
		$('.datep').datepicker({
			format: 'yyyy-mm-dd',
			autoHide: true
		});
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


	// retake test
	$("#retake-test").click(function() {
		$("#result-div").fadeOut('fast', function() {
			$("#test-div").hide().removeClass('hidden').fadeIn('fast');
		});
	});
});
</script>
{% endblock %}