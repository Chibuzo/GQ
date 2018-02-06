<form action="/gqtest/savetest" method="post" id="form-test">
	<div class="form-group">
		<label>Test Name</label>
		<input type="text" name="test_name" id="test_name" class="form-control" value="{{ test.test_name }}" required/>
	</div>
	<div class="form-group hidable">
		<div class="row">
			<div class="col-md-4">
				<label>Test Category</label>
				<select name="category" class="form-control" required>
					<option value="">-- Select Test Category --</option>
					<option value="Aptitude Test">Aptitude Test</option>
					<option value="IQ Test">IQ Test</option>
					<option value="Quantitative Test">Quantitative Test</option>
				</select>
			</div>
			<div class="col-md-4">
				<label>Difficulty Level</label>
				<select name="difficulty" class="form-control" required>
					<option value="">-- Select Difficulty Level --</option>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
			</div>
			<div class="col-md-4">
				<label>Test Duration</label>
				<input type="text" name="duration" class="form-control" value="{{ test.duration }}" placeholder="Test duration" required />
			</div>
		</div>
	</div>
	<div class="form-group hidable">
		<label>Instructions</label>
		<textarea name="instructions" rows="7" class="form-control editor">{{ test.instructions }}</textarea>
	</div>

	<div class="form-group hidable hidden">
		<div class="row">
			<div class="col-md-6">
				<label></label>
				<label class="radio">Extract Questions from Excel<input name="add_question_type" type="radio" class="form-control" data-toggle="radio" value="excel" /></label>
			</div>
			<div class="col-md-6">
				<label></label>
				<label class="radio">Add Questions Manually<input name="add_question_type" type="radio" class="form-control" data-toggle="radio" value="manual" checked /></label>
			</div>
		</div>
	</div>

	<div class="form-group hidden hidable" id="upload-div">
		<label>Include Excel File</label>
		<input type="file" name="excelsheet" class="form-control-file" />
	</div>


	<input type="hidden" name="test_id" id="test-id" value="{{ test.id }}"/>

	<div class="form-group text-right hidable">
		<button type="reset" class="btn btn-default reset-btn">
			<i class="fa fa-refresh"></i> Reset
		</button>
		{#<button type="button" class="btn btn-info add-quest-btn">#}
			{#<i class="fa fa-plus"></i> Add Question#}
		{#</button>#}
		<button type="submit" class="btn btn-info">
			<i class="fa fa-save"></i> Save Test
		</button>
	</div>
</form>