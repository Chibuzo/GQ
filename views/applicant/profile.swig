{% extends 'layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
  <i class="pe-7s-user"></i> &nbsp;My Settings
{% endblock %}

{% block head %}
  {% parent %}
  {% set location = "Profile" %}
  {% include "../externalApplications/amplified.swig" %}
{% endblock %}

{% block body %}
<style>
.avatar {
    width: 250px;
}
</style>
<div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="header">
                                <h4 class="title">Edit Profile</h4>
                            </div>
                            <div class="row">
                                <div class="col-md-12" style="padding: 40px">
                                    {% if !passwordSet  %}
                                        <div class="alert alert-warning">NOTICE: Remember to set a password for this account before you leave this page.</div>
                                    {% endif %}
                                    <form action="/user/update" method="post" id="form-profile">
                                       <div class="form-group">
                                           <div class="row">
                                               <div class="col-md-6">
                                                    <label>First Name</label>
                                                    <input type="text" name="fname" class="form-control" placeholder="Enter your first name" value="{{ me.fname }}" required>
                                                </div>

                                                <div class="col-md-6">
                                                    <label>Last Name</label>
                                                    <input type="text" name="lname" class="form-control" placeholder="Enter your last name" value="{{ me.lname }}" required>
                                                </div>
                                           </div>
                                       </div>

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label>Email</label>
                                                    <input type="email" name="email" class="form-control" placeholder="Enter your email" value="{{ user.email }}" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <div class=""><h4 class="title">Change Password</h4></div>
                                        <div class="form-group">
                                            <div class="row">
                                                {% if user.password.length > 30 %}
                                                    <div class="col-md-4">
                                                        <label>Current Password</label>
                                                        <input type="password" name="current_password" id="current_password" class="form-control" placeholder="Enter your current password">
                                                    </div>
                                                {% endif %}

                                                <div class="col-md-4">
                                                    <label>New Password</label>
                                                    <input type="password" name="new_password" id="new_password" class="form-control" placeholder="Enter your new password">
                                                </div>

                                                <div class="col-md-4">
                                                    <label>Re-type New Password</label>
                                                    <input type="password" name="verify_password" id="verify_password" class="form-control" placeholder="Re-type your new password">
                                                </div>
                                            </div>
                                        </div>

                                        {% if first_time %}
                                            <input type="hidden" name="first_time" value="Yes" />
                                            {% set data = 'update-job-profile' %}
                                        {% else %}
                                            {% set data = 'update' %}
                                        {% endif %}
                                        <button type="submit" class="btn btn-info btn-fill pull-right" id="btn-submit" data-opt="{{ data }}">Update Profile</button>
                                        <div class="clearfix"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="image">
<!--                                <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>-->
                            </div>
                            <div class="content">
                                <div class="author">
                                     <a href="" id="change-pic">
                                     {% if passport.length > 3 %}
                                         <img class="avatar border-gray" src="/applicant_profilephoto/{{ passport }}" alt="..."/>
                                     {% else %}
                                         <img class="avatar border-gray" src="/images/face-0.jpg" alt="..."/>
                                     {% endif %}
                                     </a>
                                    <h4 class="title">{{ user.fullname }}<br />
                                        <small>{{ user.email }}</small>
                                    </h4>
                                </div><br>

                            </div>
                            <hr>
                            <div class="text-center">
                                <!--<button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
                                <button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
                                <button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button>-->
                            </div>
                        </div>
                        <form action="/applicant/add-profilephoto" method="post" id="form-passport-upload" enctype="multipart/form-data">
                            <input type="hidden" name="photo_title" value="{{ me.fname }}-{{ me.lname }}" />
                            <input type="hidden" name="user_id" value="{{ user.id }}">
                            <input type="file" name="photo" style="display: none" id="file-control" />
                        </form>
                    </div>

                </div>
            </div>
        </div>

{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/profile-photo.js?v=1"></script>

<script type="text/javascript">
$(document).ready(function() {
    $(".setting").addClass('active');
});
</script>
{% endblock %}
