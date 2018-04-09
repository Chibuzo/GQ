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
			<table class="table table-striped tablebordered">
				<thead>
				<tr>
					<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
					<th stle="width: 95%"><i class="fa fa-user"></i> Candidate</th>
					<th>Email</th>
					<th>Phone</th>
				</tr>
				</thead>
				<tbody id="tb-selected">
				{% for sel in selected_candidates %}
					<tr id="{{ sel.applicant.id }}">
						<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
						<td>{{ sel.applicant.fullname }}</td>
						<td>{{ sel.applicant.email }}</td>
						<td>{{ sel.applicant.phone }}</td>
						<td><a href="" class="btn btn-danger btn-xs btn-fill unselect-candidate" rel="tooltip" title="Remove Candidate"><i class="fa fa-times fa-lg"></i></a></td>
					</tr>
				{% endfor %}
				</tbody>
			</table>
		</div>
	</div>
</div>
{% endblock %}
