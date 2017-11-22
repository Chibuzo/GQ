{% extends 'layout.swig' %}
{% set title = 'Company Setup' %}
{% block page_title %}
  <i class="pe-7s-setting"></i> Update Company Details
{% endblock %}
{% block body %}
<style>
.artwork {
  width: 192px;
  cursor: pointer;
  height: 170px;
  margin-top: 6px;
  background: #e0e0e0; 
}

.preview {
  padding: 3px;
  width: 200px;
}

.preview-image {
   height: 170px;
}

.upload-div {
  background: #fff;
  padding: 15px 20px;
  border-radius: 4px;
}

.upload-div .details {
  padding-top: 35px;
}

.coy-logo {
    width: 200px;
}

.image {
    width: 100%;
    min-height: 400px;
}

.card-user .content {
    min-height: 100px;
    margintop: 106px;
}
</style>
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="header">
                        <h4 class="title">Company Profile</h4>
                    </div>

                    <div class="row">
                          <div class="col-md-12" style="padding: 60px">
                              {% include 'includes/company-form.swig' %}
                          </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card card-user">
                    <div class="image">
                        {% if company.logo_name.length < 3 %}
                            <img src="/images/company_logo.jpg" alt="..."/>
                        {% else %}
                            <img src="/logos/{{ company.logo_name }}" alt="Company Logo"/>
                        {% endif %}
                    </div>
                    <div class="content">
                        <div class="author">
                            <a href="#">
                                <img src="" />
                                <h4 class="title">{{ company.company_name }}<br />
                                    <small>{{ company.contact_email }}</small>
                                </h4>
                            </a>
                        </div><br>
                    </div>
                    <hr>
                    <div class="text-center">

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
//    $("#logo-btn").click(function () {
//        $("#logo").click();
//    });


//    $("#logo").on('change', function () {
//        if (typeof (FileReader) != "undefined") {
//            var image_holder = $("#thumbnail-holder");
//            image_holder.empty();
//
//            var reader = new FileReader();
//            reader.onload = function (e) {
//                $("<img />", {
//                    "src": e.target.result,
//                    "class": "preview-image"
//                }).appendTo(image_holder);
//
//            }
//            image_holder.show();
//            reader.readAsDataURL($(this)[0].files[0]);
//        } else {
//            alert("This browser does not support FileReader.");
//        }
//    });


    $("#form-company-setup").submit(function(e) {
        e.preventDefault();

        // let's see if password MUST be set at this time
        if ($("#check_first").val() == 'true') {
            if ($("#password").val().length < 3) {
                showNotification('bottom', 'center', 'danger', "Error: You MUST set password to continue.", 'pe-7s-attention');
                return false;
            }
        }

        var form = $('#form-company-setup')[0];
        var data = new FormData(form);

        $(this).find('button[type=submit]').html("<i class='fa fa-cog fa-spin'></i> Updating...").prop('disabled', true);
        if ($("#password").val() == $("#verify-password").val()) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: '/company/update-details',
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                success: function(d) {
                    if (d.status.trim() == 'success') {
                        var msg = "Your company profile has been successfully updated!";
                        showNotification('top', 'right', 'success', msg, 'pe-7s-bell');
                    }
                    $('#form-company-setup').find('button[type=submit]').html("<i class='fa fa-save'></i> Update Details").prop('disabled', false);
                }
            });
        } else {
            showNotification('bottom', 'center', 'danger', "Error: Password doesn't match.", 'pe-7s-attention');
            $("#password, #verify-password").val('');
            $("#password").focus();
            $('#form-company-setup').find('button[type=submit]').html("<i class='fa fa-save'></i> Update Details").prop('disabled', false);
        }
    });
});
</script>
{% endblock %}  