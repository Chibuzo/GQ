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

	a.disabled {
		pointer-events: none;
		cursor: default;
	}

</style>

<div class="row">
	<div class="controls col-xs-12" style="overflow: auto; margin-bottom: 20px;">

		<div class="row" id="filter-div">
				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Applicants </p>
					<a href="#/admin/candidates/all" class="btn btnlg btn-info btn-fill" id="all" data-title="All candidates" data-desc="All candidates both active and inactive">All: {{ statistics.applicants | formatCurrency }}</a>
					<a href="#/admin/candidates/active" class="btn btnlg btn-info btn-fill" id="active" data-title="All active candidates" data-desc="All candidates that have confirmed their email address">Active: {{ statistics.active | formatCurrency }}</a>
					<a href="#/admin/candidates/inactive" class="btn btnlg btn-info btn-fill" id="inactive" data-title="All inactive candidates" data-desc="Candidates yet to confirm their email address">Inactive: {{ statistics.inactive | formatCurrency }}</a>
				</div>
				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Resumes </p>
					<a href="#/admin/candidates/complete" class="btn btnlg btn-info btn-fill" id="complete" data-title="Candidates with complete resume" data-desc="All candidates that have completed the resume part of their profile">Complete: {{ statistics.complete | formatCurrency }}</a>
					<a href="#/admin/candidates/incomplete" class="btn btnlg btn-info btn-fill" id="incomplete" data-title="Candidate with incomplete resume" data-desc="Candidates yet to fill their resume form">Incomplete: {{ statistics.incomplete | formatCurrency }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Photos </p>
					<a href="#/admin/candidates/nophotos" class="btn btnlg btn-info btn-fill" id="no-photo" data-title="Candidates with no photo" data-desc="All candidates without profile photo">No Photo: {{ statistics.nophotos | formatCurrency }}</a>
					<a href="#/admin/candidates/photos" class="btn btnlg btn-info btn-fill" id="photo" data-title="Candidates with profile photos" data-desc="All candidates with profile photo">Photo: {{ statistics.photos | formatCurrency }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Test </p>
					<a href="#/admin/candidates/notests" class="btn btnlg btn-info btn-fill" id="no-test" data-title="All Candidates with no test" data-desc="All candidates yet to take the General Aptitude test">No Tests: {{ statistics.notests | formatCurrency }}</a>
					<a href="#/admin/candidates/sometests" class="btn btnlg btn-info btn-fill" id="in-progess" data-title="Candidates with test in progress" data-desc="Unserious candidates that have started but will not complete their General Aptitude test">In Progress: {{ statistics.sometests | formatCurrency }}</a>
					<a href="#/admin/candidates/tests" class="btn btnlg btn-info btn-fill" id="test-completed" data-title="Candidates with complete test" data-desc="Candidates that have completed the 3 sections of the General Aptitude Test">Completed: {{ statistics.tests | formatCurrency }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Videos </p>
					<a href="" class="btn btnlg btn-info btn-fill" id="no-video" data-title="Candidates with no video" data-desc="All Candidates without profile video">No Videos: {{ statistics.novideos | formatCurrency }}</a>
					<a href="#/admin/candidates/videos" class="btn btnlg btn-info btn-fill" id="video" data-title="Candidates with video" data-desc="All candidates with a profile video">Videos: {{ statistics.videos | formatCurrency }}</a>
				</div>

				<div class="col-md-2 col-xs-3 funnel-item">
					<p> Job Applications </p>
					<a href="#/admin/candidates/nojobs" class="btn btnlg btn-info btn-fill" id="" disabled>No Applications: {{ statistics.nojobs | formatCurrency }}</a>
					<a href="#/admin/candidates/jobs" class="btn btnlg btn-info btn-fill" id="" disabled>With Applications: {{ statistics.jobs | formatCurrency }}</a>
				</div>
		</div>
	</div>
</div>

</div>

<div class="row">
	<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-8">
				<h4 class="title">{{ filter | capitalize }} Candidates</h4>
				<p class="category">{{ info }}</p>
			</div>
			<div class="col-md-4 pull-right"><button class="btn btn-info btn-fill pull-right" id="search-cv"><i class="fa fa-search"></i> Search CV</button></div>
		</div>

		{% set search_pg = 'stat' %}
		{% include 'includes/candidate-search-form.swig' %}
		<div class="content table-responsive table-full-width">
			<table class="table table-striped applicantsDataTable">
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
						<th style="width:10px"><label class="all-group-check"><input type="checkbox" class="form-control" datatoggle="checkbox" /></label></th>
						<th><i class="fa fa-calendar"></i> Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
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
let dTable;
$(document).ready(function() {
	$('.candidate-filter').addClass('active');

	// load data
	fetchData('all');
	$(".applicantsDataTable").css('width', '100%');

	$("#filter-div .btn").click(function(e) {
		e.preventDefault();
		var query = $(this).attr('id');
		dTable.destroy();
		fetchData(query);
		$(".applicantsDataTable").css('width', '100%');
		$(".title").text($(this).data('title'));
		$(".category").text($(this).data('desc'));
	});


	$(".all-group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			$(".user-checkbox").prop('checked', true);
		} else {
			$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn();
    });
    

    $(".applicantsDataTable").on('click', ".user-checkbox", function() {
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
				$('#form-email').find('button[type-submit]').html("<i class=fa fa-envelope></i> Send Email").prop('disabled', false);
			}
		}, 'JSON');
	});

	$("#emailModal").on("hidden.bs.modal", function () {
        $("#form-email").find(".alert-success").addClass('hidden');
    });


	$(".applicantsDataTable").on("click", ".delete-candidates", function(e) {
		e.preventDefault();
		var $this = $(this);

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
					user.forEach(function(id) {
						$(".table").find('tr#' + id).fadeOut();
					});
				}
			});
		}
	});


	$("#search-cv").click(function() {
		$(".filter-div").slideToggle();
	});

	// load states
	$.get('/getstates', function(d) {
		var html = '<option value="">-- State --</option>';
		d.states.forEach(function(state) {
			html += `<option value='${state.state_name}'>${state.state_name}</option>`;
		});
		$('#r_state').html(html);
	}, 'JSON');
});

