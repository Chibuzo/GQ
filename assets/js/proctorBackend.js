$(".table").on("click", ".fetch-proctor-details", function() {
    var proctor_id = $(this).attr('id');
    var candidate_id = $(this).parents('tr').attr('id');

    $("#proctor-id").text(proctor_id);
    $("#candidate-id").text(candidate_id);

    $.get('/proctor/fetchFiles', { proctor_id: proctor_id, candidate_id: candidate_id }, function(d) {
        if (d.status.trim() == 'success') {
            $("#profilePhoto").html("<img src='/applicant_profilephoto/" + d.profile_pic + "' />");
            var audios = '', photos = '';
            d.files.forEach(function(file) {
                if (file.file_type == 'audio') {
                    audios += "<div class='col-md-6'>"
                        +"<audio src='/proctorFiles" + file.filename + "' controls='controls'></audio>"
                        +"</div>";
                } else {
                    var span = "";
                    if (file.filename.includes("initial")) {
                        span = "<span class='image-tag'>Initial</span>"
                    } else if(file.filename.includes("noFace")) {
                        span = "<span class='image-tag'>noFace</span>"
                    } else if (file.filename.includes("multi")) {
                        span = "<span class='image-tag'>multiFace</span>"
                    }
                    photos += "<div class='col-md-6'>"
                        + "<div class='proctor-pic'><img src='/proctorFiles" + file.filename + "' />"
                        + span
                        + "</div>"
                        + "</div>";
                }
            });
            $("#audios").html(audios);
            $("#photos").html(photos);
        }
    }, 'JSON');

    $.get('/proctor/session', { proctor_ids: proctor_id, }, function(d) {
        if (d.status.trim() == 'success') {
            var stats = '';
            var sessions = d.sessions || [];

            var infoText = {
                integrity_score: "Integrity Score",
                noFaceCount: "# of Times No Face Detected",
                noiseCount: "# of Times Noise Dectected",
                multipleFacesCount: "# of Times Multiple Face Detected"
            }

            sessions.forEach(function(session) {
                var testName = "";
                if (session.test_id === 1) {
                    testName = "General Test";
                } else if (session.test_id === 2) {
                    testName = "Verbal Test";
                } else if (session.test_id === 3) {
                    testName = "Numeric Test";
                }

                stats += "<p><strong><u>" + testName + "</u></strong></p>";

                ["integrity_score", "noFaceCount", "noiseCount", "multipleFacesCount"].forEach(function(key) {
                    if (session[key] === undefined) {
                        return;
                    }

                    stats += "<p><strong>" + infoText[key] + ":</strong> " + session[key] + "</p>";
                });
                stats += "<hr>"
            });

            // stats += "<p><strong>Number of Multiple Face Detected:</strong> " + d.session.multipleFacesCount + "</p>";
            $(".stats-info").html(stats);
        }
    }, 'JSON');
});


$(".table").on("click", ".accept-test", function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to accept this test score?")) {
        var candidate_id = $(this).parents('tr').attr('id');
        var proctor_id = 0;
        var $parentTd = $(this).parents('td');;
        var test_type = $parentTd.data('test-type');
        if (test_type == 'job-test') {
            proctor_id = $parentTd.data('proctor-id');
        }
        $.post('/proctor/accept-test',  { candidate_id: candidate_id, proctor_id: proctor_id, test_type: test_type }, function(d) {
            //location.reload(true);
        }, 'JSON');

        $("#" + candidate_id).find("td.proctor-status").html('Accepted');
    }
});


$(".table").on("click", ".reject-test", function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to reject this test score?")) {
        var $parentTd = $(this).parents('td');
        var candidate_id = $(this).parents('tr').attr('id');
        var job_title = '';
        var proctor_id = 0;
        var test_type = $parentTd.data('test-type');
        if (test_type == 'job-test') {
            job_title = $parentTd.data('job-title');
            proctor_id = $parentTd.data('proctor-id');
        }

        $.post('/proctor/reject-test',  { candidate_id: candidate_id, test_type: test_type, job_title: job_title, proctor_id: proctor_id }, function() {

        }, 'JSON');
        $("tr#" + candidate_id).find("td.proctor-status").html('Rejected');
    }
});


$(".table").on("click", ".trash-can", function(e) {
    e.preventDefault();
    var candidateId = $(this).parents('tr').attr('id');
    var candidateName = $(this).parents('.opt-icons').data('user_name');

    if (confirm("Delete " + candidateName + "'s test score. This will permenantly delete all their test scores and proctor files.")) {
      $.ajax({
        url: '/applicant/test/' + candidateId,
        method: 'DELETE',
        error: function(jqXHR, textStatus, errorThrown) {
          // console.error(jqXHR);
          alert('Error Attempting to delete test score: ' + textStatus + ', ' + errorThrown);
        },
        success: function() {
            location.reload();
        }
      });
    }
});
