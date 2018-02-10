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
							<h2 class="text-center" style="color: #fff">Sign In</h2><br>
							<form action="/user/login" method="post" class="form-vertical" id="signin">
								<div class="form-group text-left">
									<label>Email</label>
									<input type="email" name="email" class="form-control input-lg" required />
								</div>
								<div class="form-group text-left">
									<label>Password</label>
									<input type="password" name="password" class="form-control input-lg" required />
								</div>
								<p class="text-left">Forgot your passowrd? <a href="" class="show-forgot-pswd">Click here</a></p>
								<input type="hidden" name="return_url" value="{{ return_url }}" />
								<div class="alert alert-danger hidden"></div>
								<button type="submit" class="btn btn-info input-lg btn-block"><i class="fa fa-sign-in fa-lg"></i>&nbsp; Sign In </button>
							</form><br>
							<p>Not yet a member? <a href="/signup">Sign Up</a></p>
						</div>

						<div id="reset-password" class="hidden">
							<h2 class="text-center" style="color: #fff">Reset Password</h2><br>
							<form action="/user/sendPswdResetEmail" method="post" class="form-vertical" id="reset-pswd">
								<div class="form-group text-left">
									<label>Email</label>
									<input type="email" name="email" class="form-control input-lg" placeholder="Enter the email you signed up with" required />
								</div>

								<div class="alert hidden" id="pswd-alert"></div>
								<button type="submit" class="btn btn-info input-lg btn-block"><i class="fa fa-sign-in fa-lg"></i>&nbsp; Continue </button>
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
	$(".navbar-right li:contains('Sign In')").addClass('active');

	$("#signin").submit(function (e) {
		e.preventDefault();
		var $this = $(this);

		$(this).find('button').html("<i class='fa fa-cog fa-spin'></i> Processing").prop('disabled', true);

		$.post('/user/login', $(this).serialize(), function (d) {
			if (d.status.trim() == 'success') {
				location.replace(d.url.trim());
			} else {
				$(".alert-danger").html("<strong>Error:</strong> " + d.msg).removeClass('hidden');
			}
			$this.find('button').html("<i class='fa fa-sign-in fa-lg'></i>&nbsp; Sign").prop('disabled', false);
		}, 'JSON');
	});

	$(".show-forgot-pswd").click(function(e) {
		e.preventDefault();

		$(".home-content").fadeOut('fast', function() {
			$("#reset-password").hide().removeClass('hidden').fadeIn('fast');
		});
	});


	$("#reset-pswd").submit(function(e) {
		e.preventDefault();
		$.post('/user/sendPswdResetEmail', $(this).serialize(), function(d) {
			if (d.status.trim() == 'success') {
				$("#pswd-alert").addClass('alert-success').text('A passowrd reset link has been sent to your email.').removeClass('hidden');
			} else {
				$("#pswd-alert").addClass('alert-danger').text(d.msg).removeClass('hidden');
			}
		});
	});
});
</script>
{% endblock %}
