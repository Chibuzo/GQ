$('input[name=add_question_type]').change(function() {
    var checked_radio = $('input[name=add_question_type]:checked').val();
    if (checked_radio == 'excel') {
        $("#upload-div").removeClass('hidden');
    } else {
        $("#upload-div").addClass('hidden');
    }
});

// submit test form
$("#form-test").submit(function(e) {
    e.preventDefault();
    tinymce.triggerSave();

    $.post('/gqtest/savetest', $(this).serialize(), function(d) {
        if (d.status.trim() == 'success') {
            showNotification('bottom', 'center', 'success', 'Test Details Saved', 'pe-7s-bell');

            if (!$.isNumeric($("#test-id").val())) {
                location.replace('/gqtest/manage');
            } else {
                if ($('input[name=add_question_type]:checked').val() == 'manual') {
                    $("#new-question").click();
                } else {
                    $("#edit-question").click();
                }
            }
        }
    }, 'JSON');
});


//$("#next-question").click(function() {
//    var question = tinymce.get('question').getContent(),
//        opt_a = $("#opt_a").val(),
//        opt_b = $("#opt_b").val(),
//        opt_c = $("#opt_c").val(),
//        opt_d = $("#opt_d").val(),
//        answer = $("#answer").val();
//
//    if (!$.trim(opt_a) || !$.trim(opt_b) || !$.trim(opt_c) || !$.trim(opt_d) || !$.trim(answer)) {
//        showNotification('bottom', 'center', 'danger', 'Fill the question form completely', 'pe-7s-attention');
//        //return false;
//    }
//    $(this).html("<i class='fa fa-cog fa-spin'></i> Saving...").prop('disabled', true);
//
//    var form = $('#form-question')[0];
//    var data = new FormData(form);
//
//    $.ajax({
//        url: '/gqtest/savequestion',
//        method: 'POST',
//        data: data
//        //data: { question: question, opt_a: opt_a, opt_b: opt_b, opt_c: opt_c, opt_d: opt_d, answer: answer, test_id: $("#test-id").val() },
//        dataType: 'json'
//    }).done(function(d) {
//        if (d.status.trim() == 'success') {
//            tinymce.get('question').setContent(''); // $("#opt_a").val(''), $("#opt_b").val(''), $("#opt_c").val(''), $("#opt_d").val(''), $("#answer").val('');
//            $("#form-question")[0].reset();
//            $('#next-question').html(' &nbsp; Next Question <i class="fa fa-caret-right"></i>').prop('disabled', false);
//        }
//    }).fail(function(err) {
//        showNotification('bottom', 'center', 'danger', err.msg, 'pe-7s-attention');
//    });
//});

// fetch question for edit and update
$(".question").click(function() {
    $(".question-image").empty();
    $(".question").removeClass('active_q');
    $(this).addClass('active_q');
    var question_id = $(this).attr('id');
    $.get('/gqtest/getquestion/' + question_id, function(d) {
        if (d.status.trim() == 'success') {
            tinymce.get('_question').setContent(d.question.question);
            $("#opt-a").val(d.question.opt_a);
            $("#opt-b").val(d.question.opt_b);
            $("#opt-c").val(d.question.opt_c);
            $("#opt-d").val(d.question.opt_d);
            $("#opt-e").val(d.question.opt_e);
            $("#_answer:selected").prop("selected", false);
            $("#_answer").find('option').filter(function(i) {
                return d.question.answer == $(this).val();
            }).prop("selected", true);
            $("#_question_id").val(question_id);
            $("#_test_id").val(d.question.test);
            $("input[name=question_image]").val(null);
            if (d.question.image_file) {
                $(".question-image").html("<img src='/cbt-images/" + d.question.image_file + "' />");
                $("#image-file").val(d.question.image_file);
            }

            $("#form-update-question").fadeIn('fast');
        }
    }, 'JSON');
});


$("#form-update-question, #form-question").submit(function(e) {
    e.preventDefault();
    tinymce.triggerSave();
    var form_id = $(this).attr("id");
    $(this).find('button[type=submit]').html("<i class='fa fa-cog fa-spin'></i> Saving...").prop('disabled', true);

    var form = $('#' + form_id)[0];
    var data = new FormData(form);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: '/gqtest/savequestion',
        data: data,
        dataType: 'json',
        processData: false,
        contentType: false,
        cache: false,
        success: function (d) {
            if (d.status.trim() == 'success') {
                if (form_id == "form-update-question") {
                    $("#form-update-question").find('button[type=submit]').text("Update Question").prop('disabled', false);
                    showNotification('bottom', 'center', 'success', 'Question Updated', 'pe-7s-bell');
                } else {
                    showNotification('bottom', 'center', 'success', 'Question Saved', 'pe-7s-bell');
                    tinymce.get('question').setContent('');
                    $("#form-question")[0].reset();
                    $('#next-question').html(' &nbsp; Next Question <i class="fa fa-caret-right"></i>').prop('disabled', false);
                }
            }
        }
    });
});


$("#attach-file").click(function() {
    $("#question_image").click();
});

$("#_attach-file").click(function() {
    $("#_question_image").click();
});


// done adding questions
$("#done").click(function() {
    $("#edit-question").click();
});

// delete question
$("#delete-question").click(function() {
    if (confirm("Are you sure you want to delete this question?")) {
        var quest_id = $("#_question_id").val();
        $.get('/gqtest/delete-question', { quest_id: quest_id });
        location.reload();
    }
});

$(".del-test").click(function (e) {
    e.preventDefault();
    var $this = $(this);
    if (confirm("Are you sure you want to delete this test?")) {
        var id = $(this).parents('tr').attr('id');
        $.get('/gqtest/remove/' + id, function(d) {
            if (d.status.trim() == 'success') {
                $this.parents('tr').fadeOut();
            }
        }, 'JSON');
    }
});