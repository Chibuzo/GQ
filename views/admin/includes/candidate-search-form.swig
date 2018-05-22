<div class="filter-div">
	<form method="get" id="form-filter" action="/applicants/search">
		<div class="form-group">
			<div class="col-md-4">
				<label>School</label>
				<input type="text" name="school" class="form-control" placeholder="Filter by school" value="{% if req.param('school') %} {{ req.param('school') }} {% endif %}" />
			</div>
			<div class="col-md-3">
				<label>Profession</label>
				<input type="text" name="course" class="form-control" placeholder="Filter by Profession or course of study" value="{% if req.param('course') %} {{ req.param('course') }} {% endif %}" />
			</div>
			<div class="col-md-3">
				<label>Certification</label>
				<input type="text" name="certification" class="form-control" placeholder="Filter by Certification" value="{% if req.param('certification') %} {{ req.param('certification') }} {% endif %}" />
			</div>
			<div class="col-md-2" style="padding-top: 30px">
				<button type="submit" class="btn btn-info btn-block"><i class="fa fa-search"></i> Filter Candidates</button>
			</div>
		</div>
	</form>
</div>