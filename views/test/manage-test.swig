{% extends '../admin/layout.swig' %}
{% set title = 'manage Test' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Manage Test
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<button class="btn btn-danger btn-fill pull-right" data-toggle="modal" data-target="#testModal" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Assign Test</button>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">

			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped">
					<thead>
					<tr>
						<th><i class="fa fa-calendar"></i> Date</th>
						{#<th syle="width: 20%">Test Name</th>#}
						<th>Source</th>
						<th>Test Title</th>
						<th>Job Cateogry</th>
						<th>Job Level</th>
						<th style="width: 120px" class="hidden">No of Questions</th>
						<th style="with: 190px" class="text-right hidden">Pass Mark</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{% for test in jobtests %}
						<tr id="{{ test.id }}">
							<td>{{ test.createdAt | date('d M, Y') }}</td>
							{#<td>{{ test.test.test_name }}</td>#}
							<td>{{ test.test_source | upper }}</td>
							<td>{{ test.test_title }}</td>
							<td>{{ test.job_category }}</td>
							<td>{{ test.job_level }}</td>
							<td class="text-right hidden">{{ test.test.total_questions }}</td>
							<td class="text-right hidden">{{ test.test.pass_mark }}</td>
							<td class="opt-icons">
								<a href="" class="remove-test" rel="tooltip" title="Remove Test"><i class="fa fa-times fa-lg"></i> </a>
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
{% include 'includes/job-test-form.swig' %}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$("select[name=job_category]").change(function() {
		category = $("select[name=job_category] option:selected").text();
		$("input[name=category]").val(category);
	});

	$("input[name=test_source]").change(function() {
		if ($("input[name=test_source]:checked").val() == 'gq') {
			$("#exp-ctrl").addClass('hidden');
			$("#gq-ctrl").removeClass('hidden');
		} else {
			$("#exp-ctrl").removeClass('hidden');
			$("#gq-ctrl").addClass('hidden');
		}
	});


	$(".remove-test").click(function(e) {
		e.preventDefault();
		if (confirm("Are you sure you want to remove this test from this job?")) {
			var $parentTr = $(this).parents('tr');
			var id = $parentTr.attr('id');
			$.post('/jobtest/remove-job', { 'job_id': id }, function(d) {
				if (d.status.trim() == 'success') {
					$parentTr.fadeOut();
				}
			}, 'JSON');
		}
	});
});
</script>
{% endblock %}