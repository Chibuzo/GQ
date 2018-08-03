<table class="table table-striped tablebordered" id="shortlist">
	<thead>
	
	<!--<tr>
		<td colspan="6">
			<button type="button" class="btn btn-success btn-fill action-btn pull-right" disabled><i class="fa fa-check-circle"></i>Request for Interview</button>
		</td>
	</tr>-->
	
	<tr>
		<td colspan="4">
			<div class="btn-group">
				<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
					Action &nbsp;<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					{% if req.session.coy_id && job_paid != true %}
						{% set clas = 'disabled' %}
					{% else %}
						{% set clas = '' %}
					{% endif %}
					<li><a href="#emailModal" data-toggle="modal" class="{{ clas }}"><i class="fa fa-envelope fa-fw"></i> &nbsp;Send Email</a></li>
					{% if req.session.coy_id %}
						<li><a href="" class="req-interview-btn"><i class="fa fa-check-circle fa-fw"></i> &nbsp;Request for Interview</a></li>
					{% endif %}	
				</ul>
			</div>
		</td>
		<td colspan="4">
			{% if req.session.admin === true && job.paid !== true %}
				<button type="button" class="btn btn-success btn-fill enable-contact pull-right">Enable Contact</button>
			{% endif %}	
			{% if req.session.coy_id && req.session.admin !== true %} <a href="/company/dashboard" class="btn btn-danger pull-right"><i class="fa fa-caret-left"></i>Back to Jobs</a>{% endif %}
		</td>
	</tr>
	<tr>
		<th style="width:10px !important"><input type="checkbox" class="form-control shortlist-group-check" /></th>
		<th stle="width: 95%"><i class="fa fa-user"></i> Candidate</th>
		<th class="hidden">Email</th>
		<th>Aptitude Test</th>
		<th>Competency Test</th>
		<th>Status</th>
		{% if disableEdits %}
			<th></th>
		{% endif %}
	</tr>
	</thead>
	<tbody id="tb-users">
	{% for candidate in selected_candidates %}
		<tr data-candidate_id="{{ candidate.applicant.id }}">
			<td class="text-center"><input type="checkbox" class="user-checkbox" /></td>
			<td>&nbsp; 
				{% if req.session.coy_id && req.session.admin !== true %}
					{% set url = '/resume/view/' + candidate.applicant.id + '/' + job_id %}
				{% else %}
					{% set url = '/applicant/resume-user/' + candidate.applicant.id %}
				{% endif %}
				
				<a target="_blank" href="{{ url }}" class="view-resume" rel="tooltip" title="" data-original-title="View Resume">
					{{ candidate.applicant.fullname }}
				</a>
			</td>
			<td class="email hidden">{{ candidate.applicant.email }}</td>
			<td>{{ candidate.percentage }}%</td>
			<td>{{ candidate.score }}</td>
			<td>{{ candidate.status }}</td>
			{% if req.session.admin  %}
				{% if disableEdits %}
					<td></td>
				{% else %}
					<td class="text-center"><a href="" class="btn btn-danger btn-xs btn-fill unselect-candidate" rel="tooltip" title="Remove Candidate"><i class="fa fa-times fa-lg"></i></a></td>
				{% endif %}
				
			{% else %}
				<td></td>
			{% endif %}
		</tr>
	{% endfor %}
	</tbody>
	{% if req.session.coy_id %}
		<tfoot>
		<tr>
			
		</tr>
		</tfoot>
	{% endif %}
</table>