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
</style>

    <div class="col-md-12">
        <div class="card">
            <div class="header row">
                <div class="col-md-6">
                    <h4 class="title">{{ companyName }}</h4>
                    <p class="category">{{ jobTitle }}</p>
                </div>
            </div>
            <div class="content">
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
                                    <div class="test alert alert-info">No candidate has applied for this job yet</div>
                                {% else %}
									<table class="text-center table table-striped tablebordered dataTable">
										<thead>
										<tr>
											<th class="text-center"><i class="fa fa-user"></i>Name</th>
											<th class="text-center">Job Score</th>
											<th class="text-center">GQ Score</th>
											<th class="text-center">GQ Integrity</th>
											<th class="text-center">Status</th>
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
													<td class="text-center">{{ result.job_score }}%</td>
												{% else %}
													<td class="text-center">N/A</td>
												{% endif %}
												<td class="text-center">{{ result.aptitude_test }}</td>
												{#<td class="text-center"><a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="{{ result.proctor_id }}">{{ result.integrity_score }}</a></td>#}
												<td class="text-center"> {{ result.integrity_score }} %</td>
												<td class="text-center">{{ result.proctor_status }}</td>
												<td class="opt-icons text-center">
													<a href="" class="short-list btn btn-warning btn-fill btn-xs" rel="tooltip" title="Shortlist Candidate"><i class="fa fa-check-circle-o fa-lg"></i> </a>
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
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 50px">
                                <table class="table table-striped tablebordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
                                        <th style="width: 95%">Candidate</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody id="tb-selected">
                                    {% for sel in selected_candidates %}
                                        <tr data-candidate_id="{{ sel.applicant.id }}">
                                            <td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
                                            <td>{{ sel.applicant.fullname }}</td>
                                            <td><a href="" class="btn btn-danger btn-xs btn-fill unselect-candidate" rel="tooltip" title="Remove Candidate"><i class="fa fa-times fa-lg"></i></a></td>
                                        </tr>
                                    {% endfor %}
                                    </tbody>
                                </table>
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

    $(".short-list").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to shortlist this candidate?")) {
            var fullname = $(this).parents('tr').find('.name').text();
            var job_id = {{ job_id | json | safe }};
            var candidate_id = $(this).parents('tr').attr('id');

            $.post('/applicant/select-candidate', { job_id: job_id, candidate_id: candidate_id });

            var tr = "<tr data-candidate_id='" + candidate_id + "'>" +
                 "<td style='width: 30px'><label class='checkbox'><input type='checkbox' class='form-control' data-toggle='checkbox' /></label></td>" +
                 "<td>" + fullname + "</td>" +
                 "<td><a href='' class='btn btn-danger btn-xs btn-fill unselect-candidate' rel='tooltip' title='Remove Candidate'><i class='fa fa-times fa-lg'></i></a></td>" +
            "</tr>";

			var html = $("#tb-selected").html();
            $("#tb-selected").html(html + tr);

            showNotification('top', 'center', 'success', 'The candidate has been short-listed', 'pe-7s-bell');
        }
    });


    $("#tb-selected").on('click', '.unselect-candidate', function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this candidate?")) {
            var job_id = {{ job_id | json | safe }};
            var candidate_id = $(this).parents('tr').data('candidate_id');
            $.post('/applicant/unselect-candidate', { job_id: job_id, candidate_id: candidate_id });
            $(this).parents('tr').remove();
            showNotification('top', 'center', 'success', 'The candidate has been removed', 'pe-7s-bell');
        }
    });

	$('.dataTable').DataTable({
		pageLength: 50,
		responsive: true
	});
});
</script>
