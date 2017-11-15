{% extends '../theme.swig' %}
{% set title = 'Available Courses' %}
{% block body %}
<style>
select.input-lg {
	line-height: 19px;
}

.jobs {
	padding: 10px 50px;
}

.job {
	padding: 15px;
	line-height: 1.3;
}

.job-desc {
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
</style>
<div class="clearfix container" style="margin-top: 100px">
	<div class="row">
		<div class="col-md-12"><h1>Available Courses</h1></div>
		<div class="col-md-12 hidden">
			<form action="" method="get">
				<div class="col-md-5">
					<div class="form-group">
						<input type="text" class="form-control input-lg" placeholder="Use a keyword, company or skill" />
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="text" class="form-control input-lg" placeholder="Sector" />
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<select class="form-control input-lg" name="job_level">
							<option value="">Job Level</option>
							<option value="Entry">Entry Level</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Professional">Professional</option>
						</select>
					</div>
				</div>
				<div class="col-md-2">
					<button class="btn btn-default btn-block btn-lg"><i class="fa fa-search"></i> Search</button>
				</div>
			</form>
		</div>
	</div>
	<div class="row" style="margin-top: 30px">
		<div class="col-md-9 jobs">
			<div class="row">
				{% for course in courses %}
					{#{% set path = job.job_title.split(' ') %}#}
					<div class="col-md-4">
						<div class="job" id="{{ course.id }}">
							<h3><a href="/course/{{ course.id }}/{{ path | join('-') }}">{{ course.course_title }}</a></h3>
							<div class="info-thumb">
								<ul class="info-thumb-ls">
									<li><i class="fa fa-info-circle"></i> {{ course.category.category }} Category</li>
									<li><i class="fa fa-clock-o"></i> {{ course.duration }} Duration</li>
								</ul>
							</div>
							<div class="job-desc">{{ course.abstract }}</div>
							<div class="course-menu">
								<button class="btn btn-sm btn-danger pull-right joinCourse" data-toggle="modal" data-target="#joinCourseModal">Join Course</button>
							</div>
						</div>
					</div>
				{% endfor %}
			</div>
		</div>

		<div class="col-md-3">
			Options
		</div>
	</div>
</div>

	<div class="modal fade in" id="joinCourseModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						×
					</button>
					<h4 class="modal-title" id="myModalLabel">Course Title</h4>
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
		var course_id = $(this).parents('.job').attr('id');
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