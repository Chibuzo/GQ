<div class="modal fade in" id="moveJobToCompanyModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Select Company</h4>
			</div>

			<form action="/company/claimJob" method="post" id="">
				<div class="modal-body">
					<div class="form-group">
                        <label for="fullname">Company Name</label>
                        <input type="text" name="company" id="fullname" class="form-control" placeholder="User's full name..." required />
                    </div>
                    <input type="hidden" name="job_id" id="job_id" />
                    <input type="hidden" name="coy_id" id="coy_id" />
                    <div class="alert alert-danger hidden"></div>
                </div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times"></i> Cancel
					</button>
					<button type="submit" class="btn btn-info btn-fill">
						<i class="fa fa-save"></i> Move Job
					</button>
				</div>
			</form>
		</div>
	</div>
</div>