{% extends 'theme.swig' %}
{% set title = 'Welcome to GQ' %}
{% block body %}
<style>
@media screen and (min-width: 1200px) and (max-width: 2000px) {
	.gq-container {
		width: 1320px;
		margin: auto;
	}

	.feature-row {
		margin-top: 190px;
	}
}

header {
	background: url('/images/feat_img.jpg') no-repeat;
	/*background-position: center center;*/
	background-size: cover;
	min-height: 600px;
}

header h1, header h4 {
	color: #2D51A3;
}

.white {
	color: #fff;
}

.gold {
	color: #A37F2D;
}

#about {
	background: #f0f0f0;
	padding: 40px 20px;
	font-size: 17px;
	font-weight: 100;
	line-height: 25px;
	text-align: center;
}

#service {
	padding: 50px 10px;
	text-align: center;
}

#service h3 {
	margin-top: 8px;
	margin-bottom: 20px;
	font-size: 25px;
	font-weight: 400;
	color: #3c3c3c;
}

#service .fa {
	font-size: 31px;
	color: #A37F2D;
	border: #A37F2D solid;
	padding: 22px;
	width: 80px;
	height: 78px;
	border-radius: 50%;
	margin-bottom: 15px;
}

#services .fa {
	font-size: 36px;
}

#service p {
	padding: 10px;
	font-size: 16px;
	line-height: 25px;
	margin: 1px 5px;
	font-weight: 100;
}

#misc {
	padding: 50px 10px;
}

.misc-div {
	min-height: 350px;
}

.misc-div p {
	font-size: 17px;
	font-weight: 400;
	padding: 10px;

}

#misc .inner {
	height: 320px;
}

#misc .inner-left {
	margin-right: 12px;
}

#misc .inner-right {
	margin-left: 12px
}

#support {
	padding: 50px 10px;
}

.courses {
	padding: 10px 50px;
}

.course {
	padding: 15px;
	line-height: 1.3;
	margin: 10px;
	border: #ccc solid thin;
	overflow: auto;
	height: 400px;
}

.course h3 {
	margin-top: 5px;
	margin-bottom: 10px;
	color: #A37F2D;
}

.course h3 a:link {
	color: #A37F2D;
}

.course-desc {
	clear: both;
}
</style>
<!-- Banner -->
<header>
	<nav class="navbar navbardefault main-nav">
		<div class="gq-container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbarbrand" href="#"><img src="/images/logo.png" id="logo"/></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a href="/">Home <span class="sr-only">Home</span></a></li>
					<li><a href="/jobs">Jobs</a></li>
					<li><a href="/courses">Courses</a></li>
					<li><a href="/login">Login</a></li>
					<li><a href class="btn btn-default">Sign Up</a> </li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="feature-row">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 text-center">
					<h1>Getting hired can be very straightforward. <br>Get Qualified first.</h1>
					<a href="/signup" class="btn btn-lg btn-primary">Get Started</a>
				</div>
			</div>
		</div>
	</div>
</header>

<section id="about">
	<div class="container">
		<div class="row">
			<div class="col-md-8  col-md-offset-2">
				Getting hired is not a random process. Skip the line, get qualified for top jobs that fit your personality and qualification in a very systematic and defined way.
			</div>
		</div>
	</div>
</section>

<section id="service">
	<div class="container">
		<div class="row" style="margin-bottom: 25px">
			<div class="col-md-12">
				Tired of applying for lots of jobs with little success? Build your professional profile. Get ranked against other applicants based on your assessment scores. Apply to top jobs recommended to fit your profile or have employers find and approach you for relevant jobs.
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<div class="service-div">
					<i class="fa fa-certificate"></i>
					<h3>Personalised Career Guidance</h3>
					<p>Create a digital CV and video profile. Complete our standard tests and find out where you rank vs other candidates. Receive personalised advice on career options to optimise your chances of getting hired</p>
				</div>
			</div>

			<div class="col-md-4">
				<div class="service-div">
					<i class="fa fa-briefcase"></i>
					<h3>Continuing Professional Development</h3>
					<p>Companies are looking for pre-vetted candidates. Enhance your profile and work readiness by undergoing additional work related and soft skills training on our platform. Get certified for each course you successfully complete	</p>
				</div>
			</div>

			<div class="col-md-4">
				<div class="service-div">
					<i class="fa fa-thumbs-o-up"></i>
					<h3>Discover new job opportunities</h3>
					<p>Let jobs find you. Get notified of relevant job opportunities and apply directly or get approached by companies who have seen your video profile and ranking					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="misc">
	<div class="container">
		<div class="row">
			<div class="col-md-6 misc-div">
				<div class="inner inner-left" style="background: url('/images/we_train.jpg') no-repeat; background-size: cover">

				</div>
			</div>
			<div class="col-md-6 misc-div">
				<div class="inner inner-right" style="background: url('/images/we_test.jpg') no-repeat; background-size: cover">

				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="inner-left">
					<h4>Why Get Qualified?</h4>
					<p>We seek to help you all the way. Find the right opportunities and get the jobs that best match your profile. We’ve designed our system with you at the centre so that you get multiple chances and be appropriately matched.</p>
				</div>
			</div>
			<div class="col-md-6">
				<div class="inner-right">
					<h4>[Take Test] See how you rank</h4>
					<p>We have courses to help you get ready for your dream job. Get re-ranked for relevant jobs with each successful course completed.</p>
				</div>
			</div>
		</div>
	</div>
</section>


<section id="courses">
	<div class="container-fluid">
		<div class="row" style="margin-top: 30px">
			<div class="col-md-12 courses">
				<div class="row">
					{% for course in courses %}
						{% set path = course.course_title.split(' ') %}
						<div class="col-md-3">
							<div class="course" id="{{ course.id }}">
								<h3><a href="/course/{{ course.id }}/{{ path | join('-') }}" class="course-title">{{ course.course_title }}</a></h3>
								<div class="info-thumb">
									<ul class="info-thumb-ls hidden">
										<li><i class="fa fa-info-circle"></i> {{ course.category.category }} Category</li>
										<li><i class="fa fa-clock-o"></i> {{ course.duration }} Duration</li>
									</ul>
								</div>
								<div class="course-desc">{{ course.abstract }}</div>
								<div class="course-menu">
									<button class="btn btn-default pull-right joinCourse" data-toggle="modal" data-target="#joinCourseModal">Take Course</button>
								</div>
							</div>
						</div>
					{% endfor %}
				</div>
			</div>
		</div>
	</div>
</section>

{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
	$(document).ready(function() {

	});
</script>
{% endblock %}