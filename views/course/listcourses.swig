{% extends '../theme.swig' %}
{% set title = 'Available Courses' %}
{% block body %}
<style>
	@media screen and (min-width: 1200px) and (max-width: 2000px) {
		.gq-container {
			width: 1320px;
			margin: auto;
		}

		.feature-row {
			margin-top: 250px;
		}
	}

	header {
		background: url('/images/course-feat.jpg') no-repeat;
		/*background-position: center center;*/
		background-size: cover;
		min-height: 600px;
	}

	header h1, header h4 {
		color: #fff;
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

.info-thumb {
	padding-bottom: 13px;
	font-size: 14px;
	margin-bottom: 15px;
}

.info-thumb-ls {
	list-style-type: none;
	padding-left: 0;
	margin-left: -7px;
}

.info-thumb-ls .fa {
	margin-right: 4px;
}

.info-thumb-ls li {
	float: left;
	margin-right: 15px;
}

#courses {
	padding: 50px;
}
</style>

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
					<li><a href="#">About</a></li>
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
					<h1>There's always room for improvement</h1>
					<h4>Make yourself standout by taking some courses</h4>
					<a href="#requestModal" data-toggle="modal" class="btn btn-lg btn-default">Get Started</a>
				</div>
			</div>
		</div>
	</div>
</header>

<section id="courses">
	<div class="container-fluid">
		<div class="row" style="margin-top: 30px">
			<div class="col-md-12 courses">
				<div class="row">
					{% for course in courses %}
						{#{% set path = job.job_title.split(' ') %}#}
						<div class="col-md-4">
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

	<div class="modal fade in" id="joinCourseModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						×
					</button>
					<h4 class="modal-title" id="myModalLabel">;l;l;l;l;ll</h4>
				</div>

				<div class="modal-body">
					<div class="alert alert-info hidden"></div>
					<p>This course hasn't yet started. However, you can subscribe so we keep you posted...</p>
				</div>
				<span id="course_id" class="hidden"></span>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times"></i> Cancel
					</button>
					<button type="submit" class="btn btn-info" id="subscribe">
						<i class="fa fa-check-circle-o"></i> Subscribe
					</button>
				</div>
			</div>
		</div>
	</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$(".joinCourse").click(function() {
		var course_id = $(this).parents('.course').attr('id');
		var course_title = $(this).parents('.course').find('.course-title').text();
		$(".modal-title").text(course_title);
		$("#course_id").text(course_id);
	});


	$("#subscribe").click(function() {
		//var $this = $(this);
		var course_id = $("#course_id").text();
		$.post('/course/subscribe', { 'course_id': course_id });
		$(".alert-info").text("We'll let you know when the course begins").removeClass('hidden');
	});
});
</script>