{% extends '../theme.swig' %}
{% set title = 'Admin Login' %}
{% block body %}

{% block backgroud %}
<div class="bg-img" style="background-image: url('/images/admin-bg.jpg');">
	<div class="overlay"></div>
</div>
{% endblock %}
<div class="home-wrapper">
	<section class="container" stle="margin-top: 70px; margin-bottom: 100px">
		<div class="row">
			<div class="col-md-6 col-md-offset-3 auth-panel">
				<h2 class="text-center" style="color: #fff">Authentication</h2><br>
				<form action="" method="post" class="form-vertical" id="signin">
					<div class="form-group text-left">
						<label>EMAIL</label>
						<input type="email" name="email" class="form-control input-lg" required />
					</div>
					<div class="form-group text-left">
						<label>PASSWORD</label>
						<input type="password" name="password" class="form-control input-lg" required />
					</div>
					<div class="alert alert-danger hidden"></div>
					<button type="submit" class="btn btn-default input-lg btn-block"><i class="fa fa-sign-in fa-lg"></i>&nbsp; SIGN IN </button>
				</form>
			</div>
		</div>
	</section>
</div>
</header>	
{% endblock %}

{% block scriptTag %}
<script>

	$("#signin").submit(function(e) {
		e.preventDefault();
		var $this = $(this);

		$(this).find('button').html("<i class='fa fa-cog fa-spin'></i> Processing").prop('disabled', true);

		$.post('/admin/login', $(this).serialize(), function(d) {
			if (d.status.trim() == 'success') {
				if (d.admin_type == 'test') {
					location.replace('/gqtest/manage');
				} else {
					location.replace('/company-request/view-requests');
				}
			} else {
				$(".alert-danger").html("<strong>Error:</strong> " + d.msg).removeClass('hidden');
			}
			$this.find('button').html("<i class='fa fa-sign-in fa-lg'></i>&nbsp; SIGN IN").prop('disabled', false);
		}, 'JSON');
	});
</script>
{% endblock %}
