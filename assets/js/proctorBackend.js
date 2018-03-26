$(".fetch-proctor-details").click(function() {
    var proctor_id = $(this).attr('id');
    var candidate_id = $(this).parents('tr').attr('id');

    $("#proctor-id").text(proctor_id);
    $("#candidate-id").text(candidate_id);

    $.get('/proctor/fetchFiles', { proctor_id: proctor_id, candidate_id: candidate_id }, function(d) {
        if (d.status.trim() == 'success') {
            $("#profilePhoto").html("<img src='/applicant_passports/" + d.profile_pic + "' />");
            var audios = '', photos = '';
            d.files.forEach(function(file) {
                if (file.file_type == 'audio') {
                    audios += "<div class='col-md-6'>"
                        +"<audio src='/proctorFiles" + file.filename + "' controls='controls'></audio>"
                        +"</div>";
                } else {
                    photos += "<div class='col-md-6'>"
                        +"<div class='proctor-pic'><img src='/proctorFiles" + file.filename + "' /></div>"
                        +"</div>";
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
            $("#stats-info").html(stats);
        }
    }, 'JSON');
});


$("#accept-test").click(function() {
    if (confirm("Are you sure you want to accept this test score?")) {
        var proctor_id = $("#proctor-id").text();

        $.post('/proctor/accept-test',  { proctor_id: proctor_id }, function(d) {

        }, 'JSON');
        $("#" + $("#candidate-id").text()).find("td:nth-child(8)").text('Accepted');
    }
});

$("#reject-test").click(function() {
    if (confirm("Are you sure you want to reject this test score?")) {
        var proctor_id = $("#proctor-id").text();
        var candidate_id = $("#candidate-id").text();

        $.post('/proctor/reject-test',  { proctor_id: proctor_id, candidate_id: candidate_id }, function() {

        }, 'JSON');
        $("tr#" + candidate_id).find("td:nth-child(8)").html('Rejected');
    }
});
