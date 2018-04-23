{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Shortlisted Candidates
{% endblock %}

{% block body %}
<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">Shortlisted Candidates</h4>
				<p class="category">The best candidates that applied</p>
			</div>
		</div>
		<div class="content">
			{% include '../admin/includes/shortlist-view.swig' %}
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
{#<script src="/js/plugins/datatables.min.js"></script>#}
<script>
$(document).ready(function() {
	$('.candidate-filter').addClass('active');


//	var dTable = $('.dataTable').DataTable({
//		pageLength: 50,
//		responsive: true,
//		"aoColumnDefs": [
//			{'bSortable': false, 'aTargets': [0, 3, 4, 5]}
//		],
//		"columnDefs": [
//			{"width": "590px", "targets": 0}
//		]
//	});


	$(".group-check").click(function () {
		if ($(this).is(":checked")) {
			$(".user-checkbox").prop('checked', true);//.parent().removeClass("checked");
		} else {
			$(".user-checkbox").prop('checked', false);//.parent().addClass("checked");
		}
		controlActionBtn();
	});


	$("#tb-users").on('click', ".user-checkbox", function () {
		controlActionBtn();
	});


	$(".action-btn").click(function() {
		if (confirm("Are you sure you want to accept these candidates?")) {
			var users = [];
			$(".user-checkbox:checked").each(function () {
				users.push($(this).parents('tr').data('candidate_id'));
			});
			var job_id = {{ job_id | json | safe }};
			$.post('/selectedCandidates/accept', {users: users, job_id: job_id}, function () {
				location.reload(true);
			});
		}
	});
});


function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$(".action-btn").prop("disabled", false);
	} else {
		$(".action-btn").prop("disabled", true);
	}
}
</script>
{% endblock %}
