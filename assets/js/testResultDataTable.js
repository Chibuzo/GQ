function drawDTable() {
    var testDTable = $(".ajaxDataTable").DataTable({
        pageLength: 30,
        processing: true,
        language: {
            processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
        },
        //dom: '<"top"i>rt<"bottom"flp><"clear">',
        serverSide: true,
        ajax: {
            "url": '/api/v1/candidates/fetchgqresults',
            "type": 'POST',
            "draw": 1,
            "length": 30,
            "data": function(d) {
                d.mode = 'all';
                //d.job_id = job_id;
            },
            "dataSrc": function(_data) {
                let data = _data.data;
                let processed_data = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    let d = {};
                    d.id = data[i].id;
                    d.fullname = data[i].fullname;
                    d.checkbox = '<label class=""><input type="checkbox" class="form-control user-checkbox" /></label>';
                    d.test_date = new Date(data[i].test_date).toLocaleDateString();
                    d.fullname_link = `<a target="_blank" href="/applicant/resume-user/${data[i].id}" class="view-resume" rel="tooltip" title="View Resume">${data[i].fullname}</a>`;
                    d.email = data[i].email;
                    d.general_ability_score = data[i].generalAbilityTest.score;
                    d.general_ability_proctor = data[i].status == 'Pending' || data[i].status == 'Rejected' ? `<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="${data[i].generalAbilityTest.proctorId}">${data[i].generalAbilityTest.proctorScore}%</a>` : data[i].generalAbilityTest.proctorScore;
                    d.verbal_score = data[i].verbalTest.score;
                    d.verbal_proctor = data[i].status == 'Pending' || data[i].status == 'Rejected' ? `<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="${data[i].verbalTest.proctorId}">${data[i].verbalTest.proctorScore}%</a>` : data[i].verbalTest.proctorScore;
                    d.maths_score = data[i].mathsTest.score; 
                    d.maths_proctor = data[i].status == 'Pending' || data[i].status == 'Rejected' ? `<a href="#proctorModal" data-toggle="modal" class="fetch-proctor-details" id="${data[i].mathsTest.proctorId}">${data[i].mathsTest.proctorScore}%</a>` : data[i].mathsTest.proctorScore;
                    d.percentage = data[i].percentage;
                    d.rank = data[i].rank;
                    d.integrity_score = data[i].integrity_score; 
                    d.status = data[i].status;
                    d.actionbtn = `<div class="btn-group">
									<button type="button" class="btn btn-info btn-xs btn-fill dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Menu &nbsp;<span class="caret"></span>
									</button>
									<ul class="dropdown-menu dropdown-menu-right">
										<li><a href="" class="accept-test"><i class="fa fa-check-circle-o fa-fw"></i> Accept Test Score</a></li>
										<li><a href="" class="reject-test"><i class="fa fa-times fa-fw"></i>Reject Test Score</a></li>
										<li role="separator" class="divider"></li>
										<li><a href="" class="trash-can"><i class="fa fa-trash-o fa-fw"></i> Delete Test Scores</a></li>
										<li><a href="/editprofile/${data[i].id}" target="_blank"><i class="fa fa-wrench"></i> Edit Profile</a></li>
									</ul>
								</div>`;
                    processed_data.push(d);
                }
                return processed_data;
            }
        },
         "columns": [
            { "data": "checkbox" }, 
            { "data": "test_date", "orderable": true }, 
            { "data": "fullname_link", "searchable": true, "orderable": true },
            { "data": "email", "searchable": true },
            { "data": "general_ability_score", "orderable": true },
            { "data": "general_ability_proctor" },
            { "data": "verbal_score", "orderable": true },
            { "data": "verbal_proctor" },
            { "data": "maths_score", "orderable": true },
            { "data": "maths_proctor" },
            { "data": "percentage" },
            { "data": "rank", "orderable": true },
            { "data": "integrity_score", "orderable": true },
            { "data": "status" },
            { "data": "actionbtn" }
        ],
        'createdRow': function( row, data, dataIndex ) {
      		$(row).attr('id',  data.id);
  		},
  		'columnDefs': [
     		{
        		'targets': 3,
        		'createdCell':  function (td, cellData, rowData, row, col) {
           			$(td).attr('class', 'hidden email'); 
        		}
     		},
            {
                'targets': 13,
                'createdCell':  function (td) {
                    $(td).attr('class', 'proctor-status'); 
        		}
            },
            {
                'targets': 14,
        		'createdCell':  function (td, cellData, rowData) {
                    $(td).attr('data-user_name', rowData.fullname);
           			$(td).attr('data-test-type', 'GQAptitude'); 
        		}
            } 
        ]
    });
}