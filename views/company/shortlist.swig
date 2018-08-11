{% extends 'layout.swig' %}
{% set title = 'Candidates' %}
{% block page_title %}
	{{ jobTitle }} Candidates
{% endblock %}

{% block body %}
<style>
a.disabled {
    pointer-events: none;
    cursor: default;
}
</style>
<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">Candidates</h4>
			</div>
		</div>
		<div class="content">
			{% include '../admin/includes/shortlist-view.swig' %}
		</div>
	</div>
</div>
{% endblock %}

{% block modals %}
    {% include '../misc/email-modal.swig' %}
{% endblock %}

{% block scriptTag %}

{#<script src="/js/plugins/datatables.min.js"></script>#}

<script>
$(document).ready(function() {
	$('.candidate-filter').addClass('active');


//	var dTable = $('.dataTable').DataTable({
//		pageLength: 50,
//		responsive: true,
//		"aoColumnDefs": [
//			{'bSortable': false, 'aTargets': [0, 3, 4, 5]}
//		],
//		"columnDefs": [
//			{"width": "590px", "targets": 0}
//		]
//	});


	$(".shortlist-group-check").click(function () {
		if ($(this).is(":checked")) {
			$(".user-checkbox").prop('checked', true);//.parent().removeClass("checked");
		} else {
			$(".user-checkbox").prop('checked', false);//.parent().addClass("checked");
		}
		controlActionBtn();
	});


	$("#tb-users").on('click', ".user-checkbox", function () {
		controlActionBtn();
	});


	$(".req-interview-btn").click(function() {
		if (confirm("Are you sure you want to interview these candidates?")) {
			var users = [];
			$(".user-checkbox:checked").each(function () {
				users.push($(this).parents('tr').data('candidate_id'));
			});
			var job_id = {{ job_id | json | safe }};
			$.post('/selectedCandidates/interview', {users: users, job_id: job_id}, function () {
				alert('Your request has been recieved. A rep from Get Qualified will be in touch with you shortly.\nThank you.');
				location.reload(true);
			});
		}
	});

	$("#form-email").submit(function(e) {
		e.preventDefault();

		sendEmail($("#shortlist"), $(this));
	});

	$("#emailModal").on("hidden.bs.modal", function () {
        $("#form-email").find(".alert-success").addClass('hidden');
    });
});

$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});


function sendEmail($table, $form) {
    $form.find('button[type-submit]').html("<i class=fa fa-cog fa-spin></i> Sending...").prop('disabled', true);
    var users = [];
    $table.find(".user-checkbox:checked").each(function() {
        users.push($(this).parents('tr').find('td.email').text());
    });

    tinymce.triggerSave();

    $.post('/admin/sendemail', $form.serialize() + '&users=' + users, function(d) {
        if (d.status.trim() == 'success') {
            $(".alert-success").removeClass('hidden');
            $form.find('button[type-submit]').html("<i class=fa fa-envelope></i> Send Email").prop('disabled', false);
        }
    }, 'JSON');
}


function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$(".action-btn").prop("disabled", false);
	} else {
		$(".action-btn").prop("disabled", true);
	}
}
</script>
{% endblock %}
