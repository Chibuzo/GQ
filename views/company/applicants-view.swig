{% if req.session.admin == true %}
    {% extends '../admin/layout.swig' %}
{% else %}
    {% extends 'layout.swig' %}
{% endif %}

{% set title = 'Candidates' %}
{% block page_title %}
    <i class="pe-7s-users"></i> Applicants {{ req.session.admin }}
{% endblock %}

{% block body %}
    <div class="col-md-12">
        <div class="card">
            <div class="header row">
                <div class="col-md-6">
                    <h4 class="title">All Candidates</h4>
                    <p class="category">Candidates that Applied for this job</p>
                </div>
            </div>
            <div class="content">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#all" data-toggle="tab"> &nbsp;All Candidates</a></li>
                    <li><a href="#assessed" data-toggle="tab">Assessed Candidates</a></li>
                    <li><a href="#selected" data-toggle="tab">Short-listed Candidates</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade active in" id="all">
                        <div class="row table-responsive table-full-width">
                            <div class="col-md-12" stle="padding: 50px">
                                <table class="table table-striped tablebordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
                                        <th>Test Date</th>
                                        <th><i class="fa fa-user"></i> Candidate</th>
                                        <th>Profile Status</th>
                                        {#<th>Percentile</th>#}
                                        {#<th>Average Score</th>#}
                                        {#<th>Result</th>#}
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
                                            {#<td class="textright">{{ result.percentile }}</td>#}
                                            {#<td class="">{{ result.average_score }}</td>#}
                                            {#<td>{{ result.test_result }}</td>#}
                                            <td class="opt-icons text-center">
                                                <a href="" class="btn btn-xs btn-info" rel="tooltip" title="View Resume"><i class="fa fa-list-alt fa-lg"></i> </a>
                                                <a href="#videoModal" data-toggle="modal" class="watch-video btn btn-xs btn-primary" rel="tooltip" title="Watch Video"><i class="fa fa-video-camera fa-lg"></i></a>
                                            </td>
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

                    <div class="tab-pane fade in" id="assessed">
                        <div class="row">
                            <form action="" method="post" class="form-vertical">
                                <div class="form-group">
                                    <div class="col-md-4">
                                        <label>Qualification</label>
                                        <input type="text" name="qualification" placeholder="Qualification" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label>University</label>
                                        <input type="text" name="qualification" placeholder="Filter by university" class="form-control" />
                                    </div>
                                    <div class="col-md-2" style="padding-top: 30px;">
                                        <button type="submit" class="btn btn-primary"><i class="fa fa-filter"></i> Filter Candidates</button>
                                    </div>
                                </div>
                            </form>
                        </div><br>
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
                                        <a href="" class="btn btn-xs btn-info" rel="tooltip" title="View Resume"><i class="fa fa-list-alt fa-lg"></i> </a>
                                        <a href="#videoModal" data-toggle="modal" class="btn btn-xs btn-primary view-tests watch-video" rel="tooltip" title="Watch Video"><i class="fa fa-video-camera fa-lg"></i></a>
                                        {% if req.session.admin == true %}
                                            <a href="" class="btn btn-xs btn-default select-candidate" rel="tooltip" title="Select Candidate"><i class="fa fa-user-plus fa-lg"></i> </a>
                                        {% endif %}
                                    </td>
                                </tr>
                            {% endfor %}
                            </tbody>
                        </table>
                        {% if n == 0 %}
                            <div class="alert alert-info">No candidate has take the compitency test yet.</div>
                        {% endif %}
                    </div>

                    <div class="tab-pane fade in" id="selected">
                        <table class="table table-striped tablebordered">
                            <thead>
                            <tr>
                                <th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
                                <th>Candidate</th>
                                <th style="width: 200px" class="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody id="tb-selected">
                                {% for candidate in selected_candidates %}
                                    <tr id="{{ candidate.candidate.id }}">
                                        <td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
                                        <td>{{ candidate.candidate.fullname }}</td>
                                        <td class="opt-icons text-center">
                                            <a href="" class="btn btn-xs btn-info" rel="tooltip" title="View Resume"><i class="fa fa-list-alt fa-lg"></i> </a>
                                            <a href="#videoModal" data-toggle="modal" class="btn btn-xs btn-primary view-tests watch-video" rel="tooltip" title="Watch Video"><i class="fa fa-video-camera fa-lg"></i></a>
                                            <a href="" class="btn btn-xs btn-danger remove-candidate" rel="tooltip" title="Remove Candidate"><i class="fa fa-user-trash fa-lg"></i> </a>
                                        </td>
                                    </tr>
                                {% endfor %}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

{% endblock %}

{% block modals %}
    <div class="modal fade in" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Candidate's Video</h4>
                </div>

                <div class="modal-body">
                    <div>
                        <video style="margin-top: 15px" width="550" height="350" controls=controls id="video-pane">

                        </video>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        <i class="fa fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    </div>

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
    $(".watch-video").click(function(e) {
        e.preventDefault();
        var user_id = $(this).parents('tr').attr('id');
        $.get('/result/getVideo', { 'candidate_id': user_id }, function(d) {
            if (d.status.trim() == 'success') {
//                $(".modal-title").text(d.resume.fullname + "'s Video");
                $("#video-pane").html("<source src='/applicant_videos/" + d.resume.video_file + "' type='video/mp4'></source>");
            }
        });
    });


    $(".select-candidate").click(function(e) {
        e.preventDefault();
        var job_id = {{ job_id | json | safe }};
        var $tr = $(this).parents('tr');
        var candidate_id = $tr.attr('id');
        var candidate_name = $tr.find('.name').text();

        $.post('/job/select-candidate', { job_id: job_id, candidate_id: candidate_id }, function(d) {
            if (d.status.trim() == 'success') {
                var html = "<tr>" +
                        "<td style='width: 30px'><label class='checkbox'><input type='checkbox' class='form-control' data-toggle='checkbox' /></label></td>" +
                        "<td>" + candidate_name + "</td>" +
                        "<td class='opt-icons text-center'>" +
                        "<a href='' class='btn btn-xs btn-info' rel='tooltip' title='View Resume'><i class='fa fa-list-alt fa-lg'></i></a>" +
                        "<a href='#videoModal' data-toggle='modal' class='btn btn-xs btn-primary view-tests watch-video' rel='tooltip' title='Watch Video'><i class='fa fa-video-camera fa-lg'></i></a>" +
                        "<a href='' class='btn btn-xs btn-danger remove-candidate' rel='tooltip' title='Remove Candidate'><i class='fa fa-user-trash fa-lg'></i></a>" +
                        "</tr>";
                $("#tb-selected").append(html);
                var msg = 'Candidate has been short-listed';
                showNotification('bottom', 'center', 'success', msg, 'pe-7s-bell');
            }
        }, 'JSON');
    });


    $(".remove-candidate").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this candidate?")) {
            var job_id = {{ job_id | json | safe }};
            var $tr = $(this).parents('tr');
            var candidate_id = $tr.attr('id');

            $.get('/job/remove-candidate', { job_id: job_id, candidate_id: candidate_id }, function(d) {
                $tr.fadeOut();
            });
        }
    });
});
</script>
