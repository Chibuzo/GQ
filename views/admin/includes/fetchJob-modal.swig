<div class="modal fade in" id="fetchJobModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Fetch Scraped Jobs</h4>
			</div>

			<form action="/fetchScrapedJobs" method="post">
				<div class="modal-body">
					<div class="form-group">
						<label>
						  <input type="checkbox" name="entry" />
						  &nbsp;Entry Level
						</label>
                    </div>

					<div class="form-group">
						<label>
							<input type="checkbox" name="experienced" />
							&nbsp;Experienced (Non-Manager)
						</label>
					</div>

					<div class="form-group">
						<label>
							<input type="checkbox" name="manager" />
							&nbsp;Manager
						</label>
					</div>

					<div class="form-group">
						<label>
							<input type="checkbox" name="executive" />
							&nbsp;Executive (CEO/COO)
						</label>
					</div>
                </div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default btnfill" data-dismiss="modal">
						<i class="fa fa-times"></i> Cancel
					</button>
					<button type="submit" class="btn btn-info btn-fill">
						<i class="fa fa-save"></i> Shall We?
					</button>
				</div>
			</form>
		</div>
	</div>
</div>