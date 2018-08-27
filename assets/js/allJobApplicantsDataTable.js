$(document).ready(function() {
    var allDTable = $('.applicantsDataTable').DataTable({
		pageLength: 50,
		responsive: true,
        processing: true,
        language: {
            processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
        },
        serverSide: true,
        ajax: {
            "url": '/api/v1/job/fetchapplicants',
            "type": 'POST',
            "draw": 1,
            "length": 50,
            "data": function(d) {
                d.job_id = job_id;
            },
            "dataSrc": function(_data) {
                let data = _data.data;
                let processed_data = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    if (!data[i].applicant) continue;
                    let d = {};
                    d.id = data[i].applicant.id;
                    d.checkbox = '<label class=""><input type="checkbox" class="form-control user-checkbox" /></label>';
                    d.fullname = data[i].applicant.fullname;
                    d.email = data[i].applicant.email;
                    d.status = data[i].applicant.status;
                    processed_data.push(d);
                }
                return processed_data;
            }
        },
         "columns": [
            { "data": "checkbox" }, 
            { "data": "fullname", "searchable": true },
            { "data": "email", "searchable": true },
            { "data": "status" }
        ],
        'createdRow': function( row, data, dataIndex ) {
      		$(row).attr('id',  data.id);
  		},
        'columnDefs': [
     		{
        		'targets': 2,
        		'createdCell':  function (td, cellData, rowData, row, col) {
           			$(td).attr('class', 'email'); 
        		}
     		},
        ]
            
	});

    $(".applicantsDataTable").css('width', '100%');


    $(".all-group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			allDTable.$(".user-checkbox").prop('checked', true);
		} else {
			allDTable.$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn($(this).parents('.table'));
        activeDTable = allDTable;
    });
    

    $("#tb-applications").on('click', ".user-checkbox", function() {
		controlActionBtn($(this).parents('.table'));
        activeDTable = allDTable;
	});
});