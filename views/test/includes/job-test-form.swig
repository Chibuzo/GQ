<div class="modal fade in" id="testModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Add Job</h4>
			</div>

			<form action="/job/add-test" method="post" id="form-job">
				<div class="modal-body">
					<div class="form-group">
						<div class="row">
							<div class="col-md-6">
								<label>Job Category</label>
								<select name="job_category" class="form-control" required>
									<option value=""></option>
									{% for jobcat in job_categories %}
										<option value="{{ jobcat.id }}">{{ jobcat.category }}</option>
									{% endfor %}
								</select>
							</div>
							<div class="col-md-6">
								<label>Job Level</label>
								<select name="job_level" id="job_level" class="form-control">
									<option value=""></option>
									<option value="Entry">Entry Level</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Professional">Professional</option>
								</select>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>Test List</label>
						<select name="test[]" class="form-control" required>
							<option value=""></option>
							{% for test in tests %}
								<option value="{{ test.id }}">{{ test.test_name }}</option>
							{% endfor %}
						</select>
					</div>
					<div class="form-group">
						<label>Test title</label>
						<input name="test_title" type="text" class="form-control" placeholder="GQ title as seen by candidates" />
					</div>
					<input type="hidden" name="category" />
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

