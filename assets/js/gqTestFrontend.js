// globals, yes shoot me
var test_id, duration, questions = [];

$(".load-test").click(function() {
    $(this).text('Loading test...').prop('disabled', true);
    $.get('/gqtest/load-default-test-instruction', function(d) {
        if (d.status.trim() == 'success') {
            $("#test-notice").fadeOut(function() {
                $("#start-test").removeClass('hidden');
            });
            $(".test-title").text(d.test_name);
            $(".instruction").html(d.instructions);
        }
    }, 'JSON');
});


$("#start-test").click(function() {
    $(this).text('Loading test...').prop('disabled', true);
    $.get('/gqtest/load-default', function(d) {
        if (d.status.trim() == 'success') {
            questions = d.questions;
            duration = d.duration;

            var total_quests = d.questions.length;
            test_id = d.test_id;
            $("#total_questions").text(total_quests);

            $("#instructions").fadeOut('fast', function() {
                $(".test").fadeIn('fast');
            });

            // display question numbers
            var quests = '', n = 1;
            questions.forEach(function(quest) {
                quests += "<div class='question-num' id='quest-" + n + "' data-quest_id='" + quest.id +"'>" + n + "</div>";
                n++;
            });
            $(".question-nums").html(quests);

            // clear localstorage
            localStorage.clear();
            fetchNextQuestion(questions);
            startTimer();
        }
    }, 'JSON');
});


$("#next-question").click(function() {
    var cur_question = $("#current_quest").text();

    fetchNextQuestion(questions);
});


// load question from question numbers
$(".question-nums").on('click', '.question-num', function() {
    var question = parseInt($(this).text());
    var cur_question = $("#current_quest").text();
    if (cur_question != question) {
        fetchNextQuestion(questions, question - 1);
        $(this).removeClass('skipped_q answered_q').addClass('active_q');
    }
});


// submit test
$("#submit-test").click(function(e) {
    e.preventDefault();
    if (confirm("Are you sure want to submit this test? You won't be able to come back and review or modify your answers")) {
        saveAnswer();
        submitTest();
    }
});


function fetchNextQuestion(questions, next_quest) {
    var next_question, cur_question = $("#current_quest").text();
    var question_num = parseInt($("#total_questions").text());

    if ($.isNumeric(cur_question)) {
        next_question = parseInt(cur_question);
        cur_question++;
    } else {
        next_question = 0;
        cur_question = 1;
    }

    // overide next question
    if (next_quest || next_quest == 0) {
        next_question = next_quest;
        cur_question = next_quest + 1;
    }
    if (parseInt(cur_question) > parseInt(question_num)) {
        //submitTest();
        return;
    }

    // save the state of the current question
    saveAnswer();

    $("input[name=opt]").prop('checked', false).parents('label').removeClass('checked');

    $(".question-num").removeClass('active_q');
    $("#quest-" + cur_question).removeClass('skipped_q answered_q').addClass('active_q');
    $("#current_quest").text(cur_question).data('quest-id', questions[next_question].id);
    $(".question-image").html("<img src='/cbt-images/" + questions[next_question].image_file + "' />");
    $(".question").html(questions[next_question].question);
    $("#span-opt-a").text(questions[next_question].opt_a);
    $("#span-opt-b").text(questions[next_question].opt_b);
    $("#span-opt-c").text(questions[next_question].opt_c);
    $("#span-opt-d").text(questions[next_question].opt_d);
    if (questions[next_question].opt_e) {
        $("#span-opt-e").parents('li').show();
        $("#span-opt-e").text(questions[next_question].opt_e);
    } else {
        $("#span-opt-e").parents('li').hide();
    }
    restoreQuestionState(questions[next_question].id);
}


function saveAnswer() {
    var quest_id = $("#current_quest").data('quest-id');
    var ans = $("input[name=opt]:checked").val();
    var cur_question = $("#current_quest").text();

    if (ans) {
        $("#quest-" + cur_question).removeClass('skipped_q').addClass('answered_q');
        $.post('/gqtest/return-answer', { quest_id: quest_id, answer: ans });

        // save answer on localstorage
        localStorage.setItem('questID-' + quest_id, ans);
    } else {
        $("#quest-" + cur_question).addClass('skipped_q');
    }
}


function restoreQuestionState(quest_id) {
    var ans = localStorage.getItem('questID-' + quest_id);
    if (ans !== null) {
        $(':radio[value=' + ans + ']').prop('checked', true).parents('label').addClass('checked');
    }
}


function submitTest() {
    $.get('/gqtest/marktest/' + test_id + '/' + questions.length, function(d) {
        if (d.status.trim() == 'success') {
            $("#score").text(d.result.score + '/' + questions.length);
            $("#percentage").text(d.result.percentage + '%');
            $("#average").text(d.result.average);

            $("#test-div").fadeOut('fast', function() {
                $("#result-div").hide().removeClass('hidden').fadeIn('fast');
            });
        }
    });
}


function startTimer() {
    var hrs = mins = 0;
    if (duration > 60) {
        hrs = math.floor(duration / 60);
        mins = duration % 60;
    } else {
        hrs = 0;
        mins = duration;
    }
    $("#hms_timer").countdowntimer({
        hours : hrs,
        minutes : mins,
        size : "md",
        timeUp: submitTest
    });
}