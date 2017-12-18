<div class="modal inmodal fade in" id="manageTestModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel"></h4>
			</div>

			<div class="modal-body">
				<table class="table table-striped tablebordered">
					<thead>
						<tr>
							<td>Test title</td>
							<td>Category</td>
							<td>Questions</td>
							<td>Duration</td>
						</tr>
					</thead>
					<tbody id="tb-tests">

					</tbody>
				</table>
				<div class='alert alert-info hidden'>No test has been assigned to this job</div>
				<div class="well">Candidate's rating is determined by 50 50</div>
				<div class="form-group">
					<input type="hidden" id="job_id" />
					<div class="row">
						<div class="col-md-5"><label>GQ Assessment</label><input type="number" class="form-control" id="gq_assessment" value="50"></div>
						<div class="col-md-5"><label>Job Assessment</label><input type="number" class="form-control" id="job_assessment" value="50"></div>
						<div class="col-md-2"><label>.</label><button class="btn btn-info" id="save-rating">Save</button> </div>
					</div>
				</div>
				<div class='alert alert-success hidden'>Operation successful</div>
			</div>

			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>