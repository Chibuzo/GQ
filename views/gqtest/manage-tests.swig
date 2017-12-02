{% extends '../admin/layout.swig' %}
{% set title = 'Manage Test' %}
{% block page_title %}
	<i class="pe-7s-edit"></i> Manage Tests
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/gqtest/createnew" class="btn btn-danger btn-fill pull-right btnsm" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Create New Test</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">All Tests</h4>
					<p class="category"></p>
				</div>
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped tablebordered">
					<thead>
					<tr>
						<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
						<th>Date Added</th>
						<th>Test Name</th>
						<th>Category</th>
						<th>Duration</th>
						<th>Questions</th>
						<th>Status</th>
						<th class="text-center">Action</th>
					</tr>
					</thead>
					<tbody>
					{% set n = 0 %}
					{% for test in tests %}
						{% set no_of_quests = test.questions.length %}
						<tr id="{{ test.id }}">
							<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
							<td>{{ test.createdAt | date('d M, Y') }}</td>
							<td>{{ test.test_name }}</td>
							<td>{{ test.category }}</td>
							<td>{{ test.duration }}</td>
							<td>{{ no_of_quests }}</td>
							<td>{{ test.status }}</td>
							<td class="opt-icons text-center">
								<a href="/gqtest/edittest/{{ test.id }}" class="edit-test" rel="tooltip" title="Edit Test"><i class="fa fa-pencil fa-lg"></i></a>
								<a href="/gqtest/viewresults/{{ test.id }}" rel="tooltip" title="View Test Results"><i class="fa fa-eye fa-lg"></i></a>
								<a href="" class="del-test" rel="tooltip" title="Delete test"><i class="fa fa-trash-o fa-lg"></i></a>
							</td>
						</tr>
					{% endfor %}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<form action="/gqtest/upload-questions" method="post" id="form-excel" enctype="multipart/form-data">
		<input type="hidden" name="test_id" id="test_id" />
		<input type="file" name="excel" id="excel" class="hidden" />
	</form>
{% endblock %}

{% block modals %}
{#{% include "includes/test-form.swig" %}#}
{#{% include "includes/manage-test-modal.swig" %}#}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {

	$(".del-test").click(function (e) {
		e.preventDefault();
		var $this = $(this);
		if (confirm("Are you sure you want to delete this test?")) {
			var id = $(this).parents('tr').attr('id');
			$.get('/gqtest/remove', { id: id }, function(d) {
				if (d.status.trim() == 'success') {
					$this.parents('tr').fadeOut();
				}
			}, 'JSON');
		}
	});
});
</script>
