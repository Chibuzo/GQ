{% extends 'theme.swig' %}
{% set title = 'User Login' %}
{% block body %}

{% block backgroud %}
<div class="bg-img" style="background-image: url('/images/user-bg.jpg');">
	<div class="overlay"></div>
</div>
{% endblock %}
	<!-- home wrapper -->
		<div class="home-wrapper">
			<div class="container">
				<div class="row">

					<!-- home content -->
					<div class="col-md-6 col-md-offset-3 auth-panel">
						<div class="home-content">
							<h2 class="text-center" style="color: #fff">Reset Password</h2><br>
							<form action="/user/resetPassword" method="post" class="form-vertical" id="reset-pswd">
								<div class="form-group text-left">
									<label>New Password</label>
									<input type="password" name="new_password" id="new_password" class="form-control input-lg" required />
								</div>

								<div class="form-group text-left">
									<label>Retype Password</label>
									<input type="password" name="v_password" id="v_password" class="form-control input-lg" required />
								</div>
								<div class="alert hidden" id="pswd-alert"></div>
								<button type="submit" class="btn btn-info input-lg btn-block"><i class="fa fa-sign-in fa-lg"></i>&nbsp; Change Password </button>
							</form><br>
							<p>Not yet a member? <a href="/signup">Sign Up</a></p>
						</div>
					</div>
					<!-- /home content -->

				</div>
			</div>
		</div>
		<!-- /home wrapper -->

	</header>
	<!-- /Header -->

{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {

	$("#reset-pswd").submit(function(e) {
		e.preventDefault();

		if ($('#new_password').val() != $('#v_password').val()) {
			$("#pswd-alert").addClass('alert-danger').text("Password doesn't match! Retype password to continue.").removeClass('hidden');
			return false;
		}
		$.post('/user/resetPassword', $(this).serialize(), function(d) {
			if (d.status.trim() == 'success') {
				$("#pswd-alert").addClass('alert-success').html("Your password reset was successful. Please navigate to the sign in page to <a href='/login'>sign in</a>").removeClass('hidden');
			} else {
				$("#pswd-alert").addClass('alert-danger').text(d.msg).removeClass('hidden');
			}
		});
	});
});
</script>
{% endblock %}
