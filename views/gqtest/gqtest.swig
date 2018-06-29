{% extends '../applicant/layout.swig' %}
{% set title = 'GQ Assessment' %}
{% block page_title %}
	<i class="pe-7s-test"></i> &nbsp;GQ Assessment
{% endblock %}

{% block head %}
  {% parent %}
  {% set location = "Job Test" %}
  {% include "../externalApplications/amplified.swig" %}
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
<link href="/styles/proctor-style.css" rel="stylesheet" />

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

				<div class="row" style="padding: 40px">
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
								<p><strong>Please read the following instructions very carefully.</strong></p>
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
								<p>Proceed to take the test and Good luck!</p>								<br>
								<button class="btn btn-primary btn-lg load-test" data-test_id="{{ test_id }}">Take test</button>
							</div>
						</div>

						{% include 'includes/testpage.swig' %}	
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
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

	<script type="text/javascript" src="/js/gqTestFrontend.js?v=21"></script>
	
<script type="text/javascript" src="/js/plugins/timer.jquery.min.js"></script>
{% endblock %}