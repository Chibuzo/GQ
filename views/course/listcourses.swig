{% extends '../theme.swig' %}
{% set title = 'Available Courses' %}
{% block body %}
<style>
	/*@media screen and (min-width: 1200px) and (max-width: 2000px) {*/
		/*.gq-container {*/
			/*width: 1320px;*/
			/*margin: auto;*/
		/*}*/

		/*.feature-row {*/
			/*margin-top: 250px;*/
		/*}*/
	/*}*/

	/*header {*/
		/*background: url('/images/course-feat.jpg') no-repeat;*/
		/*!*background-position: center center;*!*/
		/*background-size: cover;*/
		/*min-height: 600px;*/
	/*}*/

	/*header h1, header h4 {*/
		/*color: #fff;*/
	/*}*/


.courses {
	padding: 10px 50px;
}

/*.course {*/
	/*padding: 15px;*/
	/*line-height: 1.3;*/
	/*margin: 10px;*/
	/*border: #ccc solid thin;*/
	/*overflow: auto;*/
	/*height: 400px;*/
/*}*/
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

.info-thumb {
	/*padding-bottom: 13px;*/
	/*font-size: 14px;*/
	/*margin-bottom: 15px;*/
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

.course-menu {
	margin-top: 30px;
	padding-top: 10px;
	padding-bottom: 3px;
	border-top: #f0f0f0 solid thin;
}
</style>
{% block backgroud %}
	<div class="bg-img" style="background-image: url('/images/course-feat.jpg');">
		<div class="overlay"></div>
	</div>
{% endblock %}

<div class="home-wrapper">
	<div class="container">
		<div class="row">

			<!-- home content -->
			<div class="col-md-10 col-md-offset-1">
				<div class="home-content">
					<h2 class="white-text">There's always room for improvement</h2>
					<p class="white-text">All of our courses are online and self-paced. Explore our wide range of courses, designed for the modern workplace to you get an 'edge' in getting a job and excelling at it.</p>
					<a href="#courses" class="white-btn">Get Started</a>
				</div>
			</div>

		</div>
	</div>
</div>

</header>
<!-- /Header -->

<section id="courses">
	<div class="container">
		<div class="row" style="margin-top: 30px">
			<h2 class="text-center">Explore some of our courses</h2>
			<div class="col-md-12 courses">
				<div class="row">
					{% for course in courses %}
						{% set path = course.course_title.split(' ') %}
						<div class="col-md-4">
							<div class="about" id="{{ course.id }}">
								<div class="head-title">
									<h3><a href="/course/{{ course.id }}/{{ path | join('-') }}" class="course-title">{{ course.course_title }}</a></h3>
								</div>
								<div class="info-thumb">
									<ul class="info-thumb-ls hidden">
										<li><i class="fa fa-info-circle"></i> {{ course.category.category }} Category</li>
										<li><i class="fa fa-clock-o"></i> {{ course.duration }} Duration</li>
									</ul>
								</div>
								<div class="course-desc">{{ course.abstract }}</div>
								<div class="course-body hidden">{{ course.body }}</div>
								<div class="course-menu">
									<button class="btn btn-info pull-right more-course" data-toggle="modal" data-target="#moreCourseModal">More...</button>
									{#<button class="btn btn-info pull-right joinCourse" data-toggle="modal" data-target="#joinCourseModal">Take Course</button>#}
								</div>
							</div>
						</div>
					{% endfor %}
				</div>
			</div>
		</div>
	</div>
</section>

	{#<div class="modal fade in" id="joinCourseModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">#}
		{#<div class="modal-dialog">#}
			{#<div class="modal-content">#}
				{#<div class="modal-header">#}
					{#<button type="button" class="close" data-dismiss="modal" aria-hidden="true">#}
						{#×#}
					{#</button>#}
					{#<h4 class="modal-title" id="myModalLabel"></h4>#}
				{#</div>#}

				{#<div class="modal-body">#}
					{#<div class="alert alert-info hidden"></div>#}
					{#<p>This course hasn't yet started. However, you can subscribe so we keep you posted...</p>#}
				{#</div>#}
				{#<span id="course_id" class="hidden"></span>#}
				{#<div class="modal-footer">#}
					{#<button type="button" class="btn btn-default" data-dismiss="modal">#}
						{#<i class="fa fa-times"></i> Close#}
					{#</button>#}
					{#<button type="submit" class="btn btn-info" id="subscribe">#}
						{#<i class="fa fa-check-circle-o"></i> Subscribe#}
					{#</button>#}
				{#</div>#}
			{#</div>#}
		{#</div>#}
	{#</div>#}

	<div class="modal fade in" id="moreCourseModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						×
					</button>
					<h4 class="modal-title" id="myModalLabel"></h4>
				</div>

				<div class="modal-body">

				</div>
				<span id="course_id" class="hidden"></span>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times"></i> Close
					</button>
					<button type="submit" class="btn btn-info" id="subscribe">
						<i class="fa fa-check-circle-o"></i> Take Course
					</button>
					{#<button class="btn btn-info pull-right joinCourse" data-toggle="modal" data-target="#joinCourseModal">Take Course</button>#}
				</div>
			</div>
		</div>
	</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$(".navbar-right li:contains('Courses')").addClass('active');

//	$(".joinCourse").click(function() {
//		var course_id = $(this).parents('.course').attr('id');
//		var course_title = $(this).parents('.course').find('.course-title').text();
//		$(".modal-title").text(course_title);
//		$("#course_id").text(course_id);
//	});


	$("#subscribe").click(function() {
		//var $this = $(this);
		var course_id = $("#course_id").text();
		$.post('/course/subscribe', { 'course_id': course_id });
		var msg = "<div class='alert alert-info'> <p>This course hasn't started yet. Well let you know when the course begins.</p></div>";
		$("#moreCourseModal").find('.modal-body').html(msg);
	});

	$(".more-course").click(function() {
		var $parent = $(this).parents('.about');
		var course_id = $parent.attr('id');
		var title = $parent.find('.course-title').text();
		var body = $parent.find('.course-body').text();
		$("#moreCourseModal").find('#course_id').text(course_id);
		$("#moreCourseModal").find('.modal-title').html(title);
		$("#moreCourseModal").find('.modal-body').html(body);
	});
});
</script>