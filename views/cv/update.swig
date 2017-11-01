{% extends '../applicant/layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
	<i class="pe-7s-user"></i> &nbsp;My Profile
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
</style>
<div class="content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="header">
						<h4 class="title"><i class="fa fa-edit"></i>&nbsp; Edit Your Corporate Profile</h4>
					</div>
					<div class="row">
						<div class="col-md-12" style="padding: 50px">
							{% include 'includes/resume-form.swig' %}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	// add one row to institution
	$("#institutions").on("click", ".add-institution", function(e) {
		e.preventDefault();
		$("#another-inst").clone().insertBefore("#another-inst").slideDown().removeAttr("id");
		$(this).removeClass("add-institution").html("<i class='fa fa-minus'></i>").addClass("remove-institution-btn");
	});


	// remove one row from institutiob
	$("#institutions").on("click", ".remove-institution-btn", function(e) {
		e.preventDefault();
		$(this).parents(".inst-row").slideUp(function() {
			$(this).remove();
		});
	});

	// add one row to qualifications
	$("#qualifications").on("click", ".add-qualification", function(e) {
		e.preventDefault();
		$("#another-qualification").clone().insertBefore("#another-qualification").slideDown().removeAttr("id");
		$(this).removeClass("add-qualification").html("<i class='fa fa-minus'></i>").addClass("remove-qualification-btn");
	});


	// remove one row from qualifications
	$("#qualifications").on("click", ".remove-qualification-btn", function(e) {
		e.preventDefault();
		$(this).parents(".qual-row").slideUp(function() {
			$(this).remove();
		});
	});

	// add one row to emplyment
	$("#employments").on("click", ".add-employment", function(e) {
		e.preventDefault();
		$("#another-employment").clone().insertBefore("#another-employment").slideDown().removeAttr("id");
		$(this).removeClass("add-employment").html("<i class='fa fa-minus'></i>").addClass("remove-employment-btn");
	});


	// remove one row from employment
	$("#employments").on("click", ".remove-employment-btn", function(e) {
		e.preventDefault();
		$(this).parents(".employment-row").slideUp(function() {
			$(this).remove();
		});
	});


	// add one row to reference contact
	$("#referenceContacts").on("click", ".add-reference", function(e) {
		e.preventDefault();
		$("#another-reference").clone().insertBefore("#another-reference").slideDown().removeAttr("id");
		$(this).removeClass("add-reference").html("<i class='fa fa-minus'></i>").addClass("remove-reference-btn");
	});


	// remove one row from reference contact
	$("#referenceContacts").on("click", ".remove-reference-btn", function(e) {
		e.preventDefault();
		$(this).parents(".reference-row").slideUp(function() {
			$(this).remove();
		});
	});


	$("#form-resume").submit(function(e) {
		e.preventDefault();

		$("#btn-submit").html("<i class='fa fa-cog fa-spin'></i> Updating...").prop('disabled', true);
		$.post('/resume/update', $(this).serialize(), function(d) {
			if (d.status.trim() == 'success') {
				var msg = "Your corporate profile has been successfully updated!";
				showNotification('top', 'right', 'success', msg, 'pe-7s-bell');
			} else {
				showNotification('bottom', 'center', 'danger', d.msg, 'pe-7s-bell');
			}
			$("#btn-submit").html("Update Profile").prop('disabled', false);
		}, 'JSON');
	});
});
</script>
{% endblock %}