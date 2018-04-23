<div class="content table-responsive table-full-width">
	<table class="table table-striped tablebordered">
		<thead>
		{% if scrapedJob === true %}
		<tr>
			<td class="">
				<div class="btn-group">
					<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
						Action &nbsp;<span class="caret"></span>
					</button>
					<ul class="dropdown-menu">
						<li><a href=""><i class="fa fa-portfolio fa-fw"></i> &nbsp;Move to JobBoard</a></li>
						<li><a href="" class="delete-jobs"><i class="fa fa-trash-o fa-fw"></i> &nbsp;Remove Jobs(s)</a></li>
						<li><a>Don't touch me</a></li>
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
			<th>Contract Type</th>
			<th style="width: 60px">Applications</th>
			{#<th>Poster</th>#}
			{#<th>Status</th>#}
			<th>Closing Date</th>
			<th class="text-center">Action</th>
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
				<td>{{ job.createdAt | date('d.m.Y') }}</td>
				{% if scrapedJob === true %}
					<td><a href="/job/{{ job.id }}/{{ path | join('-') }}">{{ job.job_title }}</a></td>
					<td>{{ job.company_name }}</td>
				{% else %}
					<td>{{ job.job_title }}</td>
				{% endif %}
				<td>{{ job.job_level }}</td>
				<td>{{ job.contract_type }}</td>
				<td class="text-center"><a href="/job/view-applicants/{{ job.id }}">{{ applications }}</a></td>
				{#{% if scrapedJob === true %}#}
					{#<td>{{ job.source }}</td>#}
				{#{% else %}#}
					{#<td>{{ job.poster.fullname }}</td>#}
				{#{% endif %}#}
				<td>{{ job.closing_date | date('d.m.Y') }}</td>
				<td class="opt-icons text-center">
					<div class="button-group" role="group">
						{% if scrapedJob === true %}
							<a href="{{ job.job_url }}" class="btn btn-info btn-xs btn-fill"><i class="fa fa-eye"></i> </a>
						{% endif %}
							<a href="/job/editjob/{{ job.id }}" class="edit-job btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Edit Job"><i class="fa fa-pencil fa-lg"></i></a>
						{#{% endif %}#}
						{#<a href="#manageTestModal" data-toggle="modal" class="view-tests" rel="tooltip" title="Manage Tests"><i class="fa fa-book fa-lg"></i></a>#}
						<a href="" class="upload-csv btn btn-secondary btn-xs btn-fill" rel="tooltip" title="Add Candidates via CSV Upload"><i class="fa fa-file-text-o fa-lg"></i></a>
						{#<a href="/job/candidates/{{ job.id }}" class="btn btn-secondary btn-xs btn-fill" rel="tooltip" title="View Candidates"><i class="fa fa-users fa-lg"></i></a>#}
						{#<a href="" class="del-job btn btn-secondary btn-xs btn-fill btn-danger" rel="tooltip" title="Delete Job"><i class="fa fa-trash-o fa-lg"></i></a>#}
					</div>
				</td>
			</tr>
		{% endfor %}
		</tbody>
		{% if scrapedJob === true %}
			<tfoot>
				<tr>
					<td class="" colspan="9">
						<div class="btn-group">
							<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
								Action &nbsp;<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a href="" class="move-to-jobBoard"><i class="fa fa-briefcase fa-fw"></i> &nbsp;Move to JobBoard</a></li>
								<li><a href="" class="delete-jobs"><i class="fa fa-trash-o fa-fw"></i> &nbsp;Remove Jobs(s)</a></li>
							</ul>
						</div>
					</td>
				</tr>
			</tfoot>
		{% endif %}
	</table>
</div>