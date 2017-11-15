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
            <div class="content table-responsive table-full-width">
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
                        {#{% set applications = job.applications.length %}#}
                        <tr id="{{ result.applicant.id }}">
                            <td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
                            <td>{{ result.createdAt | date('d M, Y') }}</td>
                            <td></td>
                            <td>{{ result.percentage }}%</td>
                            <td class="textright">{{ result.percentile }}</td>
                            <td class="">{{ result.average_score }}</td>
                            <td>{{ result.test_result }}</td>
                            <td class="opt-icons text-center">
                                <a href="" rel="tooltip" title="View Resume"><i class="fa fa-list-alt fa-lg"></i> </a>
                                <a href="" class="view-tests" rel="tooltip" title="Watch Video"><i class="fa fa-video-camera fa-lg"></i></a>
                            </td>
                        </tr>
                    {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

{% endblock %}

{% block modals %}
    {% include "includes/job-form.swig" %}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
    $(document).ready(function() {

    });
</script>
