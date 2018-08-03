{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
    <i class="pe-7s-timer"></i> Job Candidates
{% endblock %}

{% block body %}
<style>
	.modal-dialog {
		width: 700px;
	}

	#audios, #photos, #profile-pic {
		margin-top: 20px;
	}

	#photos .col-md-6 img {
		width: 100%;
	}

	.filter-div {
		padding-bottom: 25px;
		overflow: auto;
		background-color:#f9f9f9;
	}

	.dataTable_wrapper .row .col-md-6 {
		padding: 3px 30px;
	}

	.image-tag {
		position: absolute;
		left: 10px;
		bottom: 0;
		color: white;
		font-size: 20px;
		margin-left: 10px;
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

    <div class="col-md-12">
        <div class="card">
            <div class="header row">
                <div class="col-md-6">
                    <h4 class="title">{{ companyName }}</h4>
                    <p class="category">{{ jobTitle }}</p>
                </div>
                <div class="col-md-5 pull-right text-right">
                    <a href="" class="btn btn-danger hidden"><i class="fa fa-caret-left"></i> Back to jobs</a>
                    {% if job.status == 'Active' %}
                        <button class="btn btn-success btn-fill" id="archive-job"><i class="fa fa-archive"></i> Archive Job</button>
                    {% else %}
                        <button class="btn btn-success btn-fill" disabled><i class="fa fa-archive"></i> Archived Job</button>
                    {% endif %}                            
                </div>
            </div>
            <div class="content table-responsive table-full-width">
                <ul class="nav nav-tabs">
                    <li class=""><a href="#all-applications" data-toggle="tab">All Applications</a></li>
                    <li><a href="#gqassessed" data-toggle="tab">GQ Test</a></li>
                    <li class="active"><a href="#assessed" data-toggle="tab">Assessed Candidates</a></li>
                    <li><a href="#selected" data-toggle="tab">Shortlisted Candidates</a></li>
                </ul>
                <div class="tab-content">

                    <div class="tab-pane in fade" id="all-applications">
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 30px; margin-left:1px; padding-top: 15px;">
                                <table class="table table-striped dataTable">
                                    <thead>
                                        <tr>
                                            <td class="" colspan="4">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                                                        Action &nbsp;<span class="caret"></span>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a href="#emailModal" data-toggle="modal"><i class="fa fa-envelope fa-fw"></i> &nbsp;Send Email</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="width:10px !important"><label class="all-group-check"><input type="checkbox" class="form-control" datatoggle="checkbox" /></label></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tb-applications">
                                        {% for app in applicants %}
                                            <tr>
                                                <td style="width:10px !important"><label class=""><input type="checkbox" class="form-control user-checkbox" /></label></td>
                                                <td>
                                                    {% if app.applicant.status == 'Active' %}
                                                        <a target="_blank" href="/applicant/resume-user/{{ app.applicant.id }}" class="" rel="tooltip" title="View Resume">{{ app.applicant.fullname }}</a>
                                                    {% else %}
                                                        {{ app.applicant.fullname }}
                                                    {% endif %}    
                                                </td>
                                                <td class="email">{{ app.applicant.email }}</td>
                                                <td>{{ app.applicant.status }}</td>
                                                <td></td>
                                            </tr>
                                        {% endfor %}        
                                    </tbody>        
                                </table>
                            </div>
                        </div>
                    </div>

                     <div class="tab-pane in fade" id="gqassessed">
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 30px; margin-left:1px; padding-top: 15px;">
                                <div class="alert alert-danger">Not yet fully functional</div>
                                <table class="table table-striped ajaxDataTable">
                                    <thead>
                                        <tr>
                                            <td class="" colspan="13">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                                                        Action &nbsp;<span class="caret"></span>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a href="#emailModal" data-toggle="modal"><i class="fa fa-envelope fa-fw"></i> &nbsp;Send Email</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="width:10px !important"><label class="test-group-check"><input type="checkbox" class="form-control" datatoggle="checkbox" /></label></th>
                                            <th><i class="fa fa-calendar"></i> Date</th>
                                            <th>Name</th>
                                            <th class="hidden">Email</th>
                                            <th>Gen. Score</th>
                                            <th>Gen. Proctor</th>
                                            <th>Verbal Score</th>
                                            <th>Verbal Proctor</th>
                                            <th>Math Score</th>
                                            <th>Math Proctor</th>
                                            <th>Total</th>
                                            <th>Rank</th>
                                            <th class="text-center">Avg. Invigilation</th>
                                            <th>Test Status</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                </table>    
                            </div>
                        </div>
                    </div>       

                    <div class="tab-pane in fade active" id="assessed">
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 50px; padding-top: 15px;">

								{% if unshortlisted.length  == 0 %}
                                    <div class="test alert alert-info">None of the applid candidates have taken the required test.</div>
                                {% else %}
									<table class="table table-striped assessedDataTable">
										<thead>
                                        <tr>
                                            <td class="" colspan="13">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                                                        Action &nbsp;<span class="caret"></span>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a href="#emailModal" data-toggle="modal"><i class="fa fa-envelope fa-fw"></i> &nbsp;Send Email</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
										<tr>
                                            <th style="width:10px !important"><label class="test-group-check"><input type="checkbox" class="form-control" datatoggle="checkbox" /></label></th>
											<th><i class="fa fa-user"></i>Name</th>
                                            <th class="text-center">GQ Score</th>
											<th class="text-center">Job Score</th>
                                            <th class="text-center">Overall</th>
											<th class="text-center">Integrity</th>
											<th class="text-center">Proctor Status</th>
											<th class="text-center">Action</th>
										</tr>
										</thead>
										<tbody id="tb-assessed">
										{% set n = 0 %}
										{% for result in unshortlisted %}
											{% set n = n + 1 %}
                                            {#{% if result.gqtest_status == 'Accepted' %}#}
                                                <tr  id="{{ result.applicant.id }}" data-test_id="{{ result.test_id }}">
                                                    <td style="width:10px !important"><label class=""><input type="checkbox" class="form-control user-checkbox" /></label></td>                                
                                                    <td class="name">
                                                        <a target="_blank" href="/applicant/resume-user/{{ result.applicant.id }}" class="" rel="tooltip" title="View Resume">
                                                            {{ result.applicant.fullname }}
                                                        </a>
                                                    </td>
                                                    <td class="text-center">{{ result.percentage }}%</td>
                                                    {% if result.job_score !== false %}
                                                        <td class="text-center">{{ result.score }}%</td>
                                                    {% else %}
                                                        <td class="text-center">N/A</td>
                                                    {% endif %}
                                                    <td class="text-center">{{ result.composite_score }}%</td>
                                                    <td class="text-center"><a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ result.proctor_id }}">{{ result.integrity_score }}</a></td>
                                                    {#<td class="text-center"> {{ result.integrity_score }} %</td>#}
                                                    <td class="text-center proctor-status">{{ result.proctor_status }}</td>
                                                    <td data-user_name="{{ result.applicant.fullname }}" data-test-type="job-test" data-test-id="{{ result.test_id }}" data-proctor-id="{{ result.proctor_id }}" data-job-title="{{ jobTitle }}" class="opt-icons text-center">
                                                        <div class="btn-group">
                                                            <button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Menu &nbsp;<span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu dropdown-menu-right">
                                                                <li><a href="" class="accept-test"><i class="fa fa-check-circle-o fa-fw"></i> Accept Test Score</a></li>
                                                                <li><a href="" class="short-list"><i class="fa fa-check fa-fw"></i> Shortlist Candidate</a></li>
                                                                <li><a href="/editprofile/{{ user.id }}" target="_blank"><i class="fa fa-wrench"></i> Edit Profile</a></li>
                                                                <li role="separator" class="divider"></li>
                                                                <li><a href="" class="reject-test"><i class="fa fa-times fa-fw"></i>Reject Test Score</a></li>
                                                                <li><a href="" class="delete-test"><i class="fa fa-trash-o fa-fw"></i>Delete Test Scores</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            {#{% endif %}  #}  
										{% endfor %}
										</tbody>
									</table>
								{% endif %}

                            </div>
                        </div>
                    </div>

                    <div class="tab-pane in fade" id="selected">
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 50px; padding-top: 15px">
                                {% include './includes/shortlist-view.swig' %}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{% endblock %}

{% block modals %}
    {% include 'includes/proctorModal.swig' %}
    {% include '../misc/email-modal.swig' %}
{% endblock %}

{% block scriptTag %}
<script src="/js/proctorBackend.js"></script>
<script src="/js/plugins/datatables.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {
    var activeDTable = null;    // for the DataTable last clicked on

    var job_id = {{ job_id | json | safe }};

    $(".short-list").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to shortlist this candidate?")) {
            var fullname = $(this).parents('tr').find('.name').text();
            var score = $(this).parents('tr').find('td:nth-child(2)').text();
            var gqtest = $(this).parents('tr').find('td:nth-child(3)').text();

            var candidate_id = $(this).parents('tr').attr('id');

            $.post('/applicant/select-candidate', { job_id: job_id, candidate_id: candidate_id });

            var tr = "<tr data-candidate_id='" + candidate_id + "'>" +
                 "<td style='width: 30px'><label class='checkbox'><input type='checkbox' class='form-control' data-toggle='checkbox' /></label></td>" +
                 "<td>" + fullname + "</td>" +
                 "<td>" + score + "</td>" +
                 "<td>" + gqtest + "</td>" +
                 "<td>Pending Review</td>" +
                 "<td class='text-center'><a href='' class='btn btn-danger btn-xs btn-fill unselect-candidate' rel='tooltip' title='Remove Candidate'><i class='fa fa-times fa-lg'></i></a></td>" +
            "</tr>";

			//var html = $("#tb-selected").html();
            $("#tb-users").append(tr);

            showNotification('top', 'center', 'success', 'The candidate has been short-listed', 'pe-7s-bell');
        }
    });


    // enable company to view contact/send email
    $(".enable-contact").click(function() {
        if (confirm("Are you sure you it is okay for the company to contact these candidates?")) {
            $.post('/job/enable-contactview', { job_id: job_id }, function(d) {
                if (d.status.trim() == 'success') {
                    showNotification('top', 'center', 'success', 'Contact details has been enabled for this shortlist', 'pe-7s-bell');
                    $(".enable-contact").prop('disabled', true);
                } else {
                    showNotification('top', 'center', 'error', 'Something went wrong. Couldn\'t enable contact for this shortlist', 'pe-7s-bell');
                }
            });
        }
    });


    $("#tb-users").on('click', '.unselect-candidate', function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this candidate?")) {
            var candidate_id = $(this).parents('tr').data('candidate_id');
            $.post('/applicant/unselect-candidate', { job_id: job_id, candidate_id: candidate_id });
            $(this).parents('tr').remove();
            showNotification('top', 'center', 'success', 'The candidate has been removed', 'pe-7s-bell');
        }
    });


    $(".delete-test").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this test score?")) {
            var $parentTr = $(this).parents('tr');
           // var candidate_id = $parentTr.attr('id');
            var test_id = $parentTr.data('test_id');

            $.post('/gqtest/deleteResult', { test_id: test_id }, function(d) {
                if (d.status.trim() == 'success') {
                    $parentTr.fadeOut();
                }
            });
        }
    });


    $("#archive-job").click(function() {
        if (confirm("Are you sure you want to move this job to archive?")) {
           location.href = "/job/archive/" + job_id;
        }
    });


	var allDTable = $('.dataTable').DataTable({
		pageLength: 25,
		responsive: true
	});

    var assessedDTable = $('.assessedDataTable').DataTable({
		pageLength: 25,
		responsive: true
	});

    var testDTable = $(".ajaxDataTable").DataTable({
        pageLength: 30,
        processing: true,
        language: {
            processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
        },
        serverSide: true,
        ajax: {
            "url": '/api/v1/candidates/fetchgqresults',
            "type": 'POST',
            "draw": 1,
            "length": 30,
            "data": function(d) {
                d.mode = 'job_applicants';
                d.job_id = job_id;
            },
            "dataSrc": function(_data) {
                let data = _data.data;
                let processed_data = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    let d = {};
                    d.checkbox = '<label class=""><input type="checkbox" class="form-control user-checkbox" /></label>';
                    d.test_date = new Date(data[i].test_date).toLocaleDateString();
                    d.fullname = `<a target="_blank" href="/applicant/resume-user/${data[i].id}" class="view-resume" rel="tooltip" title="View Resume">${data[i].fullname}</a>`;
                    d.email = data[i].email;
                    d.general_ability_score = data[i].generalAbilityTest.score;
                    d.general_ability_proctor = data[i].generalAbilityTest.proctorScore;
                    d.verbal_score = data[i].verbalTest.score;
                    d.verbal_proctor = data[i].verbalTest.proctorScore;
                    d.maths_score = data[i].mathsTest.score;
                    d.maths_proctor = data[i].mathsTest.proctorScore;
                    d.percentage = data[i].percentage;
                    d.rank = data[i].rank;
                    d.integrity_score = data[i].integrity_score; 
                    d.status = data[i].status;
                    d.actionbtn = `<div class="btn-group">
									<button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Menu &nbsp;<span class="caret"></span>
									</button>
									<ul class="dropdown-menu dropdown-menu-right">
										<li><a href="" class="accept-test"><i class="fa fa-check-circle-o fa-fw"></i> Accept Test Score</a></li>
										<li><a href="" class="reject-test"><i class="fa fa-times fa-fw"></i>Reject Test Score</a></li>
										<li role="separator" class="divider"></li>
										<li><a href="" class="trash-can"><i class="fa fa-trash-o fa-fw"></i> Delete Test Scores</a></li>
										<li><a href="/editprofile/{{ user.id }}" target="_blank"><i class="fa fa-wrench"></i> Edit Profile</a></li>
									</ul>
								</div>`;
                    processed_data.push(d);
                }
                return processed_data;
            }
        },
         "columns": [
            { "data": "checkbox" }, 
            { "data": "test_date" }, 
            { "data": "fullname", "searchable": true },
            { "data": "email", "searchable": true },
            { "data": "general_ability_score" },
            { "data": "general_ability_proctor" },
            { "data": "verbal_score" },
            { "data": "verbal_proctor" },
            { "data": "maths_score" },
            { "data": "maths_proctor" },
            { "data": "percentage" },
            { "data": "rank" },
            { "data": "integrity_score" },
            { "data": "status" },
            { "data": "actionbtn" }
        ],
        'createdRow': function( row, data, dataIndex ) {
      		$(row).attr('id',  data.id);
  		},
  		'columnDefs': [
     		{
        		'targets': 3,
        		'createdCell':  function (td, cellData, rowData, row, col) {
           			$(td).attr('class', 'hidden'); 
        		}
     		}
  		]
    });

    $(".ajaxDataTable").css('width', '100%');

    $(".test-group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			testDTable.$(".user-checkbox").prop('checked', true);
		} else {
			testDTable.$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn($(this).parents('.table'));
        activeDTable = testDTable;
	});


    $(".assessed-group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			assessedDataTable.$(".user-checkbox").prop('checked', true);
		} else {
			assessedDataTable.$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn($(this).parents('.table'));
        activeDTable = assessedDataTable;
	});


    $(".all-group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			allDTable.$(".user-checkbox").prop('checked', true);
		} else {
			allDTable.$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn($(this).parents('.table'));
        activeDTable = allDTable;
	});

    $(".ajaxDataTable tbody").prop("id", "tb-test-result");

    $("#tb-applications").on('click', ".user-checkbox", function() {
		controlActionBtn($(this).parents('.table'));
        activeDTable = allDTable;
	});

    $("#tb-assessed").on('click', ".user-checkbox", function() {
		controlActionBtn($(this).parents('.table'));
        activeDTable = $(this).parents('.table');
	});

    $("#tb-users").on('click', ".user-checkbox", function () {
        controlActionBtn();
        activeDTable = $(this).parents('.table');
    });

    $(".ajaxDataTable").on('click', ".user-checkbox", function() {
		controlActionBtn($(this).parents('.table'));
        activeDTable = testDTable;
	});

     $("#form-email").submit(function(e) {
		e.preventDefault();

        sendEmail(activeDTable, $(this));
     });
    
});

function sendEmail($table, $form) {
   
    $form.find('button[type-submit]').html("<i class=fa fa-cog fa-spin></i> Sending...").prop('disabled', true);
    var users = [];
    $table.$(".user-checkbox:checked").each(function() {
        users.push($(this).parents('tr').find('td.email').text());
    });

    tinymce.triggerSave();

    $.post('/admin/sendemail', $form.serialize() + '&users=' + users, function(d) {
        if (d.status.trim() == 'success') {
            $(".alert-success").removeClass('hidden');
            $form.find('button[type-submit]').html("<i class=fa fa-envelope></i> Send Email").prop('disabled', false);
        }
    }, 'JSON');
}

function controlActionBtn($parent) {
	if ($parent.find(".user-checkbox:checked").size() > 0) {
		$parent.find(".action-btn").prop("disabled", false);
	} else {
		$parent.find(".action-btn").prop("disabled", true);
	}
}
</script>
