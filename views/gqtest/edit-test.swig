{% extends '../admin/layout.swig' %}
{% set title = 'Create New Test' %}
{% block page_title %}
	<i class="pe-7s-edit"></i> &nbsp;Edit Text
{% endblock %}

{% block body %}
<style>
	.plus-btn {
		position: relative;
		top: 35px;
		margin-left: 10px;
	}

	.addable {
		display: none;
	}

	fieldset {
		margin-top: 23px;
	}

	.questions {
		padding: 20px;
		overflow: auto;
	}

	.question-div {
		padding-left: 26px;
	}

	.question {
		float: left;
		width: 45px;
		height: 45px;
		margin: 5px;
		border-radius: 50%;
		padding-left: 17px;
		padding-top: 12px;
		font-size: 15px;
		border: #ccc solid thin;
		cursor: pointer;
	}

	.question:hover {
		border-color: #999;
	}

	.active_q {
		background-color: #A37F2D;
		color:#fff;
	}

	ul.opts {
		list-style-type: none;
	}

	ul.opts .radio {
		display: inline;
	}
	
	.reset-btn, #form-update-question {
		display: none;
	}

	.mce-branding {
		font-size: 0;
	}
</style>
<div class="content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="header">
						<h4 class="title"><i class="fa fa-edit"></i>&nbsp; Edit Selected Test</h4>
					</div><br>
					<div class="content">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#details" data-toggle="tab"> &nbsp;Edit Test</a></li>
							<li><a href="#new-question" data-toggle="tab"><i class="fa fa-plus"></i> &nbsp;Add New Questions</a></li>
							<li><a href="#edit-question" data-toggle="tab"> &nbsp;Edit Questions</a></li>
						</ul>
						<div class="tab-content">
						  	<div class="tab-pane fade active in" id="details">
								<div class="row">
									<div class="col-md-12" style="padding: 50px">
										{% include 'includes/test-form.swig' %}
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="new-question">
								<div class="row">
									<div class="col-md-12" style="padding: 50px">
										{% include 'includes/test-question.swig' %}
									</div>
								</div>
							</div>

							<div class="tab-pane fade in" id="edit-question">
								<div class="row">
									<div class="col-md-12">
										<div class="questions">
											{% set n = 0 %}
											{% for quest in test.questions %}
												{% set n = n + 1 %}
												<div class="question" id="{{ quest.id }}">{{ n }}</div>
											{% endfor %}
										</div>

										<div class="question-view clearfix">
											<form action="/gqtest/savequestion" method="post" id="form-update-question" enctype="multipart/form-data">
												<div id="manual-question">
													<div class="form-group">
														<label>Question 1</label>
														<textarea name="question" id="_question" rows="4" class="form-control editor"></textarea>
													</div>

													<div class="form-group">
														<label>Question Image</label><br>
														<button class="btn btn-fill btn-info" id="_attach-file">Attach Image file</button>
													</div>

													<div class="form-group">
														<div class="row">
															<div class="col-md-6">
																<label>Option A</label>
																<input type="text" name="opt_a" id="opt-a" class="form-control" placeholder="Option A" />
															</div>
															<div class="col-md-6">
																<label>Option B</label>
																<input type="text" name="opt_b" id="opt-b" class="form-control" placeholder="Option B" />
															</div>
														</div>
														<div class="row">
															<div class="col-md-6">
																<label>Option C</label>
																<input type="text" name="opt_c" id="opt-c" class="form-control" placeholder="Option C" />
															</div>
															<div class="col-md-6">
																<label>Option D</label>
																<input type="text" name="opt_d" id="opt-d" class="form-control" placeholder="Option D" />
															</div>
														</div>
														<div class="row">
															<div class="col-md-6">
																<label>Option E</label>
																<input type="text" name="opt_e" id="opt-e" class="form-control" placeholder="Option E" />
															</div>
															<div class="col-md-6">
																<label>Answer</label>
																<select name="answer" id="_answer" class="form-control" required>
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
														<input type="hidden" name="test_id" id="_test_id" />
														<input type="hidden" name="question_id" id="_question_id" />
														<input type="hidden" name="image_file" id="image-file" />
														<input type="file" name="question_image" id="_question_image" class="form-control-file hidden" />
													</div>
													<div class="form-group">
														<button type="button" class="btn btn-danger" id="delete-question"><i class="fa fa-trash-o"></i>&nbsp; Delete Question </button>
														<button type="submit" class="btn btn-primary pull-right" id="update-question"> &nbsp; Update Question </button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestBackend.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	var category = {{ test.category | json | safe }};
	$("select[name=category]").find('option').filter(function(i) {
		return category == $(this).val();
	}).attr("selected", "selected");

	var difficulty = {{ test.difficulty | json | safe }};
	$("select[name=difficulty]").find('option').filter(function(i) {
		return difficulty == $(this).val();
	}).attr("selected", "selected");

	// edit question
	$("#edit-question").click(function() {

	})
});
</script>
{% endblock %}