{% extends 'layout.swig' %}
{% set title = 'Companies onboard' %}
{% block page_title %}
	<i class="pe-7s-network"></i> Companies
{% endblock %}

{% block body %}

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">Company Listings</h4>
					<p class="category">Active companies</p>
				</div>
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Date</th>
						<th style="width: 20%">Company/Organisation</th>
						<th>Sector</th>
						<th>Location</th>
						<th>Contact Person</th>
						<th>Contact email</th>
						<th>Contact Phone</th>
						<th>Jobs</th>
						<th class="hidden"></th>
					</tr>
					</thead>
					<tbody>
					{% for coy in companies %}
						<tr id="{{ coy.id }}">
							<td>{{ coy.createdAt | date('d M, Y') }}</td>
							<td>{{ coy.company_name }}</td>
							<td>{{ coy.sector }}</td>
							<td>{{ coy.country }}, {{ coy.r_state }} {{ coy.city }}</td>
							<td>{{ coy.contact_person }}</td>
							<td>{{ coy.contact_email }}</td>
							<td>{{ coy.contact_phone }}</td>
							<td><a href="/admin/coy-jobs/{{ coy.id }}">{{ coy.jobs }}</a></td>
							<td class="hidden">
								<a href="" class="btn btn-danger btn-sm btn-fill"><i class="fa fa-trash-o"></i> Delete</a>
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
	$('.companies').addClass('active');
});
</script>
{% endblock %}