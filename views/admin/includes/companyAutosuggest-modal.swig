<div class="modal fade in" id="moveJobToCompanyModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Select Company</h4>
			</div>

			<form action="/scrapedJob/claimJob" method="post" id="form-claimjob">
				<div class="modal-body">
					<div class="form-group">
                        <label for="company">Company Name</label>
                        <input type="text" name="company" id="company" class="form-control company" placeholder="Company name..." required />
                    </div>
                    <input type="hidden" name="job_id" id="job-id" />
                    <input type="hidden" name="coy_id" id="coy_id" />
                    <div class="alert alert-success hidden"></div>
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