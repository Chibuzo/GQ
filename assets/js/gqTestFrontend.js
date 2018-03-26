// globals, yes shoot me
var TEST_ID, duration, questions = [],PROCTOR, PROCTOR_FEEDBACK;

var ANSWERS_KEY = "test-user-answers";

/* GQTestStatus is used to keep track of whether a test is in progress or not.
 * Short term fix for 1st question being skipped when test starts because
 * "proctorReady" can fired mutliple times if button dbl clicked
*/
var GQTestStatus = (function() {
    var inProgress = false;

    return {
        isInProgress: function() {
            return inProgress;
        },

        startProgress: function() {
            inProgress = true;
        },

        stopProgress: function() {
            inProgress = false;
        }
    }
})();

// retake test
$("#retake-test").click(function() {
    $("#result-div").fadeOut('fast', function() {
        $("#test-div").hide().removeClass('hidden').fadeIn('fast');
    });
});

$(".load-test").click(function() {
    if (mobileCheck() === true) {
        blockTest();
        return false;
    }
    TEST_ID = $(this).data('test_id');
    $(this).text('Loading test...').prop('disabled', true);
    $.get('/gqtest/load-test-instruction/' + TEST_ID, function(d) {
        if (d.status.trim() == 'success') {
            $("#test-notice").fadeOut(function() {
                $("#start-test").removeClass('hidden');
            });
            // test div should be hidden at this time
            $(".inner-test-div").fadeOut('fast');
            $("#instructions").fadeIn('fast', function() {
                $(".test-title").text(d.test_name);
                $(".instruction").html(d.instructions);
            });
            // update test_id for the resuming section test (GQ aptitude test)
            TEST_ID = d.test_id;
            $(".load-test").data('test_id', d.test_id)
        }
    }, 'JSON');
});


$("#start-test").click(function() {
    $(this).text('Loading test...').prop('disabled', true);

    // start test proctoring
    PROCTOR = startProctor();

    // register proctor session
    createProctorSession();

    // register window onclose/leave event
    addWindowsCloseEvent();

    // startTest is called when ProctorReady callback executed
    // startTest();

    // reset/initialize invigilation bar
    $(".progress-bar").removeClass('progress-bar-warning progress-bar-danger').addClass('progress-bar-success').css('width', "100%");
});


$("#next-question").click(function() {
    var cur_question = $("#current_quest").text();
    var question_num = parseInt($("#total_questions").text());

    if (parseInt(cur_question) === question_num) {
        return;
    }

    fetchNextQuestion(questions);
});

// TODO: Better implmentation. Hacky
$("#prev-question").click(function() {
    var cur_question = $("#current_quest").text();
    var currQuestionInt = parseInt(cur_question);

    if (currQuestionInt === 1) {
        return;
    }

    // Get the previous question by calling fetchNextQuestion from previous 2 questions
    fetchNextQuestion(questions, currQuestionInt - 2);
})


