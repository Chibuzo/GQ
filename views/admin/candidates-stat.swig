{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
	<i class="pe-7s-users"></i> Candidate Statistics
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

	input[type=checkbox] {
		top: -15px;
	}

	input[type=checkbox].form-control {
		height: 12px;
	}

</style>

<div class="" style="margin-bottom: 20px; overflow: auto;">
	<div class="col-md-4">
		<a href="/admin/candidates/all" class="btn btn-lg btn-default">All Applicants: {{ statistics.applicants }}</a>
	</div>
	<div class="col-md-4">
		<a href="/admin/candidates/inactive" class="btn btn-lg btn-danger">Inactive Applicants: {{ statistics.inactive }}</a>
	</div>
	<div class="col-md-4">
		<a href="/admin/candidates/incomplete" class="btn btn-lg btn-danger">Incomplete Profile: {{ statistics.incomplete }}</a>
	</div>
</div>


<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">{{ filter | capitalize }} Candidates</h4>
				<p class="category">You can filter candidates</p>
			</div>
		</div>

		<div class="content table-responsive table-full-width">
			<table class="table table-striped dataTable">
				<thead>
					<tr>
						<th style="width:10px"><label class=" group-check"><input type="checkbox" class="form-control" datatoggle="checkbox" /></label></th>
						<th><i class="fa fa-calendar"></i> Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{% for user in all_applicant %}
						<tr id="{{ user.id }}">
							<td style="width: 10px"><label class=""><input type="checkbox" class="form-control user-checkbox" datatoggle="checkbox" /></label></td>
							<td>{{ user.createdAt | date('d.m.Y') }}</td>
							<td class="name">{{ user.fullname }}</td>
							<td class="email">{{ user.email }}</td>
							<td>{{ user.phone }}</td>
							<td></td>
						</tr>
					{% endfor %}
				</tbody>
				<tfoot>
					<tr><td class="">
							<div class="btn-group">
								<button type="button" class="btn btn-success btn-fill dropdown-toggle" id="action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
									Action &nbsp;<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="#emailModal" data-toggle="modal"><i class="fa fa-envelope"></i> &nbsp;Send Email</a></li>
								</ul>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</div>
{% endblock %}

{% block modals %}
	{% include '../misc/email-modal.swig' %}
{% endblock %}

{% block scriptTag %}
<script src="/js/plugins/datatables.min.js"></script>
<script>
$(document).ready(function() {
	$('.candidate-filter').addClass('active');


	$('.dataTable').DataTable({
		pageLength: 50,
		responsive: true,
		"aoColumnDefs": [
			{ 'bSortable': false, 'aTargets': [ 0, 3, 4, 5 ] }
		],
		"columnDefs": [
			{ "width": "590px", "targets": 0 }
		]
	});


	$(".group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			$(".user-checkbox").prop('checked', true).parent('label').addClass('checked');
		} else {
			$(".user-checkbox").prop('checked', false).parent('label').removeClass('checked');
		}
		controlActionBtn();
	});


	$(".user-checkbox").click(function() {
		controlActionBtn();
	});


	$("#form-email").submit(function(e) {
		e.preventDefault();

		$(this).find('button[type-submit]').html("<i class=fa fa-cog fa-spin></i> Sending...").prop('disabled', true);
		users = [];
		$(".user-checkbox:checked").each(function() {
			users.push($(this).parents('tr').find('td.email').text());
				//fullname: $(this).parents('tr').find('td.name').text()
		});

		$.post('/admin/sendemail', $(this).serialize() + '&users=' + users, function(d) {
			if (d.status.trim() == 'success') {
				$(".alert-success").removeClass('hidden');
				$(this).find('button[type-submit]').html("<i class=fa fa-envelope></i> Send Email").prop('disabled', false);
			}
		});
	});
});

function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$("#action-btn").prop("disabled", false);
	} else {
		$("#action-btn").prop("disabled", true);
	}
}
</script>
{% endblock %}
