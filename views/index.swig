{% extends 'theme.swig' %}
{% set title = 'Welcome to GQ' %}
{% block body %}

<style>
	#whatIs .list-styled {
		list-style: initial;
	}
</style>

{% block backgroud %}
<div class="bg-img" style="background-image: url('/images/gq.jpg');">
	<div class="overlay"></div>
</div>
{% endblock %}
	<!-- home wrapper -->
		<div class="home-wrapper">
			<div class="container">
				<div class="row">

					<!-- home content -->
					<div class="col-md-10 col-md-offset-1">
						<div class="home-content">
							<div class="row">
								<h1 class="white-text">Recruiting should be simple, quick and data driven</h1>
							</div>
							<div class="row">
								<p class="white-text col-md-8 col-md-offset-2">GetQualified uses state-of-the art artificial intelligence and video technology to identify the best candidate from thousands of applicants.</p>
							</div>
							<div class="row">
								<button data-target="#requestModal" data-toggle="modal" class="white-btn">Get Started!</button>
								<a href="#about" class="main-btn">Learn more</a>
							</div>


						</div>
					</div>
					<!-- /home content -->

				</div>
			</div>
		</div>
		<!-- /home wrapper -->

	</header>
	<!-- /Header -->

	<div id="about" class="section bg-grey md-padding">
		<div class="container">
			<div class="row">
				<p class="col-md-8  col-md-offset-2">
					Recruitment is expensive when you get it wrong. Qualify your candidates with GetQualified to avoid expensive recruiting mistakes and to determine which candidates will perform best over the long term.</p>
				<!-- <p class="col-md-8  col-md-offset-2">
					Most successful companies already realise the benefit of candidate testing but offline testing is expensive and difficult to scale whilst online testing can result in unreliable results. Our proprietary platform allows for online candidate testing on a large scale whilst eradicating the risk of impropriety.</p> -->
			</div>
		</div>
	</div>

	<div id="whatIs" class="section md-padding">
		<!-- Container -->
		<div class="container">

			<!-- Row -->
			<div class="row">

				<div class="col-md-6">
					<div class="section-header">
						<h2 class="title">What is Get Qualified</h2>
						<ul class="landing-page-list">
							<li>A recruitment tool for employers and recruitment companies</li>
							<li>Objectively assess candidate’s cognitive abilities, job related knowledge and fit via a low cost and scalable testing platform</li>
							<li>Identify the best candidates from a large applicant pool</li>
							<li>Reduce recruitment time by 75% and increase your hiring success rate by 100%</li>
						</ul>
					</div>

				</div>

				<div class="col-md-6 text-right">
					<img src="/images/choose-us.jpg" />
				</div>

			</div>
			<!-- /Row -->

		</div>
		<!-- /Container -->

	</div>

	<!-- Innovations -->
	<div id="innovations" class="section md-padding bg-grey">

		<!-- Container -->
		<div class="container">

			<!-- Row -->
			<div class="row">

				<!-- Section header -->
				<div class="section-header text-center">
					<h2 class="title">Our Innovations</h2>
				</div>
				<!-- /Section header -->

				<!-- about -->
				<div class="col-md-4">
					<div class="about">
						<i class="fa fa-graduation-cap landing-page-icon"></i>
						<h3>Digital Test Invigilation</h3>
						<p>Our proprietary software allows remote testing of candidates on any webcam and microphone enabled pc or laptop.<br>By using facial and voice recognition, our powerful artificial intelligence algorithm awards each test an integrity score, flagging low scores for review.</p>
					</div>
				</div>
				<!-- /about -->

				<!-- about -->
				<div class="col-md-4">
					<div class="about">
						<i class="fa fa-briefcase landing-page-icon"></i>
						<h3>Candidate Shortlisting</h3>
						<p>We take the hard work out of shortlisting from thousands of applicant to the top three to five candidates. <br> Our software captures applicant’s digital CV’s and intelligence / aptitude scores, coupled with job-specific test scores for each role.</p>
					</div>
				</div>
				<!-- /about -->

				<!-- about -->
				<div class="col-md-4">
					<div class="about">
						<i class="fa fa-video-camera landing-page-icon" aria-hidden="true"></i>
						<h3>Behavioural Video Interviews</h3>
						<p>Pre-recorded video profiles with candidate responses to behavioural based questions are included to allow further streamlining for final interview. Candidates can be assessed based on how they present themselves as well as their character traits.</p>
					</div>
				</div>
				<!-- /about -->
			</div>
			<!-- /Row -->

		</div>
		<!-- /Container -->
	</div>
	<!-- /Innovations -->



	<!-- How It Works -->
	<div id="hiw" class="section md-padding">

		<!-- Section header -->
		<div class="container">
			<div class="row">
				<div class="section-header text-center">
					<h2 class="title">How It Works</h2>
				</div>
			</div>
		</div>
		<!-- /Section header -->

		<!-- Section Content -->
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box mt-5 mx-auto">
						<i class="fa fa-pencil-square-o landing-page-icon"></i>
						<h3 class="mb-3">Post A Job</h3>
						<p class="text-muted mb-0">We can advertise a role on your behalf or simply send us a list of unvetted applicants</p>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box mt-5 mx-auto">
						<i class="fa fa-address-card landing-page-icon"></i>
						<h3 class="mb-3">Applicants Apply</h3>
						<p class="text-muted mb-0">Applicants take an aptitude and job specific test (employer’s standard job test can be digitised)</p>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box mt-5 mx-auto">
						<i class="fa fa-thumbs-o-up landing-page-icon"></i>
						<h3 class="mb-3">Appicants Are Assessed</h3>
						<p class="text-muted mb-0">We shortlist applicants based on their aptitude and job competency scores, and an objective assessment of their work experience</p>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box mt-5 mx-auto">
						<i class="fa fa-book landing-page-icon"></i>
						<h3 class="mb-3">Train Applicants</h3>
						<p class="text-muted mb-0">Training courses available to enable candidates to improve their job understanding / preparedness for work</p>
					</div>
				</div>

			</div>
		</div>
		<!-- /Section Content -->

	</div>
	<!-- /How It Works -->

	<div id="contact" class="section md-padding bg-grey">

		<!-- Container -->
		<div class="container">

			<!-- Row -->
			<div class="row">
				<div class="col-md-6">
					<img src="/images/support.jpg" />
				</div>
				<div class="col-md-6">
					<div class="section-header">
						<h2 class="title">Get In Touch</h2>
						<p>We care deeply about improving the recruitment process for businesses everywhere. It is currently difficult to ensure employee quality, expensive and takes too much time. It doesn’t have to be this way.</p>
						<p>We are here to work with you to help you hire the best talent.</p>
						<p>
							<a href="mailto:getstarted@getqualified.work">getstarted@getqualified.work</a>
						</p>
					</div>

				</div>
			</div>
			<!-- /Row -->

		</div>
		<!-- /Container -->
	</div>


	<!-- Numbers -->
	<div id="numbers" class="section sm-padding">

		<!-- Background Image -->
		<div class="bg-img" style="background-image: url('/img/background2.jpg');">
			<div class="overlay"></div>
		</div>
		<!-- /Background Image -->

		<!-- Container -->
		<div class="container">

			<!-- Row -->
			<div class="row">

				<!-- number -->
				<div class="col-sm-3 col-xs-6">
					<div class="number">
						<i class="fa fa-users"></i>
						<h3 class="white-text"><span class="counter">4517+</span></h3>
						<span class="white-text">Applicants</span>
					</div>
				</div>
				<!-- /number -->

				<!-- number -->
				<div class="col-sm-3 col-xs-6">
					<div class="number">
						<i class="fa fa-briefcase"></i>
						<h3 class="white-text"><span class="counter">125</span></h3>
						<span class="white-text">Available Jobs</span>
					</div>
				</div>
				<!-- /number -->

				<!-- number -->
				<div class="col-sm-3 col-xs-6">
					<div class="number">
						<i class="fa fa-book"></i>
						<h3 class="white-text"><span class="counter">10</span></h3>
						<span class="white-text">On-going Courses</span>
					</div>
				</div>
				<!-- /number -->

				<!-- number -->
				<div class="col-sm-3 col-xs-6">
					<div class="number">
						<i class="fa fa-thumbs-up"></i>
						<h3 class="white-text"><span class="counter">958</span></h3>
						<span class="white-text">Recruitments</span>
					</div>
				</div>
				<!-- /number -->

			</div>
			<!-- /Row -->

		</div>
		<!-- /Container -->

	</div>
	<!-- /Numbers -->


{% include 'company/includes/request-form.swig' %}

{% endblock %}

{% block scriptTag %}
<script>
	$(document).ready(function() {
		$(".navbar-right li:contains('Home')").addClass('active');

		$("#form-request-access").submit(function(e) {
			e.preventDefault();

			if (!$.isNumeric($('[name=phone]').val()) || $('[name=phone]').val().length < 7) {
				$(".modal-body .alert-danger").text("Invalid phone number. Must be numbers and upto 7 digits").removeClass('hidden').fadeOut(12000, function() {
					$(this).addClass('hidden').fadeIn();
				});
				return false;
			}

			$.post('/company-request/send-request', $(this).serialize(), function(d) {
				if (d.status.trim() == 'success') {
					$(".modal-body").html("<div class='alert alert-info'>Thank you for sending in a request. We'll contact you shortly.</div>");
					$(".modal-footer").html('<button type="button" class="btn btn-default close-modal" data-dismiss="modal">Close</button>')
				}
			});
		});
	});
</script>
{% endblock %}
