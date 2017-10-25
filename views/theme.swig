<!DOCTYPE HTML>

<html>
<head>
	<title>{{ title }} </title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!--[if lte IE 8]><script src="/css/ie/html5shiv.js"></script><![endif]-->
	<script src="/js/front/jquery.min.js"></script>
	<script src="/js/front/jquery.dropotron.min.js"></script>
	<script src="/js/front/jquery.scrollgress.min.js"></script>
	<script src="/js/front/jquery.scrolly.min.js"></script>
	<script src="/js/front/jquery.slidertron.min.js"></script>
	<script src="/js/front/skel.min.js"></script>
	<script src="/js/front/skel-layers.min.js"></script>
	<script src="/js/front/init.js"></script>
	<noscript>
		<link rel="stylesheet" href="/css/skel.css" />
		<link rel="stylesheet" href="/css/style.css" />
		<link rel="stylesheet" href="/css/style-xlarge.css" />
	</noscript>
	<!--[if lte IE 9]><link rel="stylesheet" href="/css/ie/v9.css" /><![endif]-->
	<!--[if lte IE 8]><link rel="stylesheet" href="/css/ie/v8.css" /><![endif]-->
</head>
<body class="landing">

<!-- Header -->
<header id="header" class="alt skel-layers-fixed">
	<h1><a href="index.html">GQ Logo <span></span></a></h1>
	<nav id="nav">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a> </li>
			<li><a href="/jobs">Jobs</a></li>
			<li><a href="/login">Login</a></li>
			<li><a href="/signup" class="btn btn-danger btn-lg">Sign Up</a> </li>
		</ul>
	</nav>
</header>
<style>
	.auth-panel {
		margin-top: 130px;
	}

	#header.alt {
		border: #ccc solid thin;
		padding: 34px 1px
	}
</style>
<body>
{% block body %} {% endblock %}
<!-- Footer -->
<footer id="footer">
	<ul class="icons">
		<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
		<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
		<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
	</ul>
	<ul class="menu">
		<li><a href="#">FAQ</a></li>
		<li><a href="#">Terms of Use</a></li>
		<li><a href="#">Privacy</a></li>
		<li><a href="#">Contact</a></li>
	</ul>
	<span class="copyright">
		&copy; Copyright. All rights reserved.
	</span>
</footer>

</body>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
{% block scriptTag %} {% endblock %}
</html>