// globals, yes shoot me
var TEST_ID, duration, questions = [], PROCTOR, PROCTOR_CURRENT_DATA, proctorSessId, MOBILE = false;

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

$("#retake-test").click(function() {
    amplitude.getInstance().logEvent("Retake Test");
    $("#result-div").fadeOut('fast', function() {
        $("#test-div").hide().removeClass('hidden').fadeIn('fast');
    });
});

$(".load-test").click(function() {
    // if (mobileCheck() === true) {
    //     MOBILE = true;
    //     //amplitude.getInstance().logEvent("Failed Mobile Check");
    //     //blockTest("mobileCheck");
    //     //return false;
    // }

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
                amplitude.getInstance().logEvent("Loaded Instructions for Test " + TEST_ID, {
                    testName: d.test_name
                });
            });
            // update test_id for the resuming section test (GQ aptitude test)
            TEST_ID = d.test_id;
            $(".load-test").data('test_id', d.test_id);
        }
    }, 'JSON');
});

$("#start-test").click(function() {
    amplitude.getInstance().logEvent("Start Test Clicked");

    $(this).text('Loading test...').prop('disabled', true);

    // register proctor session
    createProctorSession(function() {
        // start test proctoring
        PROCTOR = startProctor();
    });
});

$("#submit-test").click(function(e) {
    e.preventDefault();
    amplitude.getInstance().logEvent("Submit Test Clicked");

    if (confirm("Are you sure want to submit this test? You won't be able to come back and review or modify your answers")) {
        submitTest(true);
    }
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
}

function restoreQuestionState(quest_id) {
    var ans = localStorage.getItem('questID-' + quest_id);
    if (ans !== null) {
        $(':radio[value=' + ans + ']').prop('checked', true).parents('label').addClass('checked');
    }
}

function submitTest(notTimer) {
    if (!notTimer) {
        amplitude.getInstance().logEvent("Test Submitted via Timer");
    }
    saveAnswer();

    var proctorFeedback = PROCTOR.getFeedback();
    sendAnswers(proctorFeedback);

    // cleanupTest must be called after getting proctor feedback
    cleanupTest();
}

function sendAnswers(proctorFeedback) {
    // Dont send anwsers if there is not a test in progress
    if (!GQTestStatus.isInProgress()) {
        return;
    }
    GQTestStatus.stopProgress();

    TEST_ID = parseInt(TEST_ID);
    $('.load-test').data('test_id', TEST_ID + 1);

    var markUrl = TEST_ID == 1 || TEST_ID == 2 || TEST_ID == 3 ? 'mark/gq' : 'markTest';
    var loadNextTest = TEST_ID == 1 || TEST_ID == 2 ? true : false;
    var aptitudeTest = TEST_ID == 3 ? true : false;

    var invigilationTracking = {
        noFace: proctorFeedback.video.counter.noFace,
        noise: proctorFeedback.audio.counter.noise,
        multipleFaces: proctorFeedback.video.counter.multiFace
    };

    var userAnswers = localStorage.getItem(ANSWERS_KEY) ? JSON.parse(localStorage.getItem(ANSWERS_KEY)) : [];

    $.post('/gqtest/' + markUrl, {
        test_id: TEST_ID,
        no_of_questions: questions.length,
        integrity_score: proctorFeedback.integrityScore,
        userAnswers: userAnswers,
        invigilationTracking: invigilationTracking,
        proctorSessId: proctorSessId
    }, function (d) {
        if (d.status.trim() == 'success') {
            amplitude.getInstance().logEvent("Successfully Submited Test " + TEST_ID, {
                loadNextTest: loadNextTest,
                aptitudeTest: aptitudeTest
            });

            if (loadNextTest) {
                //TODO Call a function that does this
                $(".load-test").click();
            } else if (aptitudeTest) {
                window.location.reload(true);
            } else {
                $("#score").text(d.result.score + '/' + questions.length);
                $("#percentage").text(d.result.percentage + '%');
                $("#average").text(d.result.average);

                $("#test-div").fadeOut('fast', function() {
                    $("#result-div").hide().removeClass('hidden').fadeIn('fast');
                });
            }
        }
    });

}

function cleanupTest() {
    stopProctor();

    removeWindowsCloseEvent();

    removeNotification();

    // prevent further [auto] submit
    stopCountdownTimer();

    destroyCountdownTimer();

    // hide the video canvas
    proctorCanvas.remove();

    localStorage.clear();
    $(".question-nums").empty();
    $("#current_quest").empty();
    $(".inner-test-div").addClass('hidden');
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//function mobileCheck() {
//    var isMobile = false;
//    // device detection
//    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
//        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
//    return isMobile;
//}

function createProctorSession(cb) {
    $.post('/gqtest/createProctorSession',
        {
            test_id: TEST_ID
        },
        function(response) {
            if (response.status && response.status.trim() === 'success') {
                proctorSessId = parseInt(response.proctor_id);

                amplitude.getInstance().logEvent("Created Proctor Session", {
                    proctorSessId: proctorSessId,
                    testId: TEST_ID
                });
            }
        }
    )
    .fail(function(response) {
         amplitude.getInstance().logEvent("Failed to Create Proctor Session", {
            testId: TEST_ID,
            err: response.responseJSON.message
        });
    })
    .always(function() {
        cb();
    })
}

function blockTest(reason) {
    amplitude.getInstance().logEvent("Test Blocked", {
        reason: reason
    });
    $(".inner-test-div").fadeOut('fast', function() {
        $(".test-blocked-screen").removeClass('hidden');
    });
    stopCountdownTimer(); // prevent loaded test from auto submitting on timeout by stopping the timer
    GQTestStatus.stopProgress();
}

function startTest() {
    console.log('Starting Test');

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
                $(".inner-test-div").removeClass('hidden');
                $(".inner-test-div").fadeIn('fast');
                amplitude.getInstance().logEvent("Started Test " + TEST_ID);
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
            updateIntegrityBar(100);
            // register window onclose/leave event
            addWindowsCloseEvent();

            // set/reset controls
            $("#next-question").html("Next <i class='fa fa-caret-right'></i> ");
            // TODO: ensure the disabled prop set to false after test finished
            $("#start-test").text('Start Test').prop('disabled', false);
        }
    }, 'JSON');
}

