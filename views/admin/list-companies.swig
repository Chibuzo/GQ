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
				<table class="table table-striped dataTable">
					<thead>
					<tr>
						<th style="width: 100px">Date Joined</th>
						<th style="width: 20%">Company/Organisation</th>
						<th class="hidden">Sector</th>
						<th>Location</th>
						<th>Contact Person</th>
						<th>Contact email</th>
						<th>Contact Phone</th>
						<th>Open Jobs</th>
						<th>Closed</th>	
						<th>Archive</th>					
						<th class=""></th>
					</tr>
					</thead>
					<tbody>
					{% for coy in companies %}
						<tr id="{{ coy.id }}">
							<td data-sort="{{ coy.createdAt | date('Y/m/d') }}">{{ coy.createdAt | date('d.m.Y') }}</td>
							<td><a href="/companyprofile/{{ coy.id }}" target="_blank">{{ coy.company_name }}</a></td>
							<td class="hidden">{{ coy.sector }}</td>
							<td>{{ coy.r_state }}</td>
							<td>{{ coy.contact_person }}</td>
							<td>{{ coy.contact_email }}</td>
							<td>{{ coy.contact_phone }}</td>
							<td class="text-center"><a href="/admin/coy-jobs/{{ coy.id }}/open">{{ coy.open_jobs }}</a></td>
							<td class="text-center"><a href="/admin/coy-jobs/{{ coy.id }}/closed">{{ coy.closed_jobs }}</a></td>
							<td class="text-center"><a href="/admin/coy-jobs/{{ coy.id }}/archived">{{ coy.archived_jobs }}</a></td>							
							<td class="text-right">
								<a href="" class="btn btn-danger btn-xs btn-fill delete-company" rel="tooltip" title="Delete Company"><i class="fa fa-trash-o"></i></a>
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
<script src="/js/plugins/datatables.min.js"></script>
<script>
$(document).ready(function() {
	$('.companies').addClass('active');

    $(".dataTable").DataTable({
        pageLength: 30,
        responsive: true,
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [ 2, 3, 4, 5, 6, 10 ] }
        ]
    });

	$(".delete-company").click(function(e) {
		e.preventDefault();
		if (confirm("This action will remove the seleted company, remove all the jobs added by and for this company. Are you sure you want to proceed?")) {
			let $parentTr = $(this).parents('tr');
			let coy_id = $parentTr.attr('id');
			$.post('/company/delete', { coy_id: coy_id }, function(d) {
				if (d.status.trim() === 'success') {
					$parentTr.fadeOut();
				}
			}, 'JSON');
		}
	});
});
</script>
{% endblock %}