// load question from question numbers
$(".question-nums").on('click', '.question-num', function() {
    var question = parseInt($(this).text());
    var cur_question = $("#current_quest").text();
    if (cur_question != question) {
        fetchNextQuestion(questions, question - 1);
        $(this).removeClass('skipped_q answered_q').addClass('active_q');
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

    disableButtons(cur_question, question_num);

    // save the state of the current question
    saveAnswer();
    // clear previous question image, if any
    $(".question-image").html('');

    $("input[name=opt]").prop('checked', false).parents('label').removeClass('checked');

    $(".question-num").removeClass('active_q');
    $("#quest-" + cur_question).removeClass('skipped_q answered_q').addClass('active_q');
    $("#current_quest").text(cur_question).data('quest-id', questions[next_question].id);
    if (questions[next_question].image_file) {
        // TODO: have the URL be environment dependant
        var img = $("<img />").attr('src', '/cbt-images/' + questions[next_question].image_file).on('load', function() {
            $(".question-image").append(img);
        });
    }
    $(".question").html(questions[next_question].question);
    $("#span-opt-a").text(questions[next_question].opt_a);
    $("#span-opt-b").text(questions[next_question].opt_b);

    // display only options with a value
    if (questions[next_question].opt_c) {
        $("#span-opt-c").parents('li').show();
        $("#span-opt-c").text(questions[next_question].opt_c);
    } else {
        $("#span-opt-c").parents('li').hide();
    }
    if (questions[next_question].opt_d) {
        $("#span-opt-d").parents('li').show();
        $("#span-opt-d").text(questions[next_question].opt_d);
    } else {
        $("#span-opt-d").parents('li').hide();
    }
    if (questions[next_question].opt_e) {
        $("#span-opt-e").parents('li').show();
        $("#span-opt-e").text(questions[next_question].opt_e);
    } else {
        $("#span-opt-e").parents('li').hide();
    }
    restoreQuestionState(questions[next_question].id);
}

function disableButtons(currQuestion, totalQuestions) {
    if (parseInt(currQuestion) == parseInt(totalQuestions)) {
        //submitTest();
        $("#next-question").addClass('disabled');
    } else {
        $("#next-question").removeClass('disabled');
    }

    if (parseInt(currQuestion) == 1) {
        $("#prev-question").addClass('disabled');
    } else {
        $("#prev-question").removeClass('disabled');
    }
}

// loosely acts as a checkpoint, so it saves test states
function saveAnswer() {
    var quest_id = $("#current_quest").data('quest-id');
    var ans = $("input[name=opt]:checked").val();
    var cur_question = $("#current_quest").text();

    // Save Answer in local storage
    var answers = localStorage.getItem(ANSWERS_KEY) ? JSON.parse(localStorage.getItem(ANSWERS_KEY)) : [];

    if (quest_id !== undefined && ans !== undefined) {
        answers = answers.filter(function(ans) {
            return quest_id !== ans.quest_id;
        });

        answers.push({
            quest_id: quest_id,
            ans: ans
        });
    }

    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));

    if (ans) {
        $("#quest-" + cur_question).removeClass('skipped_q').addClass('answered_q');
        // save answer on localstorage
        localStorage.setItem('questID-' + quest_id, ans);
    } else {
        $("#quest-" + cur_question).addClass('skipped_q');
    }

    // save test state
    localStorage.setItem('integrity_score', IntegrityScore.get());
}


function restoreQuestionState(quest_id) {
    var ans = localStorage.getItem('questID-' + quest_id);
    if (ans !== null) {
        $(':radio[value=' + ans + ']').prop('checked', true).parents('label').addClass('checked');
    }
}


// submit test
$("#submit-test").click(function(e) {
    e.preventDefault();

    if (confirm("Are you sure want to submit this test? You won't be able to come back and review or modify your answers")) {
        removeNotification();
        // prevent further [auto] submit
        stopCountdownTimer();
        destroyCountdownTimer();

        // hide the damn video canvas
        $(".cell").hide();

        try {
            // stop proctor
            PROCTOR_FEEDBACK = stopProctorAndGetFeedback();
        } catch (err) {
            console.error("Proctor failed to stop");
            console.error(err);
        }

        saveAnswer();

        //SingleFaceTracker.clearTimer();

        if (parseInt(TEST_ID) < 3) { // strictly for multiple test in a session
            submitAndLoadNext();
            return false;
        } else if (parseInt(TEST_ID) == 3) {
            submitGQAptitudeTest();
            return false;
        } else {
            submitTest();
        }
        // remove windows close event
        removeWindowsCloseEvent();
    }
});


function submitTest() {
    if (!GQTestStatus.isInProgress()) {
        return;
    }

    GQTestStatus.stopProgress();
    removeNotification();
    removeWindowsCloseEvent();

    // hide the damn video canvas
    $(".cell").hide();

    if (TEST_ID == 1 || TEST_ID == 2) {
        submitAndLoadNext();
        return false;
    } else if (TEST_ID == 3) {
        submitGQAptitudeTest();
        return false;
    }

    var userAnswers = localStorage.getItem(ANSWERS_KEY) ? JSON.parse(localStorage.getItem(ANSWERS_KEY)) : [];
    //proctor.stop();
    $.post('/gqtest/marktest', {
        test_id: TEST_ID,
        no_of_questions: questions.length,
        integrity_score: IntegrityScore.get(),
        userAnswers: userAnswers,
        invigilationTracking: InvigilationTracker.getAll()
    }, function (d) {
        if (d.status.trim() == 'success') {
            $("#score").text(d.result.score + '/' + questions.length);
            $("#percentage").text(d.result.percentage + '%');
            $("#average").text(d.result.average);

            $("#test-div").fadeOut('fast', function() {
                $("#result-div").hide().removeClass('hidden').fadeIn('fast');
            });
        }
    });
    // clear local storage
    localStorage.clear();
}


//function submitOnTimeOut() {
//    $("#submit-test").click();
//}


