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

	.controls .btn {
		width: 100%;
		margin-bottom: 5px;
	}

	.funnel-item {
		height: 165px;
	}

</style>

<div class="row">
	<div class="controls col-xs-12" style="overflow: auto; margin-bottom: 20px;">

		<div class="row">
				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Applicants </p>
					<a href="/admin/candidates/all" class="btn btnlg btn-info btn-fill">All : {{ statistics.applicants }}</a>
					<a href="/admin/candidates/active" class="btn btnlg btn-info btn-fill">Active: {{ statistics.active }}</a>
					<a href="/admin/candidates/inactive" class="btn btnlg btn-info btn-fill">Inactive: {{ statistics.inactive }}</a>
				</div>
				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Resumes </p>
					<a href="/admin/candidates/complete" class="btn btnlg btn-info btn-fill">Complete: {{ statistics.complete }}</a>
					<a href="/admin/candidates/incomplete" class="btn btnlg btn-info btn-fill">Incomplete: {{ statistics.incomplete }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Photos </p>
					<a href="/admin/candidates/nophotos" class="btn btnlg btn-info btn-fill">No Photo: {{ statistics.nophotos }}</a>
					<a href="/admin/candidates/photos" class="btn btnlg btn-info btn-fill">Photo: {{ statistics.photos }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Videos </p>
					<a href="/admin/candidates/novideos" class="btn btnlg btn-info btn-fill">No Videos: {{ statistics.novideos }}</a>
					<a href="/admin/candidates/videos" class="btn btnlg btn-info btn-fill">Videos: {{ statistics.videos }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Test </p>
					<a href="/admin/candidates/notests" class="btn btnlg btn-info btn-fill">No Tests: {{ statistics.notests }}</a>
					<a href="/admin/candidates/sometests" class="btn btnlg btn-info btn-fill">In Progress: {{ statistics.sometests }}</a>
					<a href="/admin/candidates/tests" class="btn btnlg btn-info btn-fill">Completed: {{ statistics.tests }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Job Applications </p>
					<a href="/admin/candidates/nojobs" class="btn btnlg btn-info btn-fill">No Applications: {{ statistics.nojobs }}</a>
					<a href="/admin/candidates/jobs" class="btn btnlg btn-info btn-fill">With Applications: {{ statistics.jobs }}</a>
				</div>
		</div>
	</div>
</div>

</div>

<div class="row">
	<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">{{ filter | capitalize }} Candidates</h4>
				<p class="category">{{ info }}</p>
			</div>
		</div>

		<div class="content table-responsive table-full-width">
			<table class="table table-striped dataTable">
				<thead>
				<tr>
					<td class="">
						<div class="btn-group">
							<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
								Action &nbsp;<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a href="#emailModal" data-toggle="modal"><i class="fa fa-envelope fa-fw"></i> &nbsp;Send Email</a></li>
								<li><a href="" class="delete-candidates"><i class="fa fa-trash-o fa-fw"></i> &nbsp;Remove Applicant(s)</a></li>
							</ul>
						</div>
					</td>
				</tr>
					<tr>
						<th style="width:10px"><label class=" group-check" rel="tooltip" title="Note that this will check/uncheck for all the records on the pages"><input type="checkbox" class="form-control" datatoggle="checkbox" /></label></th>
						<th><i class="fa fa-calendar"></i> Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody id="tb-users">
					{% for user in users %}
					{% if resume == true %}
						{% set user_id = user.user %}
						<tr id="{{ user.user }}">
					{% else %}
						{% set user_id = user.id %}
						<tr id="{{ user.id }}">
					{% endif %}
							<td style="width: 10px"><label class=""><input type="checkbox" class="form-control user-checkbox" datatoggle="checkbox" /></label></td>
							<td data-order="{{ user.createdAt | date('Y/m/d') }}">{{ user.createdAt | date('d.m.Y') }}</td>
							{% if resume == true %}
								<td class="name">
									<a href='/applicant/resume-user/{{user.user}}' target="_blank">{{ user.fullname }} </a>
								</td>
							{% else %}
								<td class="name">{{ user.fullname }}</td>
							{% endif %}
							<td class="email">{{ user.email }}</td>
							<td>{{ user.phone }}</td>
							<td class="text-center">
								<div class="btn-group">
									<button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Menu &nbsp;<span class="caret"></span>
									</button>
									<ul class="dropdown-menu dropdown-menu-right">
										<li><a href="/editprofile/{{ user_id }}" target="_blank"><i class="fa fa-wrench"></i> Edit Profile</a></li>
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


	var dTable = $('.dataTable').DataTable({
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
			dTable.$(".user-checkbox").prop('checked', true);
		} else {
			dTable.$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn();
	});


	$("#tb-users").on('click', ".user-checkbox", function() {
		controlActionBtn();
	});


	$("#form-email").submit(function(e) {
		e.preventDefault();

		$(this).find('button[type-submit]').html("<i class=fa fa-cog fa-spin></i> Sending...").prop('disabled', true);
		var users = [];
		$(".user-checkbox:checked").each(function() {
			users.push($(this).parents('tr').find('td.email').text());
		});

//		for ( instance in tinymce.instances ) {
//			tinymce.instances[instance].updateElement();
//		}
		tinymce.triggerSave();

		$.post('/admin/sendemail', $(this).serialize() + '&users=' + users, function(d) {
			if (d.status.trim() == 'success') {
				$(".alert-success").removeClass('hidden');
				$(this).find('button[type-submit]').html("<i class=fa fa-envelope></i> Send Email").prop('disabled', false);
			}
		}, 'JSON');
	});


	$(".delete-candidates").click(function(e) {
		e.preventDefault();

		var users = [];
		$(".user-checkbox:checked").each(function() {
			users.push($(this).parents('tr').attr('id'));
		});

		if (confirm("Are you sure you want to delete the selected " + users.length +" user(s)? This will remove all the resume information associated with the users, their job applications, their test scores, and any proctor files. This action is permanent and cannot be undone.")) {

			$.ajax({
				url: '/admin/deleteCandidates',
				data: {
					users: users
				},
				method: 'DELETE',
				error: function(jqXHR, textStatus, errorThrown) {
					alert('Error Attempting to delete user(s): ' + textStatus + ', ' + errorThrown);
				},
				success: function() {
					location.reload(true);
				}
			});
		}
	});
});

function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$(".action-btn").prop("disabled", false);
	} else {
		$(".action-btn").prop("disabled", true);
	}
}
</script>
{% endblock %}
