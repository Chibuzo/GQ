{% extends 'layout.swig' %}
{% set title = 'Pending Request' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Pending Requests
{% endblock %}

{% block body %}

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				{% if status == 'review'%}
					<div class="col-md-6">
						<h4 class="title">Pending Single</h4>
						<p class="category">Awaiting Review/Verification</p>
					</div>
					<div class="col-md-5 pull-right hidden"><br>
						<a href="/company/" class="btn btn-danger btn-fill pull-right btn-sm">Approved</a>
					</div>
				{% else %}
					{% set ele_opts = 'hidden' %}
					<div class="col-md-6">
						<h4 class="title">Unverified Companies</h4>
						<p class="category">Can not be edited</p>
					</div>
					<div class="col-md-5 pull-right hidden"><br>
						<a href="/company-request/view-requests" class="btn btn-danger btn-fill pull-right btn-sm">Pending</a>
					</div>
				{% endif %}
			</div>
			<div class="content table-responsive table-full-width">
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Date</th>
						<th style="width: 20%">Company/Organisation</th>
						<th style="width: 20%">Contact Person</th>
						<th style="width: 23%">Contact email</th>
						<th style="with: 190px">Contact Phone</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{% for coy in requests %}
						<tr id="{{ coy.id }}">
							<td>{{ coy.createdAt | date('d M, Y') }}</td>
							<td>{{ coy.company_name }}</td>
							<td>{{ coy.contact_person }}</td>
							<td>{{ coy.contact_email }}</td>
							<td>{{ coy.contact_phone }}</td>
							<td>
								<a href="" class="btn btn-success btn-sm btn-fill approve-company"><i class="fa fa-check-square-o"></i> Approve</a>
								<a href="" class="btn btn-danger btn-sm btn-fill delete-request"><i class="fa fa-trash-o"></i> Delete</a>
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
<script type="text/javascript">
$(document).ready(function() {
	$(".request").addClass('active');

	$(".approve-company").click(function(e) {
		e.preventDefault();

		if (confirm("Are you sure you want to do this?")) {
			var $parentTr = $(this).parents('tr');
			var coy_id = $parentTr.attr('id');
			$.post('/company-request/approve', {id: coy_id}, function (d) {
				if (d.status.trim() == 'success') {
					$parentTr.fadeOut();
				}
			}, 'JSON');
		}
	});

	// delete company request
	$(".delete-request").click(function(e) {
		e.preventDefault();
		if (confirm("Are you sure you want to cancel this request?")) {
			var $parentTr = $(this).parents('tr');
			var coy_id = $parentTr.attr('id');
			$.get('/company-request/reject', {id: coy_id}, function (d) {
				if (d.status.trim() == 'success') {
					$parentTr.fadeOut();
				}
			}, 'JSON');
		}
	});
});
</script>
{% endblock %}