// NOTE! This function is a very dirty hack!
// strictly for GQ Aptitude test page.
// It might just work with a little work around for taking a series of tests as one test session, Hallelujah!
function submitAndLoadNext(next) {
    if (!GQTestStatus.isInProgress()) {
        return;
    }

    GQTestStatus.stopProgress();
    removeNotification();
    removeWindowsCloseEvent();

    var next = parseInt(TEST_ID) + 1;
    $('.load-test').data('test_id', next);

    var userAnswers = localStorage.getItem(ANSWERS_KEY) ? JSON.parse(localStorage.getItem(ANSWERS_KEY)) : [];

    $.post('/gqtest/marktest', {
        test_id: TEST_ID,
        no_of_questions: questions.length,
        integrity_score: IntegrityScore.get(),
        userAnswers: userAnswers,
        invigilationTracking: InvigilationTracker.getAll()
    }, function (d) {
        if (next <= 3) $(".load-test").click();
    });
    // reset some elememts
    localStorage.clear();
    $(".question-nums").empty();
    $("#current_quest").empty();
}


// NOTE! Another terrible hack
// for GQ Aptitude test submit
// should be modified to handle section submit for test with more than one section
function submitGQAptitudeTest() {
    if (!GQTestStatus.isInProgress()) {
        return;
    }

    GQTestStatus.stopProgress();
    removeNotification();
    removeWindowsCloseEvent();

    var userAnswers = localStorage.getItem(ANSWERS_KEY) ? JSON.parse(localStorage.getItem(ANSWERS_KEY)) : [];

    $.post('/gqtest/markGQAptitude', {
        test_id: TEST_ID,
        no_of_questions: questions.length,
        integrity_score: IntegrityScore.get(),
        userAnswers: userAnswers,
        invigilationTracking: InvigilationTracker.getAll()
    }, function (d) {
        $("#general").find('td:nth-child(2)').text(d.result.general_ability);
        $("#general").find('td:nth-child(3)').text(d.result.general_percentage + '%');

        $("#verbal").find('td:nth-child(2)').text(d.result.verbal);
        $("#verbal").find('td:nth-child(3)').text(d.result.verbal_percentage + '%');

        $("#maths").find('td:nth-child(2)').text(d.result.maths);
        $("#maths").find('td:nth-child(3)').text(d.result.maths_percentage + '%');

        $("#total").find('td:nth-child(2)').text(d.result.score);
        $("#total").find('td:nth-child(3)').text(d.result.percentage + '%');
        $("#total").find('td:nth-child(4)').text(d.result.rank);

        $("#test-div").fadeOut('fast', function() {
            $("#result-div").hide().removeClass('hidden').fadeIn('fast');
        });
    });
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function mobileCheck() {
    var isMobile = false;
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}


function createProctorSession() {
    $.post('/gqtest/createProctorSession', { test_id: TEST_ID }, function(d) {
    }); // that'a all
}

function blockTest() {
    $(".inner-test-div").fadeOut('fast', function() {
        $(".test-blocked-screen").removeClass('hidden');
    });
    stopCountdownTimer(); // prevent loaded test from auto submitting on timeout by stopping the timer
    GQTestStatus.stopProgress();
}

function startTest() {
    if (GQTestStatus.isInProgress()) {
        console.warn("Attempted to start test when a test already in progress ");
        return;
    }

    localStorage.clear();

    $.get('/gqtest/load-test/' + TEST_ID, function(d) {
        if (d.status.trim() == 'success') {
            GQTestStatus.startProgress();

            questions = d.questions;
            shuffleArray(questions);
            duration = d.duration;

            var total_quests = d.questions.length;
            //TEST_ID = d.test_id;
            $("#total_questions").text(total_quests);

            $(".test-blocked-screen").addClass('hidden');

            $("#instructions").fadeOut('fast', function() {
                $(".inner-test-div").fadeIn('fast');
            });

            // display question numbers
            var quests = '', n = 1;
            questions.forEach(function(quest) {
                quests += "<div class='question-num question-num-base' id='quest-" + n + "' data-quest_id='" + quest.id +"'>" + n + "</div>";
                n++;
            });
            $(".question-nums").html(quests);

            fetchNextQuestion(questions);
            startTimer();

            // set/reset controls
            $("#next-question").html("Next <i class='fa fa-caret-right'></i> ");
            // TODO: ensure the disabled prop set to false after test finished
            $("#start-test").text('Start Test').prop('disabled', false);
        }
    }, 'JSON');
}





//function warnCandidate(e) {
//    var confirmationMessage = "\o/";
//
//	(e || window.event).returnValue = confirmationMessage; //Gecko + IE
//	return confirmationMessage;
//    //$.post('/pushajax', { msg: 'Window Closed'});
//}

// ------- START NOTIFICATIONS ------ //

var notificationTimer;
function addNoticfication(msg, opts) {
    if (!msg) {
        return;
    }
    opts = opts || {};
    var overlay = opts.overlay || false;

    $("#notification-alert").text(msg);
    $("#notification-alert").removeClass('invisible');
    if (overlay) {
        $(".test-overlay").fadeIn('fast');
    }

    if (opts.timer) {
        clearInterval(notificationTimer);
        notificationTimer = setTimeout(function() {
            removeNotification();
        }, opts.timer);
    }
}

function removeNotification() {

    $("#notification-alert").text("");
    $("#notification-alert").addClass('invisible');
    $(".test-overlay").fadeOut('fast');
}

// ------- END NOTIFICATIONS ------ //

// ------- START WINDOW EVENT HANDLERS ------ //

function removeWindowsCloseEvent() {
    window.removeEventListener("beforeunload", submitTest);
}

function addWindowsCloseEvent() {
    window.addEventListener("beforeunload", submitTest);
}

window.addEventListener('online', () => {
    PROCTOR = startProctor();

    removeNotification();

    resumeCountdownTimer();
    GQTestStatus.startProgress();
    //SingleFaceTracker.setCounter();
    //SingleFaceTracker.startTimer();
});

window.addEventListener('offline', () => {
    pauseCountdownTimer();

    addNoticfication("You are currently disconnected from the internet. You need to be connected on the internet to continue this test", {
        overlay: true
    });

    //PROCTOR.stop();
    PROCTOR_FEEDBACK = stopProctorAndGetFeedback();
    //GQTestStatus.stopProgress();
    //SingleFaceTracker.clearTimer();
});

// ------- END WINDOW EVENT HANDLERS ------ //


// ------- START TIMER FUNCTIONS ------ //
var countdownTimer = $("#countdowntimer");

function startTimer() {
    var hrs = mins = 0;
    if (duration > 60) {
        hrs = Math.floor(duration / 60);
        mins = duration % 60;
    } else {
        hrs = 0;
        mins = duration;
    }

    countdownTimer.timer({
        countdown: true,
        duration: mins + 'm0s', // The time to countdown from.
        repeat: false, // If duration is set, `callback` will be called repeatedly
        editable: false, // If click and edit time is enabled
        format: "%H:%M:%S", // Format to show time in,
        callback: submitTest // If duration is set, this function is called after `duration` has elapsed
    });
    //$("#hms_timer").countdowntimer({
    //    hours : hrs,
    //    minutes : mins,
    //    seconds: 0,
    //    size : "md",
    //    timeUp: submitTest
    //});
}

function destroyCountdownTimer() {
    countdownTimer.timer('remove');
}

function stopCountdownTimer() {
    if (!GQTestStatus.isInProgress()) {
        return;
    }

    countdownTimer.timer('pause');
}

function pauseCountdownTimer() {
    if (!GQTestStatus.isInProgress()) {
        return;
    }

    countdownTimer.timer('pause');
}

function resumeCountdownTimer() {
    countdownTimer.timer('resume');
}

// ------- END TIMER FUNCTIONS ------ //


// ------- SHOW CANDIDATE'S FACE BRIEFLY ------//
var proctorCanvas = (function() {
    return {
        init: function() {
            //$(".cell").fadeIn('slow');
            $(".cell").css('opacity', 1);
            setTimeout(this.hide, 60000);
        },

        show: function() {
            // show video canvas
            $(".cell").css('opacity', 1);
            setTimeout(this.hide, 30000);
        },

        hide: function() {
            // hide the damn video canvas
            $(".cell").css('opacity', 0);
        }
    };
})();


// ----- START FACE DETECTION FUNCTIONS ---- //
var SingleFaceTracker = (function() {
    var faceTrackedCount;
    var timerId

    var self = this;

    return {
        setCounter: function() {
            faceTrackedCount = 0;
        },

        incrementCounter: function() {
            faceTrackedCount++;
        },

        ensureFaceTracked: function() {
            var _faceTrackedCount = faceTrackedCount;
            faceTrackedCount = 0;

            //if (_faceTrackedCount <= 0) {
                addNoticfication("We couldn't detect your face. Please ensure the camera is unobstructed and pointed directly towards your face.", {
                    timer: 10000
                });
                proctorCanvas.show();
                //IntegrityScore.update(-5);
                //InvigilationTracker.incrementNoFaceCount();
                return;
            //}
        },

        startTimer: function() {
            timerId = setInterval(this.ensureFaceTracked, 60000);
        },

        clearTimer: function() {
            clearInterval(timerId);
        }
    };
})();

// ----- END FACE DETECTION FUNCTIONS ---- //

// ----- START INTEGRITY SCORE FUNCTIONS ---- //

var IntegrityScore = (function() {
    var integrityScore;

    var updateIntegrityBar = function(new_val) {
        $("#integrity-score").text(new_val);
        if (integrityScore < 70 && integrityScore > 55) {
            $(".progress-bar").removeClass('progress-bar-success').addClass('progress-bar-warning');
        }
        else if (integrityScore < 55) {
            $(".progress-bar").removeClass('progress-bar-warning').addClass('progress-bar-danger');
        }
        $('.progress-bar').css('width', integrityScore + "%"); //animate({ width: integrityScore + "%" }, 1500);
    }

    return {
        update: function(value) {
            //integrityScore = integrityScore + value;
            //integrityScore  = integrityScore < 0 ? 0 : integrityScore;
            integrityScore = value;
            updateIntegrityBar();
        },

        reset: function() {
            integrityScore = 100;
        },

        get: function() {
            return integrityScore;
        }
    };
})();

// ----- END INTEGRITY SCORE FUNCTIONS ---- //

// ----- START INVIGILATION COUNT/TRACK FUNCTIONS ---- //

var InvigilationTracker = (function() {
    //var noFace = 0;
    //var noise = 0;
    //var multipleFaces = 0;

    return {
        //incrementNoFaceCount: function() {
        //    noFace++;
        //},
        //
        //incrementNoiseCount: function() {
        //    noise++;
        //},
        //
        //incrementMultipleFacesCount: function() {
        //    multipleFaces++;
        //},
        //
        //reset: function() {
        //    noFace = 0;
        //    noise = 0;
        //    multipleFaces = 0;
        //},

        getAll: function() {
            return {
                noFace: PROCTOR_FEEDBACK.video.counter.noFace,
                noise: PROCTOR_FEEDBACK.audio.counter.noise,
                multipleFaces: PROCTOR_FEEDBACK.video.counter.multiFace
            }
        }
    }
})();

// ----- END INVIGILATION COUNT/TRACK  FUNCTIONS ---- //

// sample initializing proctor/setup
function startProctor() {
    return new Proctor({
        detectionLapse: 60, // detection lapse (seconds)

        scores: {
            noFace: -3,
            multiFace: -10,
            ambientNoise: -2,
            integrityScore: 100,
        },

        audio: {
            fps: 2, // from 0(maximum cpu available fps) 60hz max (1)
            sensitivity: 95, // from 0 - 100
            ignoreRecording: false
        },

        video: {
            element: '#proctor-video',
            canvas: '#proctor-canvas',
            fps: 20, // from 0(maximum cpu available fps) 60hz max (2)
            streamWidth: 320,
            streamHeight: 240,
            ignoreTrack: false,
            takeInitialSnapshot: true
        },

        handleOutdatedBrowser: () => {
            // alert('Update your browser ma niggah');
        },

        handleSnapshotUpload: (data64, eventName) => {
            // console.log("Proctor: Upload Snapshot");
        },
        handleAudioUpload: (data64) => {
            // console.log("Proctor: Upload Audio");
        },
        onNoFaceTracked: (feedback) => {
            // console.log('Proctor: No face detected');
            console.log('No face detected...');
            SingleFaceTracker.ensureFaceTracked();
        },
        // on multi face detected
        onMultiFaceTracked: (f) => {
            // console.log('Proctor: Multiple faces detected');
            console.log('Multiple faces detected...');
        },
        // Integrity score deduction can be applied here
        onAmbientNoiseDetection: (f, pitch, meter) => {
            // console.log('Proctor: Ambient noise detected');
            console.log('Noise detected...');
        },

        onMicPermissionDenied: () => {
            // console.warn('Proctor (Perms): Microphone needed for this test');
            blockTest();
        },
        onCamPermissionDenied: () => {
            // console.warn('Proctor (Perms): Webcam needed for this test');
            blockTest();
        },

        onCamNotDetected: () => {
            // console.warn('Proctor: This device does not have a webcam');
            blockTest();
        },
        onMicNotDetected: () => {
            // console.warn('Proctor: This device does not have a microphone');
            blockTest();
        },

        proctorReady: () => {
            // console.log('Proctor is ready.');
            startTest();
            // initialize proctor streaming canvas
            proctorCanvas.init();
        },

        feedback: (e) => {
            console.log('Integrity: ' + e.integrityScore);
            IntegrityScore.update(e.integrityScore);
        },

        showLogs: true
    });
}
function stopProctorAndGetFeedback() {
    let feedback;
    PROCTOR.stop(), (feedback = PROCTOR.getFeedback());
    console.log(feedback);
    return feedback;
}
