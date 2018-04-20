<table class="table table-striped tablebordered">
	<thead>
	{% if req.session.coy_id %}
	<tr>
		<td colspan="6">
			<button type="button" class="btn btn-success btn-fill action-btn pull-right" disabled><i class="fa fa-check-circle"></i>&nbsp;Accept</button>
		</td>
	</tr>
	{% endif %}
	<tr>
		<th style="width: 30px"></th>
		<th stle="width: 95%"><i class="fa fa-user"></i> Candidate</th>
		<th>Aptitude Test</th>
		<th>Competency Test</th>
		<th>Status</th>
		<th class="text-center"><input type="checkbox" class="group-check" /></th>
	</tr>
	</thead>
	<tbody id="tb-users">
	{% for candidate in selected_candidates %}
		<tr data-candidate_id="{{ candidate.applicant.id }}">
			<td style="width: 30px"></td>
			<td>&nbsp;
				<a target="_blank" href="/applicant/resume-user/{{candidate.applicant.id}}" class="view-resume" rel="tooltip" title="" data-original-title="View Resume">
					{{ candidate.applicant.fullname }}
				</a>
			</td>
			<td>{{ candidate.percentage }}%</td>
			<td>{{ candidate.score }}</td>
			<td>{{ candidate.status }}</td>
			{% if req.session.admin %}
				<td class="text-center"><a href="" class="btn btn-danger btn-xs btn-fill unselect-candidate" rel="tooltip" title="Remove Candidate"><i class="fa fa-times fa-lg"></i></a></td>
			{% else %}
				<td class="text-center"><input type="checkbox" class="user-checkbox" /></td>
			{% endif %}
		</tr>
	{% endfor %}
	</tbody>
	{% if req.session.coy_id %}
		<tfoot>
		<tr>
			<td colspan="6">
				<button type="button" class="btn btn-success btn-fill action-btn pull-right" disabled><i class="fa fa-check-circle"></i>&nbsp;Accept</button>
			</td>
		</tr>
		</tfoot>
	{% endif %}
</table>