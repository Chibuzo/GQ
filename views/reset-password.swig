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
							<form action="/user/login" method="post" class="form-vertical" id="signin">
								<div class="form-group text-left">
									<label>New Password</label>
									<input type="password" name="new_password" id="new_password" class="form-control input-lg" required />
								</div>

								<div class="form-group text-left">
									<label>Retype Password</label>
									<input type="password" name="v_password" id="v_password" class="form-control input-lg" required />
								</div>
								<div class="alert alert-danger hidden"></div>
								<button type="submit" class="btn btn-info input-lg btn-block"><i class="fa fa-sign-in fa-lg"></i>&nbsp; Sign In </button>
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
		$.post('/user/resetPassword', $(this).serialize(), function(d) {
			if (d.status.trim() == 'success') {
				$("#pswd-alert").addClass('alert-success').text('Your password reset was successful. Please go to the sign in page to sign in');
			} else {
				$("#pswd-alert").addClass('alert-danger').text(d.msg);
			}
		});
	});
});
</script>
{% endblock %}
