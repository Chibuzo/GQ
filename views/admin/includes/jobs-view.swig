<div class="content table-responsive table-full-width">
	<table class="table table-striped tablebordered">
		<thead>
		<tr>
			<th style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></th>
			<th>Date Added</th>
			<th>Job Title</th>
			<th>Job Level</th>
			<th>Contract Type</th>
			<th style="width: 60px">Applications</th>
			<th>Poster</th>
			{#<th>Status</th>#}
			<th><i class="fa fa-calendar"></i> Closing Date</th>
			<th class="text-center">Action</th>
		</tr>
		</thead>
		<tbody>
		{% set n = 0 %}
		{% for job in jobs %}
			{% set applications = job.applications.length %}
			<tr id="{{ job.id }}">
				<td style="width: 30px"><label class="checkbox"><input type="checkbox" class="form-control" data-toggle="checkbox" /></label></td>
				<td>{{ job.createdAt | date('d.m.Y') }}</td>
				{% if job.source == 'Jobberman' || job.source == 'Ngcareers' %}
					<td><a href="{{ job.job_url }}">{{ job.job_title }}</a></td>
				{% else %}
					<td>{{ job.job_title }}</td>
				{% endif %}
				<td>{{ job.job_level }}</td>
				<td>{{ job.contract_type }}</td>
				<td class="text-center"><a href="/job/view-applicants/{{ job.id }}">{{ applications }}</a></td>
				{% if job.source == 'Jobberman' || job.source == 'Ngcareers' %}
					<td>{{ job.source }}</td>
				{% else %}
					<td>{{ job.poster.fullname }}</td>
				{% endif %}
				<td>{{ job.closing_date | date('d M, Y') }}</td>
				<td class="opt-icons text-center">
					<div class="button-group" role="group">
						{% if job.source == 'Jobberman' || job.source == 'Ngcareers' %}
						{% else %}
							<a href="/job/editjob/{{ job.id }}" class="edit-job btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Edit Job"><i class="fa fa-pencil fa-lg"></i></a>
						{% endif %}
						{#<a href="#manageTestModal" data-toggle="modal" class="view-tests" rel="tooltip" title="Manage Tests"><i class="fa fa-book fa-lg"></i></a>#}
						<a href="" class="upload-csv btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Add Candidates via CSV Upload"><i class="fa fa-file-text-o fa-lg"></i></a>
						{#<a href="/job/candidates/{{ job.id }}" class="btn btn-secondary btn-xs btn-fill" rel="tooltip" title="View Candidates"><i class="fa fa-users fa-lg"></i></a>#}
						{#<a href="" class="del-job btn btn-secondary btn-xs btn-fill btn-danger" rel="tooltip" title="Delete Job"><i class="fa fa-trash-o fa-lg"></i></a>#}
					</div>
				</td>
			</tr>
		{% endfor %}
		</tbody>
	</table>
</div>