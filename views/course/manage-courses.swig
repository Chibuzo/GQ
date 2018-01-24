{% extends '../admin/layout.swig' %}
{% set title = 'Manage Courses' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Manage Courses
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/course/addnew" class="btn btn-danger btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add Course</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">All Courses</h4>
					<p class="category"></p>
				</div>
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped dataTable">
					<thead>
					<tr>
						<th style="width: 120px">Date Added</th>
						<th>Course Title</th>
						<th>Course Abstract</th>
						<th class="text-right">Subscriptions</th>
						<th>Status</th>
						<th style="width: 100px" class="text-center">Action</th>
					</tr>
					</thead>
					<tbody>
					{% set n = 0 %}
					{% for course in courses %}
						{% set subs = course.subscriptions.length %}
						<tr id="{{ course.id }}">
							<td>{{ course.createdAt | date('d M, Y') }}</td>
							<td>{{ course.course_title }}</td>
							<td>{{ course.abstract }}</td>
							<td class="text-right">{{ subs }}</td>
							<td>{{ course.status }}</td>
							<td class="opt-icons text-center">
								<a href="/course/editcourse/{{ course.id }}" class="edit-cours" rel="tooltip" title="Edit Course"><i class="fa fa-pencil fa-lg"></i></a>
								<a href="" class="del-course" rel="tooltip" title="Delete Course"><i class="fa fa-trash-o fa-lg"></i></a>
							</td>
						</tr>
					{% endfor %}
					</tbody>
				</table>
			</div>
		</div>
	</div>

{% endblock %}

{% block modals %}
{% endblock %}

{% block scriptTag %}
<script src="/js/plugins/datatables.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$(".courses").addClass('active');

	$(".del-course").click(function (e) {
		e.preventDefault();
		var $this = $(this);
		if (confirm("Are you sure you want to delete this job?")) {
			var id = $(this).parents('tr').attr('id');
			$.get('/course/remove', { id: id }, function(d) {
				if (d.status.trim() == 'success') {
					$this.parents('tr').fadeOut();
				}
			}, 'JSON');
		}
	});

	$('.dataTable').DataTable({
		pageLength: 25,
		responsive: true,
		"aoColumnDefs": [
			{ 'bSortable': false, 'aTargets': [ 2, 3 ] }
		]
	});
});
</script>
