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

    .image-tag {
		position: absolute;
		left: 0;
		bottom: 0;
		color: white;
		font-size: 20px;
		margin-left: 5px;
		margin-bottom: 5px;
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
                    <button class="btn btn-success btn-fill" id="archive-job"><i class="fa fa-archive"></i> Archive Job</button>
                </div>
            </div>
            <div class="content table-responsive table-full-width">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#assessed" data-toggle="tab">Assessed Candidates</a></li>
                    <li><a href="#selected" data-toggle="tab">Shortlisted Candidates</a></li>
                </ul>
                <div class="tab-content">

                    <div class="tab-pane in fade active" id="assessed">
                        <div class="hidden">
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
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 50px; padding-top: 15px;">
								{% set candidatesNo = results.length %}
								{% set shortlistNo = selected_candidates.length %}

								{% if shortlistNo + candidatesNo  == 0 %}
                                    <div class="test alert alert-info">None of the applid candidates have taken the required test.</div>
                                {% else %}
									<table class="table table-striped dataTable">
										<thead>
										<tr>
											<th><i class="fa fa-user"></i>Name</th>
											<th class="text-center">Job Score</th>
											<th class="text-center">GQ Score</th>
                                            <th class="text-center">Overall</th>
											<th class="text-center">Integrity</th>
											<th class="text-center">Proctor Status</th>
											<th class="text-center">Action</th>
										</tr>
										</thead>
										<tbody>
										{% set n = 0 %}
										{% for result in results %}
											{% set n = n + 1 %}
											<tr  id="{{ result.applicant.id }}" data-test_id="{{ result.test_id }}">
												<td class="name">
													<a target="_blank" href="/applicant/resume-user/{{ result.applicant.id }}" class="" rel="tooltip" title="View Resume">
														{{ result.applicant.fullname }}
													</a>
												</td>
												{% if result.job_score !== false %}
													<td class="text-center">{{ result.score }}%</td>
												{% else %}
													<td class="text-center">N/A</td>
												{% endif %}
												<td class="text-center">{{ result.percentage }}%</td>
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
										{% endfor %}
										</tbody>
									</table>
								{% endif %}

                            </div>
                        </div>
                    </div>

                    <div class="tab-pane in fade" id="selected">
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" stle="padding: 50px">
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
{% endblock %}

{% block scriptTag %}
<script src="/js/proctorBackend.js"></script>
<script src="/js/plugins/datatables.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {

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


    $("#tb-users").on('click', '.unselect-candidate', function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this candidate?")) {
            var job_id = {{ job_id | json | safe }};
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


	$('.dataTable').DataTable({
		pageLength: 50,
		responsive: true
	});
});
</script>
