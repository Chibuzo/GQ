{% extends 'layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
  <i class="pe-7s-user"></i> &nbsp;My Profile
{% endblock %}

{% block body %}
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

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="phone">Resident Country</label>
                                                    <select name="country" class="form-control">
                                                        {% for country in countries %}
                                                            <option value="{{ country.country }}">{{ country.country }}</option>
                                                        {% endfor %}
                                                    </select>
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="state">State</label>
                                                    <select name="state" class="form-control">
                                                        <option value="">Select State</option>
                                                        {% for state in states %}
                                                            <option value="{{ state.state_name }}">{{ state.state_name }}</option>
                                                        {% endfor %}
                                                    </select>
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="city">City</label>
                                                    <input type="text" name="city" class="form-control" value="{{ user.city }}" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class=""><h3>Change Password</h3></div>
                                        <div class="form-group">
                                            <div class="row">
                                                {% if !first_time %}
                                                    <div class="col-md-4">
                                                        <label>Current Password</label>
                                                        <input type="password" name="current_password" id="password" class="form-control" placeholder="Enter your current password">
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
                                        <input type="hidden" name="coy_user_id" value="{{ user.id }}" />
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
                                     <a href="#">
                                    <img class="avatar border-gray" src="/images/face-0.jpg" alt="..."/>

                                      <h4 class="title">{{ user.fullname }}<br />
                                         <small>{{ user.email }}</small>
                                      </h4>
                                    </a>
                                </div><br>

                            </div>
                            <hr>
                            <div class="text-center">
                                <!--<button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
                                <button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
                                <button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button>-->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
	
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
    $("select[name=country]").find('option').filter(function(i) {
        return 'Nigeria' == $(this).val();
    }).attr("selected", "selected");


    $("#form-profile").submit(function(e) {
        e.preventDefault();

        var first_time = {{ first_time | json | safe }};
        if (first_time) {
            if ($("#new_password").val().length < 3) {
                var msg = "You must set your password now to continue";
                showNotification('bottom', 'right', 'danger', msg, 'pe-7s-bell');
                return false;
            }
        }

        if ($("#new_password").val() != $("#verify_password").val()) {
            var msg = "Error: password doesn't match";
            showNotification('bottom', 'right', 'danger', msg, 'pe-7s-bell');
            return false;
        }

        $.post('/company/update-user', $(this).serialize(), function(d) {
            if (d.status.trim() == 'success') {
                var msg = "Your profile has been successfully updated!";
                showNotification('top', 'left', 'success', msg, 'pe-7s-bell');
            }
        }, 'JSON');
    });
})
</script>
{% endblock %}