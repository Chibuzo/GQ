{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
	<i class="pe-7s-users"></i> Candidates
{% endblock %}
{% block body %}

<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">Candidates</h4>
				<p class="category">You can filter candidates</p>
			</div>
		</div>
		<div class="content table-responsive table-full-width">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Employment Status</th>
						<th>Resume Status</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{% for user in candidates %}
						<tr>
							<td>{{ user.createdAt | date('d/m/Y') }}</td>
							<td>{{ user.fullname }}</td>
							<td>{{ user.email }}</td>
							<td>{{ user.phone }}</td>
							<td>{{ user.employment_status }}</td>
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

{% block scriptTag %}
<script>
	$(document).ready(function() {
		$('.applicants').addClass('active');
	});
</script>
{% endblock %}
