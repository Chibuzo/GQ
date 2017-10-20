{% extends '../theme.swig' %}
{% set title = 'Admin Login' %}
{% block body %}
    <section class="container" style="margin-top: 20px">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 auth-panel">
                <h2 class="text-center">Authentication</h2><br>
                <form action="" method="post" class="form-vertical" id="signin">
                    <div class="form-group">
                        <label for="fullname">FULL NAME</label>
                        <input type="text" name="fullname" id="fullname" class="form-control input-lg" required />
                    </div>
                    <div class="form-group">
                        <label for="email">EMAIL</label>
                        <input type="email" name="email" id="email" class="form-control input-lg" />
                    </div>
                    <div class="form-group">
                        <label for="password">PASSWORD</label>
                        <input type="password" name="password" id="password" class="form-control input-lg" required />
                    </div>

                    <div class="form-group">
                        <label for="verify_password">VERIFY PASSWORD</label>
                        <input type="password" name="verify_password" id="verify_password" class="form-control input-lg" required />
                    </div>
                    <div class="alert alert-danger hidden"></div>
                    <button type="submit" class="btn btn-default input-lg btn-block"> SIGN UP </button>
                </form>
            </div>
        </div>
    </section>
{% endblock %}

{% block scriptTag %}
<script>

    $("#signup").submit(function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($("#password").val() != $("#verify_password").val()) {
            $(".alert-danger").html("<strong>Error:</strong> Password doesn't match.").removeClass('hidden');
            return false;
        }
        $(this).find('button').html("<i class='fa fa-cog fa-spin'></i> Processing").prop('disabled', true);

        $.post('/admin/create', $(this).serialize(), function(d) {
            if(d.status.trim() == '01') {
                location.href = '/admin';
            } else {
                $(".alert-danger").html("<strong>Error:</strong> " + d.msg).removeClass('hidden');
            }
            $this.find('button').text("SIGN UP").prop('disabled', false);
        }, 'JSON');
    });
</script>
{% endblock %}
