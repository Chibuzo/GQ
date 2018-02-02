<form action="/course/save" method="post" id="form-job">
	<div class="form-group">
		<label>Course Title</label>
		<input type="text" name="course_title" class="form-control" value="{{ course.course_title }}" required/>
	</div>
	<div class="form-group">
		<label>Course Category</label>
		<select name="category" class="form-control">
			<option value="">-- Select Course Category --</option>
			{% for cat in coursecategories %}
				<option value="{{ cat.id }}">{{ cat.category }}</option>
			{% endfor %}
		</select>
	</div>
	<div class="form-group">
		<label>Course Abstract</label>
		<textarea name="abstract" rows="7" class="form-control" required>{{ course.abstract }}</textarea>
	</div>

	<div class="form-group">
		<label>Course Body</label>
		<textarea name="body" rows="7" class="form-control editor" required>{{ course.body }}</textarea>
	</div>

	<input type="hidden" name="course_id" id="course-id" value="{{ course.id }}"/>

	<div class="form-group text-right">
		<button type="reset" class="btn btn-default btn-lg">
			<i class="fa fa-refresh"></i> Clear fields
		</button>
		<button type="submit" class="btn btn-info btn-lg">
			<i class="fa fa-save"></i> Save Course
		</button>
	</div>
</form>