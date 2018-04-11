$("#form-profile").submit(function(e) {
    e.preventDefault();

    // check password match
    if ($("#new_password").val().length < 6 || ($("#new_password").val() != $("#verify_password").val())) {
        showNotification('bottom', 'center', 'danger', "Password doesn't match", 'pe-7s-bell');
        return false;
    }
    if ($("#current_password").length !== 0 && $("#current_password").val().length < 6) {
        showNotification('bottom', 'center', 'danger', "Enter your current password to continue", 'pe-7s-bell');
        return false;
    }
    $.post('/user/update', $(this).serialize(), function(d) {
        if (d.status.trim() == 'success') {
            var msg = "Your profile has been successfully updated! You will be redirected within 6 seconds";
            showNotification('top', 'left', 'success', msg, 'pe-7s-bell');
            if ($("#btn-submit").data('opt') == 'update-job-profile') {
                setInterval(function() {
                    location.href = '/applicant/resume-page';
                }, 6000);
            } else {
                var msg = "Your profile has been successfully updated!";
                showNotification('top', 'left', 'success', msg, 'pe-7s-bell');
            }
        } else {
            showNotification('bottom', 'center', 'danger', d.msg, 'pe-7s-bell');
        }
    }, 'JSON');
});


$("#change-pic").click(function(e) {
    e.preventDefault();
    $("#file-control").click();
});

$("#file-control").change(function() {
    $("#form-passport-upload").submit();
});
