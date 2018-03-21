$("#form-profile").submit(function(e) {
    e.preventDefault();

    // check password match
    if ($("#new_password").val() != $("#verify_password").val()) {
        showNotification('bottom', 'center', 'danger', "Password doesn't match", 'pe-7s-bell');
        return false;
    }
    $.post('/user/update', $(this).serialize(), function(d) {
        if (d.status.trim() == 'success') {
            if ($("#btn-submit").data('opt') == 'update-job-profile') {
                location.replace('/applicant/resume-page');
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