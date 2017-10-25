<div class="modal fade in" id="jobModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Add Job</h4>
			</div>

			<form action="/job/add-new" method="post" id="form-job">
				<div class="modal-body">
					<div class="form-group">
						<label>Job Title</label>
						<input type="text" name="title" class="form-control" required />
					</div>
					<div class="form-group">
						<label>Job Description</label>
						<textarea name="description" class="form-control" required></textarea>
					</div>

					<div class="form-group">
						<label>Job Requirements</label>
						<textarea name="requirements" class="form-control editor"></textarea>
					</div>

					<div class="form-group">
						<label>Nice-to-have</label>
						<textarea name="nice_to_have" class="form-control editor"></textarea>
					</div>

					<div class="form-group">
						<div class="row">
							<div class="col-md-6">
								{#<label>Publish</label>#}
								{#<select name="publish_now" class="form-control">#}
									{#<option value="1">Publish Now</option>#}
									{#<option value="0">Publish Later</option>#}
								{#</select>#}
								<label>Job Level</label>
								<select name="job_level" class="form-control">
									<option value=""></option>
									<option value="Entry">Entry Level</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Professional">Professional</option>
								</select>
							</div>
							<div class="col-md-6">
								<label>Closing Date</label>
								<input name="closing_date" type="text" class="form-control datep" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times"></i> Cancel
					</button>
					<button type="submit" class="btn btn-info">
						<i class="fa fa-save"></i> Submit
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

