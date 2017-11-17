<!DOCTYPE HTML>

<html>
<head>
	<title>{{ title }} </title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	{#<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">#}
	<!--[if lte IE 8]><script src="/css/ie/html5shiv.js"></script><![endif]-->
	<link href="/styles/bootstrap.min.css" rel="stylesheet" />
	<link href="/styles/style.css" rel="stylesheet" />
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
	<style>
		.auth-panel {
			margin-top: 130px;
		}

		#header.alt {
			border: #ccc solid thin;
			padding: 34px 1px
		}
	</style>
</head>
<body class="landing">

<!-- Header -->


{% block body %} {% endblock %}
<!-- Footer -->
<footer id="footer">
	<div class="container-fluid">
		<div class="container hidden">
			<div class="row">
				<div class="col-md-3">
					<ul class="">
						<li><a href="#" class="fa-twitter"><span class="">Twitter</span></a></li>
						<li><a href="#" class="icon fa-facebook"><span class="">Facebook</span></a></li>
						<li><a href="#" class="icon fa-instagram"><span class="">Instagram</span></a></li>
					</ul>
				</div>

				<div class="col-md-3">
					<ul class="">
						<li><a href="#">FAQ</a></li>
						<li><a href="#">Terms of Use</a></li>
						<li><a href="#">Privacy</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center">
				<span class="copyright">
					&copy; Copyright. All rights reserved.
				</span>
			</div>
		</div>
	</div>
</footer>
</body>

<script src="/js/front/jquery.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
{#<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>#}
{% block scriptTag %} {% endblock %}
</html>