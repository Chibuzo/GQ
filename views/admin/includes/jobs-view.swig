<div class="content table-responsive table-full-width">
	<table class="table table-striped dataTable">
		<thead>
		{% if scrapedJob === true %}
			<tr>
				<td class="" colspan="10">
					<div class="btn-group">
						<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
							Action &nbsp;<span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<li><a href="" class="move-to-jobBoard"><i class="fa fa-briefcase fa-fw"></i> &nbsp;Move to Job Board</a></li>
							<li><a href="" class="delete-jobs"><i class="fa fa-trash-o fa-fw"></i> &nbsp;Remove Jobs(s)</a></li>
						</ul>
					</div>
				</td>
			</tr>
		{% endif %}
		<tr>
			<th style="width: 30px"><input type="checkbox" class="group-check" /></th>
			<th>Date Added</th>
			<th>Job Title</th>
			{% if scrapedJob === true %}
				<th>Company</th>
			{% endif %}
			<th>Job Level</th>
			<th>Views</th>
			<th>Applications</th>
			<th>Shortlisted</th>
			{#<th>Poster</th>#}
			{#<th>Status</th>#}
			<th>Closing Date</th>
			<th>Action</th>
		</tr>
		</thead>
		<tbody id="tb-jobs">
		{% set n = 0 %}
		{% for job in jobs %}
			{#{% if job.source == 'Jobberman' || job.source == 'Ngcareers' %}#}
				{#{% set scrapedJob = true %}#}
			{#{% endif %}#}
			{% set applications = job.applications.length %}
			{% set path = job.job_title.split(' ') %}
			<tr id="{{ job.id }}">
				<td style="width: 30px"><input type="checkbox" class="user-checkbox" /></td>
				<td data-order="{{ job.createdAt | date('Y/m/d') }}">{{ job.createdAt | date('d.m.Y') }}</td>
				{% if scrapedJob === true %}
					<td><a href="/job/{{ job.id }}/{{ path | join('-') }}" target="_blank">{{ job.job_title }}</a></td>
					<td>{{ job.company_name }}</td>
				{% else %}
					<td>{{ job.job_title }}</td>
				{% endif %}
				<td>{{ job.job_level }}</td>
				<td>{{ job.view_count }}</td>
				{% if isAdmin == true %}
					<td><a href="/admin/job/{{ job.id }}/view-applicants">{{ applications }}</a></td>
				{% else %}
					<td><a href="/job/view-applicants/{{ job.id }}">{{ applications }}</a></td>
				{% endif %}
				{% if job.shortlisted == false %}
					<td> - </td>
				{% else %}
					{% if isAdmin == true %}
						<td><a href="/admin/job/{{ job.id }}/view-shortlisted">{{ job.shortlisted }}</a></td>
					{% else %}
						<td><a href="/job/view-shortlisted/{{ job.id }}">{{ job.shortlisted }}</a></td>
					{% endif %}
				{% endif %}
				{#{% if scrapedJob === true %}#}
					{#<td>{{ job.source }}</td>#}
				{#{% else %}#}
					{#<td>{{ job.poster.fullname }}</td>#}
				{#{% endif %}#}
				<td data-order="{{ job.closing_date | date('Y/m/d') }}">{{ job.closing_date | date('d.m.Y') }}</td>
				<td class="opt-icons text-center">
					<div class="btn-group">
						<button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Menu &nbsp;<span class="caret"></span>
						</button>
						<ul class="dropdown-menu dropdown-menu-right">
							{% if scrapedJob === true %}
								<li><a href="{{ job.job_url }}" target="_blank"><i class="fa fa-eye"></i> View Job</a></li>
								<li><a href="#moveJobToCompanyModal" data-toggle="modal" class="pick-job-id"><i class="fa fa-briefcase"></i>Transfer to Company</a></li>
							{% endif %}
							<li><a href="/job/editjob/{{ job.id }}" class="edit-job"><i class="fa fa-pencil"></i> Edit Job</a></li>
							<li><a href="" class="upload-csv"><i class="fa fa-file-text-o"></i>Upload Applicants</a></li>
						</ul>
					</div>
						{#<a href="" class="del-job btn btn-secondary btn-xs btn-fill btn-danger" rel="tooltip" title="Delete Job"><i class="fa fa-trash-o fa-lg"></i></a>#}
				</td>
			</tr>
		{% endfor %}
		</tbody>
		{% if scrapedJob === true %}
			<tfoot>
				<tr>
					<td class="" colspan="10">
						<div class="btn-group">
							<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
								Action &nbsp;<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a href="" class="move-to-jobBoard"><i class="fa fa-briefcase fa-fw"></i> &nbsp;Move to Job Board</a></li>
								<li><a href="" class="delete-jobs"><i class="fa fa-trash-o fa-fw"></i> &nbsp;Remove Jobs(s)</a></li>
							</ul>
						</div>
					</td>
				</tr>
			</tfoot>
		{% endif %}
	</table>
</div>