// ------- START NOTIFICATIONS ------ //

var notificationTimer;
function addNoticfication(msg, opts) {
    if (!msg) {
        return;
    }

    if (!GQTestStatus.isInProgress()) {
        console.warn("Attempted to dislay proctor notification when no test in progress");
        return;
    }

    opts = opts || {};
    var overlay = opts.overlay || false;

    $("#notification-alert").text(msg);
    $("#notification-alert").removeClass('invisible');
    if (overlay) {
        $(".test-overlay").fadeIn('fast');
    }

	clearInterval(notificationTimer);
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

var wentOffline = false;
window.addEventListener('online', () => {
    // TODO: this is going to create another proctor session
	if (GQTestStatus.isInProgress()) {
		PROCTOR = startProctor(PROCTOR_CURRENT_DATA.noFace, PROCTOR_CURRENT_DATA.multipleFaces, PROCTOR_CURRENT_DATA.noise, PROCTOR_CURRENT_DATA.integrityScore);

	    removeNotification();

	    resumeCountdownTimer();
	}
    if (wentOffline) {
		wentOffline = false;
		amplitude.getInstance().logEvent("Lost Internet Connection");
	}

    amplitude.getInstance().logEvent("Gained Internet Connection");
});

window.addEventListener('offline', () => {
	wentOffline = true;
	if (GQTestStatus.isInProgress()) {
		pauseCountdownTimer();

	    addNoticfication("You are currently disconnected from the internet. You need to be connected on the internet to continue this test", {
	        overlay: true
	    });

        var proctorFeedback = PROCTOR.getFeedback();
        PROCTOR_CURRENT_DATA = {
            noFace: proctorFeedback.video.counter.noFace,
            noise: proctorFeedback.audio.counter.noise,
            multipleFaces: proctorFeedback.video.counter.multiFace,
            integrityScore: proctorFeedback.integrityScore
        };
        stopProctor();
	}

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
    var canvasTimer;

    return {
		makeVisible: function(time) {
			$(".cell").css({'opacity': 1, left: '-60px'});
			canvasTimer = setTimeout(this.makeInvisible, time);
		},

		makeInvisible: function() {
			$(".cell").css({opacity: 0, left: '1000px'});
		},

		remove: function() {
			$(".cell").addClass("hidden");
            clearTimeout(canvasTimer);
		},

		mount: function() {
			$(".cell").removeClass("hidden");
		}
    };
})();


// ----- START INTEGRITY SCORE FUNCTIONS ---- //
var updateIntegrityBar = function(integrityScore) {
    if (integrityScore >= 70) {
        $(".progress-bar").removeClass('progress-bar-warning progress-bar-danger').addClass('progress-bar-success');
    } else if (integrityScore < 70 && integrityScore >= 55) {
        $(".progress-bar").removeClass('progress-bar-success progress-bar-danger').addClass('progress-bar-warning');
    }
    else if (integrityScore < 55) {
        $(".progress-bar").removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
    }

    $("#integrity-score").text(integrityScore);
    $('.progress-bar').css('width', integrityScore + "%");
    //animate({ width: integrityScore + "%" }, 1500);
}

// ----- END INTEGRITY SCORE FUNCTIONS ---- //

function startProctor(noFaceN = 0, multiFaceN = 0, ambientNoiseN = 0,integrityScore = 0) {
    amplitude.getInstance().logEvent("Starting Proctor");

	// make sure proctor canvas is showing
	proctorCanvas.mount();

    return new Proctor({
        detectionLapse: 60, // detection lapse (seconds)

        scores: {
            noFace: -3,
            multiFace: -10,
            ambientNoise: -2,
            integrityScore: 100,
        },

        audio: {
            fps: 7, // from 0(maximum cpu available fps) 60hz max (1)
            sensitivity: 95, // from 0 - 100
            ignoreRecording: false,
			recordingDuration: 15000
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
            amplitude.getInstance().logEvent("Outdated Broswer");
            alert('Please update your browser to the latest version.');
        },

        handleSnapshotUpload: (data64, eventName) => {
            console.log("Proctor: Upload Snapshot");
            $.ajax({
                 type: "POST",
                 url: "/gqtest/uploadProctorPicture",
                 retry: 10,
                 data: {
                     imgBase64: data64,
                     eventName: eventName,
                     proctorSessId: proctorSessId,
                 }, success: function(data) {
                     // Some success ish blah blah
                 }, error: function() {
                     if (this.retry > 0) {
                        amplitude.getInstance().logEvent(eventName + " photo upload retry count: " + retry);
                        $.ajax(this);
                        this.retry--;
                        return;
                     }
                     amplitude.getInstance().logEvent(eventName + " upload failed");
                 },
                 timeout: 30000 // sets timeout to 30 seconds
             }).done(function(msg) {
                 // Some message blah blah
             });
        },

        handleAudioUpload: (data64) => {
            console.log("Proctor: Upload Audio");
            $.ajax({
                type: "POST",
                url: "/gqtest/uploadProctorAudio",
                retry: 10,
                data: {
                    data: data64,
                    proctorSessId: proctorSessId,
                }, success: function(data){
                    // Some success ish blah blah
                }, error: function() {
                    if (this.retry > 0) {
                        amplitude.getInstance().logEvent("Audio upload retry countdown: " + retry);
                        $.ajax(this);
                        this.retry--;
                        return;
                     }
                     amplitude.getInstance().logEvent("Audio upload failed");
                     if (this.retry == 0) amplitude.getInstance().logEvent("Audio upload retried 5 times and still failed");
                },
                timeout: 30000 // sets timeout to 30 seconds
            }).done(function(msg) {
                // Some message blah blah
            });
        },

        onNoFaceTracked: (feedback) => {
            console.log('No face detected...');
            updateIntegrityBar(feedback.integrityScore);
            addNoticfication("We couldn't detect your face. Please ensure the camera is unobstructed and pointed directly towards your face.", {
                timer: 10000
            });
            proctorCanvas.makeVisible(30000);
        },

        onMultiFaceTracked: (feedback) => {
            console.log('Multiple faces detected...');
            updateIntegrityBar(feedback.integrityScore);
            addNoticfication("We detected multiple faces. You must ensure that you are taking this test alone.", {
                timer: 10000
             });
        },

        onAmbientNoiseDetection: (feedback, pitch, meter) => {
            console.log('Noise detected...');
            updateIntegrityBar(feedback.integrityScore);
            addNoticfication("Ambient noise detected. Please make sure you are in a quiet environment", {
                timer: 10000
            });
        },

        onMicPermissionDenied: () => {
            // console.warn('Proctor (Perms): Microphone needed for this test');
            blockTest("MicPermissionDenied");
        },

        onCamPermissionDenied: () => {
            // console.warn('Proctor (Perms): Webcam needed for this test');
            blockTest("CamPermissionDenied");
        },

        onCamNotDetected: () => {
            // console.warn('Proctor: This device does not have a webcam');
            blockTest("CamNotDetected");
        },

        onMicNotDetected: () => {
            // console.warn('Proctor: This device does not have a microphone');
            blockTest("MicNotDetected");
        },

        proctorReady: () => {
            amplitude.getInstance().logEvent("Proctor Ready");

            startTest();

            // Make proctor visible for 60s
            proctorCanvas.makeVisible(60000);
        },

        feedback: () => {
        },

        showLogs: true,

        data: {
            noFaceN: noFaceN,
            multiFaceN: multiFaceN,
            ambientNoiseN: ambientNoiseN,
            integrityScore: integrityScore
        }
    });
}

function stopProctor() {
    amplitude.getInstance().logEvent("Stop Proctor");

    try {
		proctorCanvas.remove();
        PROCTOR.stop();
    } catch (err) {
        console.error("Proctor threw an error when attempting to stop...");
        console.error(err);
        amplitude.getInstance().logEvent("Stop Proctor Error", {
            error: JSON.stringify(err)
        });
    } finally {

        PROCTOR =  null;
    }
}
