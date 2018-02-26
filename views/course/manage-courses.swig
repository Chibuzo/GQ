{% extends '../admin/layout.swig' %}
{% set title = 'Manage Courses' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Manage Courses
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/course/addnew" class="btn btn-success btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add Course</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">Manage Courses</h4>
					<p class="category"></p>
				</div>
			</div>
			<div class="content">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#course" data-toggle="tab">Courses</a></li>
					<li><a href="#category" data-toggle="tab">Course Categories</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active in fade" id="course">
						<div class="row">
							<div class="col-md-12 table-responsive table-full-width" style="padding: 50px; padding-top: 15px;">

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
					<div class="tab-pane in fade" id="category">
						<div class="">
							<form action="/courseCategory/save" method="post" id="form-category">
								<div class="form-group">
									<div class="col-md-4">
										<label>Category Title</label>
										<input type="text" name="category" class="form-control" placeholder="Category title..." />
									</div>
									<input type="hidden" name="category_id" />
									<div class="col-md-2" style="padding-top: 30px">
										<button type="submit" class="btn btn-info btn-block"><i class="fa fa-disk"></i> Save Category</button>
									</div>
								</div>
							</form>
						</div>
						<div class="row">
							<div class="col-md-12 table-responsive table-full-width" style="padding: 50px; padding-top: 15px;">
								<table class="table table-striped">
									<thead>
										<tr>
											<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
											<th>Category</th>
											<th>Courses</th>
											<th style="width: 120px" class="text-center">Action</th>
										</tr>
									</thead>
									<tbody>
										{% for cat in categories %}
											<tr id="{{ cat.id }}">
												<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
												<td>{{ cat.category }}</td>
												<td>{{ cat.courses.length }}</td>
												<td class="opt-icons text-center">
													<a href="" class="edit-category" rel="tooltip" title="Edit Category"><i class="fa fa-pencil fa-lg"></i>edit</a>
													<a href="" class="del-category" rel="tooltip" title="Delete Category"><i class="fa fa-trash-o fa-lg"></i> del</a>
												</td>
											</tr>
										{% endfor %}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
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
		if (confirm("Are you sure you want to delete this Course?")) {
			var id = $(this).parents('tr').attr('id');
			$.get('/course/delete/' + id, function(d) {}, 'JSON');
			$this.parents('tr').fadeOut();
		}
	});


	$('.edit-category').click(function(e) {
		e.preventDefault();
		var $tr = $(this).parents('tr');
		$("input[name=category]").val($tr.find('td:nth-child(2)').text());
		$("input[name=category_id]").val($tr.attr('id'));
	});


	$(".del-category").click(function (e) {
		e.preventDefault();
		var $this = $(this);
		if (confirm("Are you sure you want to delete this Category?")) {
			var id = $(this).parents('tr').attr('id');
			$.get('/courseCategory/delete/' + id, function(d) {
				if (d.status == 'error') {
					showNotification('top', 'right', 'danger', d.msg, 'pe-7s-bell');
				} else {
					showNotification('top', 'right', 'success', 'Category successfully deleted', 'pe-7s-bell');
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
