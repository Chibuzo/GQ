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
		<textarea name="description" rows="7" class="form-control editor">{{ job.job_description }}</textarea>
	</div>

	<div class="form-group">
		<label>Main Responsibilities</label>
		<textarea name="requirements" class="form-control editor">{{ job.job_requirements }}</textarea>
	</div>

	<div class="form-group">
		<label>Qualifications</label>
		<textarea name="qualifications" class="form-control editor">{{ job.qualifications }}</textarea>
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
					<option value="Full time">Full time</option>
					<option value="Part time">Part time</option>
					<option value="Internship">Internship</option>
				</select>
			</div>
			<div class="col-md-4">
				<label>Closing Date</label>
				{% if job.closing_date %}
					<input name="closing_date" id="closing_date" type="text" value="{{ job.closing_date | date('Y-m-d') }}" class="form-control datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required/>
				{% else %}
					<input name="closing_date" id="closing_date" type="text" class="form-control datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required />
				{% endif %}
			</div>
		</div>
	</div>

	<fieldset>
		<legend>Salary Budget [ <small>Per annum</small> ]</legend>
		<div class="form-group">
			<div class="row">
				<div class="col-md-4">
					<label>Currency</label>
					<select name="currency" id="currency" class="form-control">
						<option value=""></option>
						<option value="NGN">NGN</option>
						<option value="USD">USD</option>
						<option value="EURO">EURO</option>
					</select>
				</div>
				<div class="col-md-4">
					<label>Minimum Salary Budget</label>
					<input type="number" name="min_salary_budget" class="form-control" value="{{ job.min_salary_budget }}" placeholder="Minimum Salary budget" />
				</div>
				<div class="col-md-4">
					<label>Maximum Salary Budget</label>
					<input type="number" name="max_salary_budget" class="form-control" value="{{ job.max_salary_budget }}" placeholder="Maximum Salary budget" />
				</div>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend></legend>
		<div class="form-group">
			<div class="row">
				<div class="col-md-4">
					{% if job.require_video %}
						{% set vchecked = "checked" %}
					{% endif %}
					<label class="checkbox {{ vchecked }}">
						<input type="checkbox" name="require_video" data-toggle="checkbox" {{ vchecked }} />Require Video Profile
					</label>
				</div>
				<div class="col-md-4">
					{% if job.require_test %}
						{% set tchecked = "checked" %}
					{% endif %}
					<label class="checkbox {{ tchecked }}">Require Aptitude Test
						<input type="checkbox" name="require_gqtest" data-toggle="checkbox" {{ tchecked }} />
					</label>
				</div>
			</div>
		</div>
	</fieldset><br>
	<input type="hidden" name="job_id" id="job-id" value="{{ job.id }}"/>
	<input type="hidden" name="coy_id" value="{{ coy_id }}" />

	<div class="form-group text-right">
		<button type="reset" class="btn btn-default btn-lg">
			<i class="fa fa-refresh"></i> Clear fields
		</button>
		<button type="submit" class="btn btn-info btn-lg">
			<i class="fa fa-save"></i> Save Job
		</button>
	</div>
</form>
