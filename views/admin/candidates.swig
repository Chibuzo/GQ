{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
	<i class="pe-7s-users"></i> Candidates
{% endblock %}
{% block body %}
<style>
	.filter-div {
		/*margin-bottom: 25px*/
		overflow: auto;
	}

	.modal-dialog {
		width: 700px;
	}

	#audios, #photos, #profile-pic {
		margin-top: 20px;
	}

	#profile-pic .col-md-6 img {
		width: 100%;
	}

	#photos .col-md-6 img {
		width: 100%;
	}
</style>

<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">Candidates</h4>
				<p class="category">You can filter candidates</p>
			</div>
		</div>

		{% include 'includes/candidate-search-form.swig' %}
		<div class="content table-responsive table-full-width">
			<table class="table table-striped dataTable">
				<thead>
					<tr>
						<th><i class="fa fa-calendar"></i> Date</th>
						<th>Name</th>
						{#<th>Employment Status</th>#}
						<th>Gen. Score</th>
						<th>Gen. Proctor</th>
						<th>Verbal Score</th>
						<th>Verbal Proctor</th>
						<th>Math Score</th>
						<th>Math Proctor</th>
						<th>Total</th>
						<th>Rank</th>
						<th class="text-center">Invigilation</th>
						<th>Test Status</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{% for user in candidates %}
						<tr id="{{ user.id }}">
							<td>{{ user.test_date | date('d/m/Y') }}</td>
							<td>{{ user.fullname }}</td>
							{#<td>{{ user.employment_status }}</td>#}
							<td>{{ user.generalAbilityTest.score }}%</td>
							<td>
								<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.generalAbilityTest.proctorId }}">
									{{ user.generalAbilityTest.proctorScore }}%
								</a>
							</td>
							<td>{{ user.verbalTest.score }}%</td>
							<td>
								<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.verbalTest.proctorId }}">
									{{ user.verbalTest.proctorScore }}%
								</a>
							</td>
							<td>{{ user.mathsTest.score }}%</td>
							<td>
								<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.mathsTest.proctorId }}">
									{{ user.mathsTest.proctorScore }}%
								</a>
							</td>
							<td>{{ user.percentage }}%</td>
							<td>{{ user.rank }}</td>
							<td class="text-center">{{ user.integrity_score }}</td>
							<td>{{ user.status }}</td>
							<td class="opt-icons text-center">
								<a href="/applicant/resume-user/{{ user.id }}" class="view-resume" rel="tooltip" title="View Resume"><i class="fa fa-newspaper-o fa-lg"></i> </a>
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
	{% include 'includes/proctorModal.swig' %}
{% endblock %}

{% block scriptTag %}
<script src="/js/proctorBackend.js"></script>
<script src="/js/plugins/datatables.min.js"></script>
<script>
$(document).ready(function() {
	$('.applicants').addClass('active');


	$('.dataTable').DataTable({
		pageLength: 50,
		responsive: true,
//		"aoColumnDefs": [
//			{ 'bSortable': false, 'aTargets': [ 2, 3 ] }
//		]
	});
});
</script>
{% endblock %}
