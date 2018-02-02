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
    <script src="/js/plugins/tinymce.min.js"></script>
    <script>tinymce.init({
            selector:'textarea.editor',
            menubar: false,
            plugins: [
                'lists preview',
            ],
            toolbar: 'bullist numlist outdent indent',
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css']
        });
    </script>

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

        .mce-notification {
            display: none !important;
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
                    {#<img src="/images/gq-logo-emb.png" class="logo-img" />#}
                    Get Qualified <small>Admin</small>
                </a>
            </div>

            <div class="user-pane">
                <i class="pe-7s-user"></i>
                {{ req.session.fname }}
            </div>

            <ul class="nav">
                <li class="dashboard">
                    <a href="/company/dashboard">
                        <i class="pe-7s-graph"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <li class="job-page">
                    <a href="/job/manage">
                        <i class="pe-7s-timer"></i>
                        <p>Job Board</p>
                    </a>
                </li>

                {% if req.session.user_type == 'company' %}
                    <li>
                        <a href="/company/user-profile">
                            <i class="pe-7s-user"></i>
                            <p>My Profile</p>
                        </a>
                    </li>
                {% endif %}

                {% if req.session.user_type == 'company-admin' %}
                    <li class="users">
                        <a href="/company/users">
                            <i class="pe-7s-users"></i>
                            <p>Manage Users</p>
                        </a>
                    </li>

                    <li class="profile">
                        <a href="/company/profile">
                            <i class="pe-7s-user"></i>
                            <p>Company Profile</p>
                        </a>
                    </li>
                {% endif %}
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
                            <a href="/admin/signout">
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