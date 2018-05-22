{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
	<i class="pe-7s-users"></i> Candidates' Test Result
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

	.proctor-pic {
		position: relative;
	}

	.image-tag {
		position: absolute;
		left: 0;
		bottom: 0;
		color: white;
		font-size: 20px;
		margin-left: 5px;
		margin-bottom: 5px;
	}

    .trash-can {
        color: red;
        cursor: pointer;
    }

</style>

<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">Candidates' GQ Test Result</h4>
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
						<th class="text-center">Avg. Invigilation</th>
						<th>Test Status</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{% for user in candidates %}
						<tr id="{{ user.id }}">
							<td data-order="{{ user.test_date | date('Y/m/d') }}">{{ user.test_date | date('d/m/Y') }}</td>
							<td>
                                <a target="_blank" href="/applicant/resume-user/{{ user.id }}" class="view-resume" rel="tooltip" title="View Resume">
                                    {{ user.fullname }}
                                </a>
                            </td>
							{#<td>{{ user.employment_status }}</td>#}
							<td>{{ user.generalAbilityTest.score }}%</td>
							<td>
								{% if user.status == 'Pending' || user.status == 'Rejected' %}
									<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.generalAbilityTest.proctorId }}">
										{{ user.generalAbilityTest.proctorScore }}%
									</a>
								{% else %}
									{{ user.generalAbilityTest.proctorScore }}%
								{% endif %}
							</td>
							<td>{{ user.verbalTest.score }}%</td>
							<td>
								{% if user.status == 'Pending' || user.status == 'Rejected' %}
									<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.verbalTest.proctorId }}">
										{{ user.verbalTest.proctorScore }}%
									</a>
								{% else %}
									{{ user.verbalTest.proctorScore }}%
								{% endif %}
							</td>
							<td>{{ user.mathsTest.score }}%</td>
							<td>
								{% if user.status == 'Pending' || user.status == 'Rejected' %}
									<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.mathsTest.proctorId }}">
										{{ user.mathsTest.proctorScore }}%
									</a>
								{% else %}
									{{ user.mathsTest.proctorScore }}%
								{% endif %}
							</td>
							<td>{{ user.percentage }}%</td>
							<td>{{ user.rank }}</td>
							<td class="text-center">{{ user.integrity_score }}</td>
							<td>{{ user.status }}</td>
							<td data-user_name="{{ user.fullname }}" class="opt-icons text-center">
								<div class="btn-group">
									<button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Menu &nbsp;<span class="caret"></span>
									</button>
									<ul class="dropdown-menu dropdown-menu-right">
										<li><a href="" class="accept-test"><i class="fa fa-check-circle-o fa-fw"></i> Accept Test Score</a></li>
										<li><a href="" class="reject-test"><i class="fa fa-times fa-fw"></i>Reject Test Score</a></li>
										<li role="separator" class="divider"></li>
										<li><a href="" class="trash-can"><i class="fa fa-trash-o fa-fw"></i> Delete Test Scores</a></li>
									</ul>
								</div>
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
<script src="/js/proctorBackend.js?v=3"></script>
<script src="/js/plugins/datatables.min.js"></script>
<script>
$(document).ready(function() {
	$('.applicants').addClass('active');


	$('.dataTable').DataTable({
		pageLength: 50,
		responsive: true,
		"order": [[ 0, "desc" ]]
//		"aoColumnDefs": [
//			{ 'bSortable': false, 'aTargets': [ 2, 3 ] }
//		]
	});
});
</script>
{% endblock %}
