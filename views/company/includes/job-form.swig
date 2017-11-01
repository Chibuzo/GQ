<form action="/job/save" method="post" id="form-job">
	<div class="form-group">
		<label>Job Title</label>
		<input type="text" name="title" class="form-control" value="{{ job.job_title }}" required/>
	</div>
	<div class="form-group">
		<label>Job Category</label>
		<select name="category" class="form-control" required>
			<option value="">-- Select Job Category --</option>
			{% for cat in jobcategories %}
				<option value="{{ cat.id }}">{{ cat.category }}</option>
			{% endfor %}
		</select>
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
			<div class="col-md-6">
				{#<label>Publish</label>#}
				{#<select name="publish_now" class="form-control">#}
				{#<option value="1">Publish Now</option>#}
				{#<option value="0">Publish Later</option>#}
				{#</select>#}
				<label>Job Level</label>
				<select name="job_level" id="job_level" class="form-control">
					<option value=""></option>
					<option value="Entry">Entry Level</option>
					<option value="Intermediate">Intermediate</option>
					<option value="Professional">Professional</option>
				</select>
			</div>
			<div class="col-md-6">
				<label>Closing Date</label>
				<input name="closing_date" id="closing_date" type="text"value="{{ job.closing_date | date('d-m-Y') }}" class="form-control datep"/>
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