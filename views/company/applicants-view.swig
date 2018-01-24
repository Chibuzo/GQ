{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
    <i class="pe-7s-timer"></i> Candidates' Results
{% endblock %}

{% block body %}
    <div class="col-md-12">
        <div class="card">
            <div class="header row">
                <div class="col-md-6">
                    <h4 class="title">Test Results</h4>
                    <p class="category">Candidates that took the test</p>
                </div>
            </div>
            <div class="content">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#all" data-toggle="tab">All Applicants</a></li>
                    <li><a href="#assessed" data-toggle="tab">Assessed Candidates</a></li>
                    <li><a href="#selected" data-toggle="tab">Shortlisted Candidates</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade active in" id="all">
                        <div class="row">
                            <div class="col-md-12 table-responsive table-full-width" style="padding: 50px">
                                <table class="table table-striped tablebordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
                                        <th>Test Date</th>
                                        <th><i class="fa fa-user"></i> Candidate</th>
                                        <th>Profile Status</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {% set n = 0 %}
                                    {% for applicant in applicants %}
                                        {% set n = n + 1 %}
                                        {#{% set applications = job.applications.length %}#}
                                        <tr id="{{ applicant.applicant.id }}">
                                            <td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
                                            <td>{{ applicant.createdAt | date('d M, Y') }}</td>
                                            <td>{{ applicant.applicant.fullname }}</td>
                                            <td>{{ applicant.applicant.status }}</td>
                                            {% if applicant.applicant.status == 'Active' %}
                                                <td class="opt-icons text-center">
                                                    <a href="/applicant/resume-user/{{ applicant.applicant.id }}" rel="tooltip" title="View Resume"><i class="fa fa-newspaper-o fa-lg"></i> </a>
                                                </td>
                                            {% else %}
                                                <td></td>
                                            {% endif %}
                                        </tr>
                                    {% endfor %}
                                    </tbody>
                                </table>
                                {% if applicants.length < 1 %}
                                    <div class="row">
                                        <div class="col-md-12" style="padding: 0 45px"><div class="alert alert-warning"><i class="fa fa-info-circle fa-lg"></i> No candidate has taken a test for this job.</div></div>
                                    </div>
                                {% endif %}
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane in fade" id="assessed">
                        <div class="">
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
                                <table class="table table-striped tablebordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
                                        <th>Test Date</th>
                                        <th><i class="fa fa-user"></i> Candidate</th>
                                        <th>Percentage</th>
                                        <th>Percentile</th>
                                        <th>Average Score</th>
                                        <th>Result</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {% set n = 0 %}
                                    {% for result in results %}
                                        {% set n = n + 1 %}
                                        {#{% set applications = job.applications.length %}#}
                                        <tr id="{{ result.applicant.id }}">
                                            <td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
                                            <td>{{ result.createdAt | date('d M, Y') }}</td>
                                            <td class="name">{{ result.applicant.fullname }}</td>
                                            <td>{{ result.percentage }}%</td>
                                            <td class="textright">{{ result.percentile }}</td>
                                            <td class="">{{ result.average_score }}</td>
                                            <td>{{ result.test_result }}</td>
                                            <td class="opt-icons text-center">
                                                <a href="/applicant/resume-user/{{ result.applicant.id }}" class="btn btn-success btn-fill btn-xs" rel="tooltip" title="View Resume"><i class="fa fa-newspaper-o fa-lg"></i> </a>
                                                <a href="" class="short-list btn btn-warning btn-fill btn-xs" rel="tooltip" title="Shortlist Candidate"><i class="fa fa-check-circle-o fa-lg"></i> </a>
                                            </td>
                                        </tr>
                                    {% endfor %}
                                    </tbody>
                                </table>
                                {% if n == 0 %}
                                    <div class="alert alert-info">No candidate has take the compitency test yet.</div>
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
                                        <tr id="{{ sel.applicant.id }}">
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

    <div class="modal fade in" id="resumeModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Candidate's Profile</h4>
                </div>

                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        <i class="fa fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    </div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {

    $(".short-list").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to shortlist this candidate?")) {
            var fullname = $(this).parents('tr').find('.name').text();
            var job_id = {{ job_id | json | safe }};
            var candidate_id = $(this).parents('tr').attr('id');
            $.post('/applicant/select-candidate', { job_id: job_id, candidate_id: candidate_id });
            var tr = "<tr>" +
                 "<td style='width: 30px'><label class='checkbox'><input type='checkbox' class='form-control' data-toggle='checkbox' /></label></td>" +
                 "<td>" + fullname + "</td>" +
                 "<td><a href='' class='btn btn-danger btn-xs btn-fill unselect-candidate' rel='tooltip' title='Remove Candidate'><i class='fa fa-times fa-lg'></i></a></td>" +
            "</tr>";
            $("#tb-selected").html(tr);
            showNotification('top', 'center', 'success', 'The candidate has been short-listed', 'pe-7s-bell');
        }
    });


    $("#tb-selected").on('click', '.unselect-candidate', function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this candidate?")) {
            var job_id = {{ job_id | json | safe }};
            var candidate_id = $(this).parents('tr').attr('id');
            $.post('/applicant/unselect-candidate', { job_id: job_id, candidate_id: candidate_id });
            $(this).parents('tr').fadeOut();
            showNotification('top', 'center', 'success', 'The candidate has been removed', 'pe-7s-bell');
        }
    });
});
</script>
