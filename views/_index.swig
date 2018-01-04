{% extends 'theme.swig' %}
{% set title = 'Welcome to GQ' %}
{% block body %}
<style>
@media screen and (min-width: 1200px) and (max-width: 2000px) {
	.gq-container {
		width: 1320px;
		margin: auto;
	}

	.feature-row {
		margin-top: 190px;
	}
}

header {
	background: url('/images/gq.jpg') no-repeat;
	background-position: center center;
	background-size: cover;
	min-height: 600px;
}

header h1, header h4 {
	color: #fff;
}

.white {
	color: #fff;
}

.gold {
	color: #A37F2D;
}

#about {
	background: #f0f0f0;
	padding: 40px 20px;
	font-size: 17px;
	font-weight: 100;
	line-height: 25px;
	text-align: center;
}

#service {
	padding: 50px 10px;
	text-align: center;
}

#service h3 {
	margin-top: 8px;
	margin-bottom: 20px;
	font-size: 25px;
	font-weight: 400;
	color: #3c3c3c;
}

#service .fa {
	font-size: 31px;
	color: #A37F2D;
	border: #A37F2D solid;
	padding: 22px;
	width: 80px;
	height: 78px;
	border-radius: 50%;
	margin-bottom: 15px;
}

#services .fa {
	font-size: 36px;
}

#service p {
	padding: 10px;
	font-size: 16px;
	line-height: 25px;
	margin: 1px 5px;
	font-weight: 100;
}

#misc {
	padding: 50px 10px;
}

.misc-div {
	min-height: 350px;
}

.misc-div p {
	font-size: 17px;
	font-weight: 400;
	padding: 10px;

}

#support {
	padding: 50px 10px;
}
</style>
<!-- Banner -->
<header>
	<nav class="navbar navbardefault main-nav">
		<div class="gq-container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbarbrand" href="#"><img src="/images/logo.png" id="logo"/></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a href="/">Home <span class="sr-only">Home</span></a></li>
					<li><a href="#">About</a></li>
					<li><a href="/courses">Courses</a></li>
					<li><a href="/login">Login</a></li>
					<li><a href="/signup" class="btn btn-default">Sign Up</a> </li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="feature-row">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 text-center">
					<h1>Recruiting should be simple, quick and data driven</h1>
					<h4>Hire the best candidates quickly</h4>
					<a href="#" class="btn btn-lg btn-danger">Learn More</a>
					<a href="#requestModal" data-toggle="modal" class="btn btn-lg btn-primary">Get Started</a>
				</div>
			</div>
		</div>
	</div>
</header>

<section id="about">
	<div class="container">
		<div class="row">
			<div class="col-md-8  col-md-offset-2">
				We do the hard work so you don’t have to. Post your open jobs on any platform. We gather, analyse and screen the best candidates from your application pool using our proprietary testing and machine learning software.
			</div>
		</div>
	</div>
</section>

<section id="service">
	<div class="container">
		<div class="row" style="margin-bottom: 25px">
			<div class="col-md-12">
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<div class="service-div">
					<i class="fa fa-certificate"></i>
					<h3>Assess</h3>
					<p>Our online testing system provides an accurate intelligence and competency profile of each job applicant in as little as 24 hours, so you can make significantly better, and faster hiring decisions</p>
				</div>
			</div>

			<div class="col-md-4">
				<div class="service-div">
					<i class="fa fa-briefcase"></i>
					<h3>Hire</h3>
					<p>Automated ranking of the applicants in order to identify the top candidates. View candidate video profiles at your convenience and share promising profiles with colleagues. Reduce the time you spend recruiting by 70%
					</p>
				</div>
			</div>

			<div class="col-md-4">
				<div class="service-div">
					<i class="fa fa-thumbs-o-up"></i>
					<h3>Improve</h3>
					<p>Train new hires and refresh the knowledge of existing workers through our portfolio of soft skills and job based training. Can’t find the course you want on our platform? Simply let us know and we will build the appropriate course for you
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="misc">
	<div class="container">
		<div class="row">
			<div class="col-md-6 misc-div" style="background: url('/images/our_process.jpg') no-repeat; background-size: cover">
				<p class="white">
					Our products work together so you attract and hire the best candidates very easily, from posting to interviewing.
				</p>
			</div>
			<div class="col-md-6 misc-div" style="background: url('/images/get_intouch.jpg') no-repeat; background-size: cover">
				<p class="gold">How do you currently hire? We will like to learn and help you refine the process. Talk to us.
					Email: getstarted@getqualified.com Phone: 0803-987-9898.
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<p>Our support team is always on standby</p>
			</div>
			<div class="col-md-6 misc-div" style="background: url('/images/we_help.jpg') no-repeat; background-size: cover">
				<p>
					We care deeply about improving the recruitment process for businesses everywhere. It is currently difficult to ensure
					employee quality, expensive and takes too much time. It doesn’t have to be this way. We are here to work with you to help
					you hire the best talent.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="support">
	<div class="container">
		{#<div class="row">#}
			{#<div class="col-md-6">#}
				{#<p>Our support team is always on standby</p>#}
			{#</div>#}
			{#<div class="col-md-6 misc-div" style="background: url('/images/we_help.jpg') no-repeat; background-size: cover">#}
				{#<p>#}
					{#We care deeply about improving recruiting efforts for local businesses everywhere. It is currently difficult, convoluted,#}
					{#expensive and takes too much time. It doesn’t have to be this way. We are here to work with you to help you hire the best#}
					{#talents.#}
				{#</p>#}
			{#</div>#}
		{#</div>#}
	</div>
</section>

{% include 'company/includes/request-form.swig' %}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
	$(document).ready(function() {
		$("#form-request-access").submit(function(e) {
			e.preventDefault();

			$.post('/company-request/send-request', $(this).serialize(), function(d) {
				if (d.status.trim() == 'success') {
					$(".modal-body").html("<div class='alert alert-info'>Thank you for sending in a request. We'll contact you shortly.</div>");
					$(".modal-footer").html('<button type="button" class="btn btn-default close-modal" data-dismiss="modal">Close</button>')
				}
			});
		});
	});
</script>
{% endblock %}