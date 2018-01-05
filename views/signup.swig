{% extends 'theme.swig' %}
{% set title = 'Signup New User' %}
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
							<h2 class="text-center" style="color: #fff">Candidate Sign Up</h2><br><br>
							<form action="/user/signup" method="post" class="form-vertical" id="signup">
								<div class="form-group text-left">
									<label>Fullname</label>
									<div class="row">
										<div class="col-md-6">
											<input type="text" name="fname" class="form-control input-lg" placeholder="First name" required />
										</div>
										<div class="col-md-6">
											<input type="text" name="lname" class="form-control input-lg" placeholder="Last name" required />
										</div>
									</div>
								</div>
								<div class="form-group text-left">
									<label>Email</label>
									<input type="email" name="email" class="form-control input-lg" placeholder="Email Address" required />
								</div>
								<input type="hidden" name="return_url" value="{{ return_url }}" />
								<div class="alert alert-danger hidden"></div>
								<button type="submit" class="btn btn-info input-lg btn-block">&nbsp; Sign Up </button>
							</form>
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

		$("#signup").submit(function(e) {
			e.preventDefault();
			var $this = $(this);

			$(this).find('button').html("<i class='fa fa-cog fa-spin'></i> Processing").prop('disabled', true);

			$.post('/user/signup', $(this).serialize() + '&user_type=Applicant', function(d) {
				if (d.status.trim() == 'success') {
					location.replace('/login');
				} else {
					$(".alert-danger").html("<strong>Error:</strong> " + d.msg).removeClass('hidden');
				}
				$this.find('button').html("&nbsp; Sign Up").prop('disabled', false);
			}, 'JSON');
		});
	</script>
{% endblock %}
