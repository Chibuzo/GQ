<!doctype html>
<html lang="en">
{% block head %}
	<meta charset="utf-8" />
	<link rel="icon" type="image/png" href="assets/img/favicon.ico">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>Not Just ok.com | {{ title }}</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />


    <!-- Bootstrap core CSS     -->
    <link href="/styles/bootstrap.min.css" rel="stylesheet" />

    <!-- Animation library for notifications   -->
    <link href="/styles/animate.min.css" rel="stylesheet"/>

    <!--  Light Bootstrap Table core CSS    -->
    <link href="/styles/light-bootstrap-dashboard.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
    <link href="/styles/pe-icon-7-stroke.css" rel="stylesheet" />
    <link rel="stylesheet" href="/styles/datepicker.css">
    <link rel="stylesheet" href="/styles/main.css">

    <style>
      .ok-header {
        margin-top: 10px;
      }

      .opt-icons {
          text-align: center;
      }
    </style>
{% endblock %}

<body>

<div class="wrapper">
    <div class="sidebar" data-color="blue">

    <!--

        Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
        Tip 2: you can also add an image using data-image tag

    -->
    	<div class="sidebar-wrapper">
            <div class="logo">
                <a href="http://www.notjustok.com" class="simple-text">
                    <img src="/images/logo.png" />
                </a>
            </div>

          {% if req.session.admin == true %}
              <ul class="nav">
                <li clas="active">
                    <a href="/admin/dashboard">
                        <i class="pe-7s-graph"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <li class="">
                    <a href="/admin/albums/review">
                        <i class="pe-7s-album"></i>
                        <p>Music Albums</p>
                    </a>
                </li>


                <li class="">
                    <a href="/admin/singles/review">
                        <i class="pe-7s-music"></i>
                        <p>Singles</p>
                    </a>
                </li>

                <li class="">
                    <a href="/admin/videos/review">
                        <i class="pe-7s-video"></i>
                        <p>Music Videos</p>
                    </a>
                </li>

                <li class="">
                    <a href="/admin/users">
                        <i class="pe-7s-users"></i>
                        <p>Manage Users</p>
                    </a>
                </li>

                <li>
                    <a href="/user/profile">
                        <i class="pe-7s-user"></i>
                        <p>User Profile</p>
                    </a>
                </li>

                <li>
                    <a href="/admin/setup">
                        <i class="pe-7s-tools"></i>
                        <p>Settings</p>
                    </a>
                </li>
            </ul>
          {% else %}
            <ul class="nav">
                <li clas="active">
                    <a href="/user/dashboard">
                        <i class="pe-7s-graph"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <li class="">
                    <a href="/music/albums">
                        <i class="pe-7s-album"></i>
                        <p>Music Albums</p>
                    </a>
                </li>


                <li class="">
                    <a href="/music/singles">
                        <i class="pe-7s-music"></i>
                        <p>Singles</p>
                    </a>
                </li>

                <li class="">
                    <a href="/music/videos">
                        <i class="pe-7s-video"></i>
                        <p>Music Videos</p>
                    </a>
                </li>

                <li>
                    <a href="/user/profile">
                        <i class="pe-7s-user"></i>
                        <p>User Profile</p>
                    </a>
                </li>
            </ul>
          {% endif %}
    	</div>
    </div>

    <div class="main-panel">
        <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">{% block page_title %} {% endblock %}</a>
                </div>
                <div class="collapse navbar-collapse">
                    <!--<ul class="nav navbar-nav navbar-left">
                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-dashboard"></i>
                            </a>
                        </li>
                    </ul>-->

                    <ul class="nav navbar-nav navbar-right">
                         <li>
                           <a href="/user/signout">
                               <i class="fa fa-sign-out"></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    {% block body %} {% endblock %}
                </div>
            </div>
        </div>


        <footer class="footer">
            <div class="container-fluid">
                <nav class="pull-left">
                    <ul>
                        <li>
                            <a href="#">

                            </a>
                        </li>

                    </ul>
                </nav>
                <p class="copyright pull-right">
                    &copy; {{ Date() | date('Y') }} <a href="http://www.creative-tim.com">NotJustOK</a> Distribution Platform
                </p>
            </div>
        </footer>

    </div>
</div>

{% block modals %} {% endblock %}
</body>

<!--   Core JS Files   -->
<script src="/js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="/js/bootstrap.min.js" type="text/javascript"></script>

<!--  Checkbox, Radio & Switch Plugins -->
<script src="/js/bootstrap-checkbox-radio-switch.js"></script>

<!--  Notifications Plugin    -->
<script src="/js/bootstrap-notify.js"></script>

<!-- Light Bootstrap Table Core javascript and methods for Demo purpose -->
<script src="/js/light-bootstrap-dashboard.js"></script>
  <script src="/js/datepicker.min.js"></script>

{% block scriptTag %} {% endblock %}
<script>
 $(document).ready(function() {
     $('.datep').datepicker({
         autoHide: true
     });
 });

 {% block script %} {% endblock %}
</script>

</html>
