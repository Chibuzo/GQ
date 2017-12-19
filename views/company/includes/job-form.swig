<form action="/job/save" method="post" id="form-job">
	<div class="form-group">
		<label>Job Title</label>
		<input type="text" name="title" class="form-control" value="{{ job.job_title }}" required/>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label>Job Category</label>
				<select name="category" class="form-control" required>
					<option value="">-- Select Job Category --</option>
					{% for cat in jobcategories %}
						<option value="{{ cat.id }}">{{ cat.category }}</option>
					{% endfor %}
				</select>
			</div>
			<div class="col-md-6">
				<label>Job Location</label>
				<div class="row">
					<div class="col-md-6">
						<select name="country" class="form-control" required>
							<option value="">-- Country --</option>
							{% for country in countries %}
								<option value="{{ country.country }}">{{ country.country }}</option>
							{% endfor %}
						</select>
					</div>
					<div class="col-md-6">
						<input type="text" name="location" placeholder="City, State" class="form-control" value="{{ job.location }}" />
					</div>
				</div>

			</div>
		</div>
	</div>
	<div class="form-group">
		<label>Job Description</label>
		<textarea name="description" rows="7" class="form-control" required>{{ job.job_description }}</textarea>
	</div>

	<div class="form-group">
		<label>Job Requirements</label>
		<textarea name="requirements" class="form-control editor">{{ job.job_requirements }}</textarea>
	</div>

	<div class="form-group">
		<label>Nice-to-have</label>
		<textarea name="nice_to_have" class="form-control editor">{{ job.nice_to_have }}</textarea>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-4">
				<label>Job Level</label>
				<select name="job_level" id="job_level" class="form-control" required>
					<option value=""></option>
					{#<option value="Entry">Entry Level</option>#}
					{#<option value="Intermediate">Intermediate</option>#}
					{#<option value="Professional">Professional</option>#}
					<option value="Entry">Entry Level</option>
					<option value="Associate">Associate</option>
					<option value="Senior">Senior</option>
					<option value="Manager">Manager</option>
					<option value="Director">Director</option>
					<option value="Executive">Executive</option>
				</select>
			</div>
			<div class="col-md-4">
				<label>Contract Type</label>
				<select name="contract_type" id="contract_type" class="form-control" required>
					<option value=""></option>
					<option value="Entry">Full time</option>
					<option value="Intermediate">Part time</option>
					<option value="Professional">Internship</option>
				</select>
			</div>
			<div class="col-md-4">
				<label>Closing Date</label>
				{% if job.closing_date %}
					<input name="closing_date" id="closing_date" type="text" value="{{ job.closing_date | date('Y-m-d') }}" class="form-control datep" required />
				{% else %}
					<input name="closing_date" id="closing_date" type="text" class="form-control datep" required />
				{% endif %}
			</div>
		</div>
	</div>
	<input type="hidden" name="job_id" id="job-id" value="{{ job.id }}"/>

	<div class="form-group text-right">
		<button type="reset" class="btn btn-default btn-lg">
			<i class="fa fa-refresh"></i> Clear fields
		</button>
		<button type="submit" class="btn btn-info btn-lg">
			<i class="fa fa-save"></i> Save Job
		</button>
	</div>
</form>