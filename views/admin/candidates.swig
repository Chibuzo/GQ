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

		<div class="">
			<form method="post" id="form-filter">
				<div class="form-group">
					<div class="col-md-4">
						<label>School</label>
						<input type="text" name="school" class="form-control" placeholder="Filter by school" />
					</div>
					<div class="col-md-3">
						<label>Profession</label>
						<input type="text" name="course" class="form-control" placeholder="Filter by Profession or course of study" />
					</div>
					<div class="col-md-3">
						<label>Certification</label>
						<input type="text" name="school" class="form-control" placeholder="Filter by Certification" />
					</div>
					<div class="col-md-2" style="padding-top: 30px">
						<button type="submit" class="btn btn-info btn-block"><i class="fa fa-search"></i> Filter Candidates</button>
					</div>
				</div>
			</form>
		</div>
		<div class="content table-responsive table-full-width">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Date</th>
						<th>Name</th>
						<th>Employment Status</th>
						<th>General</th>
						<th>Aptitude</th>
						<th>Maths</th>
						<th>Resume Status</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{% for user in candidates %}
						<tr>
							<td>{{ user.createdAt | date('d/m/Y') }}</td>
							<td>{{ user.fullname }}</td>
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
