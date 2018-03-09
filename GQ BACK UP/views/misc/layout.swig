<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Get Qualified | {{ title }}</title>

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

        .opt-icons .fa {
            margin: 2px 4px;
        }
    </style>
</head>
<body>

<div class="wrapper">
    <div class="sidebar" data-color="blue">

        <!--

			Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
			Tip 2: you can also add an image using data-image tag

		-->
        <div class="sidebar-wrapper">
            <div class="logo">
                <a href="" class="simple-text">
                    <img src="/images/logo.png" class="hidden" />Get Qualified
                </a>
            </div>

            <ul class="nav">
                <li clas="active">
                    <a href="/applicant/dashboard">
                        <i class="pe-7s-graph"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <li class="">
                    <a href="/applicant/view-applications">
                        <i class="pe-7s-timer"></i>
                        <p>Manage Applications</p>
                    </a>
                </li>


                <li class="">
                    <a href="/applicant/resume-page">
                        <i class="pe-7s-id"></i>
                        <p>My Resume</p>
                    </a>
                </li>

                <li>
                    <a href="/applicant/profile">
                        <i class="pe-7s-tools"></i>
                        <p>Settings</p>
                    </a>
                </li>
            </ul>
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
                            <a href="/jobs">Jobs</a>
                        </li>
                        <li>
                            <a href="/courses">Courses</a>
                        </li>
                        <li>
                            <a href="/signout">
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
                    &copy; {{ Date() | date('Y') }} <a href="/">Get Qualified</a>
                </p>
            </div>
        </footer>

    </div>
</div>

{% block modals %} {% endblock %}
</body>

<!--   Core JS Files   -->
{#<script src="/js/jquery-1.10.2.js" type="text/javascript"></script>#}
<script src="/js/jquery-3.min.js" type="text/javascript"></script>

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
        format: 'yyyy-mm-dd',
        autoHide: true
    });
});


function showNotification(from, align, color, message, ico){
    //color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: ico, //"pe-7s-gift",
        message: message

    },{
        type: color,
        timer: 4000,
        placement: {
            from: from,
            align: align
        }
    });
}
</script>

</html>