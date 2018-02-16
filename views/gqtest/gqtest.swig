{% extends '../applicant/layout.swig' %}
{% set title = 'GQ Assessment' %}
{% block page_title %}
	<i class="pe-7s-test"></i> &nbsp;GQ Assessment
{% endblock %}
{% block body %}
<style>
	.cell {
		opacity: 0;
		position: absolute !important;
		/*right: -1500px;*/
		z-index: -2;
	}
</style>
<link href="/styles/gq-cbt.css" rel="stylesheet" />

<div class="row">
	<div class="col-md-12">
		<div class="card">
			<div class="header"></div>

			<div class="content">
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
								{{ test.test_title }}
							</div>

							<ul class="list-group">
								<li class="list-group-item">Score: <span id="score">{{ result.score }}/{{ result.no_of_questions }}</span></li>
								<li class="list-group-item">Percentage: <span id="percentage">{{ result.percentage }}%</span></li>
								<li class="list-group-item">Average: <span id="average">{{ result.average }}</span></li>
							</ul>
							<div class="panel-body">
								<strong>Note: </strong>You can always pay and retake the test to improve your score.
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
							<h5>Would it not make sense to leave a brief message to the applicant about the test why they should care?</h5>
							<br>
							<button class="btn btn-primary btn-lg load-test" data-test_id="{{ test_id }}">Take test</button>
						</div>
					</div>

					<div class="test">
						<h3 class="test-title text-center"></h3>
						<div id="instructions">
							<div class="instruction"></div>
							<div class="text-center">
								<button class="btn btn-lg btn-primary hidden" id="start-test" data-test_id="{{ test_id }}"><i class="fa fa-clock-o"></i> Start Test</button>
							</div>
						</div>

						<div class="inner-test-div" style="display: none;">
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
		</div>
	</div>
</div>

	<div class="cell">
		<div class="proctor-container" style="position: relative; width: 640px; height: 360px">
			<video id="proctor-video" width="640" height="360" preload autoplay loop muted style="position: absolute; top: 0; left: 0"></video>
			<canvas id="proctor-canvas" width="640" height="360" style="position: absolute; top: 0; left: 0"></canvas>
		</div>
	</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestFrontend.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.countdownTimer.min.js"></script>
<!-- Facial tracking -->
<script src="/js/proctor/tracking-min.js"></script>
<script src="/js/proctor/face-min.js"></script>
<script src="/js/proctor/eye-min.js"></script>
<script src="/js/proctor/mouth-min.js"></script>

<!-- Audio Volume metering -->
<script src="/js/proctor/volume-meter.js"></script>

<!-- Audio tracking -->
<script src="/js/proctor/recorder.min.js"></script>
<!-- Main Setup -->
<script src="/js/proctor/setup.js"></script>
{% endblock %}