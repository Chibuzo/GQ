{% extends 'layout.swig' %}
{% set title = 'Assessment Results' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Candidates' Results
{% endblock %}

{% block body %}
	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">Test Results</h4>
					<p class="category">Most recent results</p>
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
						{% set n = n + 1 %}
						{#{% set applications = job.applications.length %}#}
						<tr id="{{ result.applicant.id }}">
							<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
							<td>{{ result.createdAt | date('d M, Y') }}</td>
							<td>{{ result.applicant.fullname }}</td>
							<td>{{ result.percentage }}%</td>
							<td class="textright">{{ result.percentile }}</td>
							<td class="">{{ result.average_score }}</td>
							<td>{{ result.test_result }}</td>
							<td class="opt-icons text-center">
								<a href="" rel="tooltip" title="View Resume"><i class="fa fa-list-alt fa-lg"></i> </a>
								<a href="#videoModal" data-toggle="modal" class="view-tests watch-video" rel="tooltip" title="Watch Video"><i class="fa fa-video-camera fa-lg"></i></a>
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
	});
</script>
