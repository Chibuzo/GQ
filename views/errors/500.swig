<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="500 Internal Server Error">
	<meta name="author" content="">
	<title>Internal Server Error</title>

	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

	<style>
		/* Error Page Inline Styles */
		body {
		  padding-top: 20px;
		}

		.jumbotron {
		  font-size: 21px;
		  font-weight: 200;
		  line-height: 2.1428571435;
		  color: inherit;
		  padding: 10px 0px;
		}

		.body-content {
		  padding-left: 15px;
		  padding-right: 15px;
		}

		.jumbotron {
		  text-align: center;
		  background-color: transparent;
		}
		.jumbotron .btn {
		  font-size: 21px;
		  padding: 14px 24px;
		}

		.text-center {
			text-align: center;
		}

		/* Colors */
		.green {color:#5cb85c;}
		.orange {color:#f0ad4e;}
		.red {color:#d9534f;}
	</style>

	<script type="text/javascript">
		function goBack() {
			window.history.back();
		}
	</script>

</head>
<body>

	<div class="container">
	  <div class="jumbotron">
	    <h1><span class="glyphicon glyphicon-warning-sign red"></span> Sorry, Something Went Wrong</h1>
		<a class="btn btn-default btn-lg text-center" onclick="goBack()"><span class="green">Go Back</span></a>
		<a href="{{ dashboardUrl }}" class="btn btn-default btn-lg text-center"><span class="green">Return To Dashboard</span></a>
	  </div>
	</div>

	<div class="container">
	  <div class="body-content">
	    <div class="row">
	      <div class="text-center col-md-12">
	        <h2>What can I do?</h2>
	        <p>If you need immediate assistance, <a href="mailto:support@getqualified.work">please send us an email</a>.</p>
			<p>We apologize for any inconvenience.</p>
	     </div>
	    </div>
	  </div>
	</div>
</body>
</html>