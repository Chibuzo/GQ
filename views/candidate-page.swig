{% extends 'theme.swig' %}
{% set title = 'GQ - Candidates' %}
{% block body %}
<style>
.course-menu {
	margin-top: 30px;
	padding-top: 10px;
	padding-bottom: 3px;
	border-top: #f0f0f0 solid thin;
}

.about {
	max-height: 450px;
}

.head-title {
	height: 53px;
}

.course-title:link {
	color: #333;
	font-size: 23px;
}

.course-desc {
	clear: both;
	height: 230px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>

{% block backgroud %}
	<div class="bg-img" style="background-image: url('/images/staffing.jpg');">
		<div class="overlay"></div>
	</div>
{% endblock %}

<div class="home-wrapper">
	<div class="container">
		<div class="row">

			<!-- home content -->
			<div class="col-md-10 col-md-offset-1">
				<div class="home-content">
					<h1 class="white-text">Getting a job can be quick and easy</h1>
					<p class="white-text">GetQualified first</p>
					<a href="/signup" class="white-btn">Sign Up</a>
				</div>
			</div>

		</div>
	</div>
</div>

</header>
<!-- /Header -->

<section id="about" class="bg-grey">
	<div class="container">
		<div class="row">
			<div class="col-md-8  col-md-offset-2">
			Getting a job used to be difficult. Not any more. No more searching endlessly in newspapers and online for potential jobs. No more wasting money and time going from interview to interview. GetQualified makes getting a job as simple as possible.</div>
	</div>
</section>

<!-- About -->
<div id="features" class="section md-padding">

	<!-- Container -->
	<div class="container">

		<!-- Row -->
		<div class="row">

			<!-- Section header -->
			<div class="section-header text-center">
				<h2 class="title">How will it help me as a candidate?</h2>
			</div>
			<!-- /Section header -->

			<!-- about -->
			<div class="col-md-4">
				<div class="about">
					<i class="fa fa-certificate landing-page-icon"></i>
					<h3>Personalised Career Guidance</h3>
					<p>Get matched with a job that suits your knowledge and your strengths. Receive a fair and unbiased comparison of your abilities vs other applicants and personalised advice on career options to optimise your chances of getting hired</p>
				</div>
			</div>
			<!-- /about -->

			<!-- about -->
			<div class="col-md-4">
				<div class="about">
					<i class="fa fa-check-square-o landing-page-icon"></i>
					<h3>Professional Development</h3>
					<p>Companies are looking for pre-vetted candidates. Enhance your profile and work readiness by undergoing additional work related and soft skills training on our platform. Get certified for each course you successfully complete</p>
				</div>
			</div>
			<!-- /about -->

			<!-- about -->
			<div class="col-md-4">
				<div class="about">
					<i class="fa fa-briefcase landing-page-icon"></i>
					<h3>Discover new job opportunities </h3>
					<p>Let jobs find you. GetQualified searches 24/7 for all available jobs on your behalf . Get notified of relevant job opportunities and apply directly or receive job offers directly from employers who have seen your video profile and ranking</p>
				</div>
			</div>
			<!-- /about -->

		</div>
		<!-- /Row -->

	</div>
	<!-- /Container -->

</div>
<!-- /About -->

<div id="getStarted" class="section md-padding bg-grey">

	<!-- Container -->
	<div class="container">

		<!-- Row -->
		<div class="row">
			<div class="col-md-6">
				<img src="/images/why-gq.jpg" />
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="section-header">
						<h2 class="title">How do I get started?</h2>
					</div>
					<div>
						<p>Registering for GetQualified is easy and free.</p>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<ul class="landing-page-list">
							<li>Create a searchable digital CV</li>
							<li>Record and upload a great video profile</li>
							<li>Complete the GetQualified aptitude test</li>
							<li>Start receiving job notifications from our platform (Work-In-Progress)</li>
							<li>Start receiving job offers from employers (Work-In-Progress)</li>
							<li>Get an awesome new job</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- /Row -->

	</div>
	<!-- /Container -->

</div>


<div id="service" class="section md-padding">

	<div class="container">

		<!-- Row -->
		<div class="row">

			<!-- Section header -->
			<div class="section-header text-center">
				<h2 class="title">Our Courses</h2>
				<p>We have courses to help you get ready for your dream job. Get re-ranked for relevant jobs with each successful course completed.</p>
			</div>
			<!-- /Section header -->

			{% for course in courses %}
				{% set path = course.course_title.split(' ') %}
				<div class="col-md-4 col-sm-6">
					<div class="about" id="{{ course.id }}">
						<div class="head-title">
							<h3><a href="/course/{{ course.id }}/{{ path | join('-') }}" class="course-title">{{ course.course_title }}</a></h3>
						</div>
						<div class="course-desc">{{ course.abstract }}</div>
						<div class="course-menu">
							<button class="btn btn-info pull-right joinCourse" data-toggle="modal" data-target="#joinCourseModal">Take Course</button>
						</div>
					</div>
				</div>
			{% endfor %}
		</div>
	</div>
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

{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
	$(".navbar-right li:contains('Candidates')").addClass('active');
});
</script>
{% endblock %}
