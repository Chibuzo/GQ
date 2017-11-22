<form action="/gqtest/save" method="post" id="form-job">
	<div class="form-group">
		<label>Test Name</label>
		<input type="text" name="test_name" class="form-control" value="{{ test.test_name }}" required/>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label>Test Category</label>
				<select name="category" class="form-control" required>
					<option value="">-- Select Test Category --</option>
					<option value="Aptitude Test">Aptitude Test</option>
					<option value="IQ Test">IQ Test</option>
					<option value="Quantitative Test">Quantitative Test</option>
				</select>
			</div>
			<div class="col-md-6">
				<label>Test Duration</label>
				<input type="text" name="duration" class="form-control" placeholder="Test duration" />
			</div>
		</div>
	</div>
	<div class="form-group">
		<label>Instructions</label>
		<textarea name="instruction" rows="7" class="form-control editor" required>{{ test.instruction }}</textarea>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label>Extract Questions from Excel</label>
				<label class="radio"><input name="add_question_type" type="radio" class="form-control" data-toggle="radio" value="excel" /></label>
			</div>
			<div class="col-md-6">
				<label>Add Questions Manually</label>
				<label class="radio"><input name="add_question_type" type="radio" class="form-control" data-toggle="radio" value="manual" /></label>
			</div>
		</div>
	</div>

	<div class="form-group">
		<label>Nice-to-have</label>
		<textarea name="nice_to_have" class="form-control editor">{{ job.nice_to_have }}</textarea>
	</div>


	<input type="hidden" name="test_id" id="test-id" value="{{ test.id }}"/>

	<div class="form-group text-right">
		<button type="reset" class="btn btn-default btn-lg">
			<i class="fa fa-refresh"></i> Clear fields
		</button>
		<button type="submit" class="btn btn-info btn-lg">
			<i class="fa fa-save"></i> Save Job
		</button>
	</div>
</form>