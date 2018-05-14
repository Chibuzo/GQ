{% extends '../admin/layout.swig' %}
{% set title = 'View Test Results' %}
{% block page_title %}
	<i class="pe-7s-edit"></i>{{ test.test_name }} Tests
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="/admin/gq-test" class="btn btn-danger btn-fill pull-right" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-caret-left"></i> Back to Test</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">Test Result</h4>
					<p class="category"></p>
				</div>
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped tablebordered">
					<thead>
						<tr>
							<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
							<th>Test Date</th>
							<th><i class="fa fa-user"></i> Candidate</th>
							<th class="text-center">Score</th>
							<th class="text-center">Percentage</th>
							{#<th class="text-center">Average Score</th>#}
							<th>Result</th>
							<th class="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
					{% set n = 0 %}
					{% for result in results %}
						{#{% set applications = job.applications.length %}#}
						<tr id="{{ result.candidate.id }}">
							<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
							<td>{{ result.test_date | date('d M, Y') }}</td>
							<td>{{ result.candidate.fullname }}</td>
							<td class="text-center">{{ result.score }}</td>
							<td class="text-center">{{ result.percentage }}%</td>
							{#<td class="text-center">{{ result.average_score }}</td>#}
							<td>{{ result.result }}</td>
							<td class="opt-icons text-center">
								<a href="" rel="tooltip" title="View Resume"><i class="fa fa-list-alt fa-lg"></i> </a>
								<a href="#videoModal" data-toggle="modal" class="view-tests watch-video" rel="tooltip" title="Watch Video"><i class="fa fa-video-camera fa-lg"></i></a>
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

	$("#csv").change(function() {
		$("#form-csv").submit();
	});


	$(".view-tests").click(function() {
		var test_title = $(this).parents('tr').find('td:nth-child(3)').text();
		var test_category = $(this).parents('tr').find('td:nth-child(4)').text();
		var test_level = $(this).parents('tr').find('td:nth-child(5)').text();
		$("#manageTestModal").find('.modal-title').text(test_title);
		$.get('/gettestTest/' + test_category + '/' + test_level, function(d) {
			if (d.status.trim() == 'success') {
				var test_html = '';
				if (d.test.length < 1) {
					$("#manageTestModal .modal-body").find('.alert-info').removeClass('hidden');
					$("#tb-tests").html('');
					return;
				}
				d.test.forEach(function(test) {
					test_html += "<tr>" +
							"<td>" + test.test_title + "</td>" +
							"<td>" + test.test_category + "</td>" +
							"<td>" + test.test.total_questions + "</td>" +
							"<td>" + test.test.duration + "</td>" +
							"</tr>";
				});
				$("#manageTestModal").find(".modal-body").find('.alert-info').addClass('hidden');
				$("#tb-tests").html(test_html);
			}
		}, 'JSON');
	});


	$(".del-test").click(function (e) {
		e.preventDefault();
		var $this = $(this);
		if (confirm("Are you sure you want to delete this test?")) {
			var id = $(this).parents('tr').attr('id');
			$.get('/test/remove', { id: id }, function(d) {
				if (d.status.trim() == 'success') {
					$this.parents('tr').fadeOut();
				}
			}, 'JSON');
		}
	});
});
</script>
