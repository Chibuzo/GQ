<div class="filter-div" style="display: none">
	<form method="get" id="form-filter" action="/applicants/search">
		<div class="form-group">
			<div class="col-md-3">
				<label>School</label>
				<input type="text" name="school" class="form-control" placeholder="Filter by school" value="{% if req.param('school') %} {{ req.param('school') }} {% endif %}" />
			</div>
			<div class="col-md-3">
				<label>Profession</label>
				<input type="text" name="course" class="form-control" placeholder="Profession or course of study" value="{% if req.param('course') %} {{ req.param('course') }} {% endif %}" />
			</div>
			<div class="col-md-2">
				<label>Result Grade</label>
				<select name="result" class="form-control">
					<option value="">Result</option>
					<option value="1">1st Class</option>
					<option value="2">2nd Class Upper</option>
					<option value="3">2nd Class Lower</option>
					<option value="4">3rd Class</option>
				</select>
			</div>
			<div class="col-md-3">
				<label>Certification</label>
				<input type="text" name="certification" class="form-control" placeholder="Filter by Certification" value="{% if req.param('certification') %} {{ req.param('certification') }} {% endif %}" />
			</div>
			<div class="col-md-1" style="padding-top: 30px">
				<button type="submit" class="btn btn-default btn-fill btn-block"><i class="fa fa-search"></i> Go!</button>
			</div>
		</div>
	</form>
</div>