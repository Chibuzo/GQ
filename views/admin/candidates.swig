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
			<table class="table table-striped">
				<thead>
					<tr>
						<th><i class="fa fa-calendar"></i> Date</th>
						<th>Name</th>
						{#<th>Employment Status</th>#}
						<th class="text-center">General</th>
						<th class="text-center">Aptitude</th>
						<th class="text-center">Maths</th>
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
							<td class="text-center">{{ user.general_ability }}</td>
							<td class="text-center">{{ user.verbal }}</td>
							<td class="text-center">{{ user.maths }}</td>
							<td>{{ user.rank }}</td>
							<td class="text-center"><a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ user.proctor_id }}">{{ user.integrity_score }}</a></td>
							<td>{{ user.status }}</td>
							<td class="opt-icons text-center">
								<a href="/applicant/resume/{{ user.id }}" class="view-resume" rel="tooltip" title="View Resume"><i class="fa fa-newspaper-o fa-lg"></i> </a>
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
<script>
	$(document).ready(function() {
		$('.applicants').addClass('active');
	});
</script>
{% endblock %}
