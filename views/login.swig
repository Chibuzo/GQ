{% extends 'theme.swig' %}
{% set title = 'User Login' %}
{% block body %}
	<section class="container" style="margin-top: 20px">
		<div class="row">
			<div class="col-md-6 col-md-offset-3 auth-panel">
				<h2 class="text-center">Authentication</h2><br>
				<form action="/user/login" method="post" class="form-vertical" id="sgnin">
					<div class="form-group">
						<label>Email</label>
						<input type="email" name="email" class="form-control input-lg" required />
					</div>
					<div class="form-group">
						<label>Password</label>
						<input type="password" name="password" class="form-control input-lg" required />
					</div>
					<input type="hidden" name="return_url" value="{{ return_url }}" />
					<div class="alert alert-danger hidden"></div>
					<button type="submit" class="btn btn-default input-lg btn-block"><i class="fa fa-sign-in fa-lg"></i>&nbsp; Sign In </button>
				</form>
				<p>Not yet a member? <a href="/signup">Sign Up</a></p>
			</div>
		</div>
	</section>
{% endblock %}

{% block scriptTag %}
<script>

	$("#signin").submit(function(e) {
		e.preventDefault();
		var $this = $(this);

		$(this).find('button').html("<i class='fa fa-cog fa-spin'></i> Processing").prop('disabled', true);

		$.post('/admin/login', $(this).serialize(), function(d) {
			if (d.status.trim() == 'Ok') {
					location.replace('/admin/dashboard');
			} else {
				$(".alert-danger").html("<strong>Error:</strong> " + d.msg).removeClass('hidden');
			}
			$this.find('button').html("<i class='fa fa-sign-in fa-lg'></i>&nbsp; Sign").prop('disabled', false);
		}, 'JSON');
	});
</script>
{% endblock %}
