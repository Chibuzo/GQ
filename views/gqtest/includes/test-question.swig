<form action="/gqtest/savequestion" method="post" id="form-question" enctype="multipart/form-data">
	<div id="manual-question">
		<div class="form-group">
			<label>Question</label>
			<textarea name="question" id="question" rows="4" class="form-control editor"></textarea>
		</div>

		<div class="form-group">
			<label>Question Image</label><br>
			<button class="btn btn-fill btn-info" id="attach-file">Attach Image file</button>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-6">
					<label>Option A</label>
					<input type="text" name="opt_a" id="opt_a" class="form-control" placeholder="Option A" />
				</div>
				<div class="col-md-6">
					<label>Option B</label>
					<input type="text" name="opt_b" id="opt_b" class="form-control" placeholder="Option B" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<label>Option C</label>
					<input type="text" name="opt_c" id="opt_c" class="form-control" placeholder="Option C" />
				</div>
				<div class="col-md-6">
					<label>Option D</label>
					<input type="text" name="opt_d" id="opt_d" class="form-control" placeholder="Option D" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<label>Option E</label>
					<input type="text" name="opt_e" id="opt_e" class="form-control" placeholder="Option E" />
				</div>
				<div class="col-md-6">
					<label>Answer</label>
					<select name="answer" class="form-control" required>
						<option value="">-- Choose Answer --</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
					</select>
				</div>
				<div class="col-md-6"></div>
			</div>
			<input type="hidden" name="test_id" id="test-id" value="{{ test.id }}"/>
			<input type="file" name="question_image" id="question_image" class="form-control-file hidden" />
		</div>
		<div class="form-group text-right">
			<button class="btn btn-default hidden" id="done"> Done <i class="fa fa-check-circle-o"></i></button>
			<button class="btn btn-primary" id="next-question"> &nbsp; Next Question <i class="fa fa-caret-right"></i></button>
		</div>
	</div>
</form>