$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});

function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$(".action-btn").prop("disabled", false);
	} else {
		$(".action-btn").prop("disabled", true);
	}
}


function fetchData(query) {
	dTable = $('.applicantsDataTable').DataTable({
		pageLength: 50,
		responsive: true,
        processing: true,
        language: {
            processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
        },
        serverSide: true,
        ajax: {
            "url": '/api/v1/applicants/fetch',
            "type": 'POST',
            "draw": 1,
            "length": 50,
            "data": function(d) {
                d.query = query;
            },
            "dataSrc": function(_data) {
                let data = _data.data;
                let processed_data = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    if (!data[i].applicant) continue;

					let uid = data[i].applicant.user ? data[i].applicant.user : data[i].applicant.id;	// since we can be fetching from either user/resume table
					
					let edit_link_class = 'disabled';
					let profile_link = data[i].applicant.fullname;
					if (data[i].applicant.status !== 'Inactive') {
						edit_link_class = '';
						profile_link = `<a target="_blank" href="/applicant/resume-user/${uid}" class="view-resume" rel="tooltip" title="View Resume">${data[i].applicant.fullname}</a>`;
					}
                    let d = {};
                    d.id = data[i].applicant.id;
					d.date = new Date(data[i].applicant.createdAt).toLocaleDateString();
                    d.checkbox = '<label class=""><input type="checkbox" class="form-control user-checkbox" /></label>';
                    d.fullname = profile_link;
                    d.email = data[i].applicant.email;
                    d.status = data[i].applicant.status;
					d.menu = `<button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Menu &nbsp;<span class="caret"></span>
							</button>
							<ul class="dropdown-menu dropdown-menu-right">
								<li><a href="/editprofile/${uid}" target="_blank" class="${edit_link_class}"><i class="fa fa-wrench"></i> Edit Profile</a></li>
							</ul>`;
                    processed_data.push(d);
                }
                return processed_data;
            }
        },
         "columns": [
            { "data": "checkbox", orderable: false },
			{ "data": "date" }, 
            { "data": "fullname", "searchable": true },
            { "data": "email", "searchable": true },
            { "data": "status" },
			{ "data": "menu" }
        ],
        'createdRow': function( row, data, dataIndex ) {
      		$(row).attr('id',  data.id);
  		},
        'columnDefs': [
     		{
        		'targets': 3,
        		'createdCell':  function (td, cellData, rowData, row, col) {
           			$(td).attr('class', 'email'); 
        		}
     		},
        ]
            
	});
}
</script>

{% endblock %}
