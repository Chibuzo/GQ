{% extends 'layout.swig' %}
{% set title = 'General Aptitude Test Results' %}
{% block page_title %}
	<i class="pe-7s-users"></i> Candidates' Test Results
{% endblock %}
{% block body %}
<style>
	.filter-div {
		padding-bottom: 25px;
		overflow: auto;
		background-color:#f9f9f9;
	}

	.dataTable_wrapper .row .col-md-6 {
		padding: 3px 30px;
	}

	.modal-dialog {
		width: 700px;
	}

	#audios, #photos, #profile-pic {
		margin-top: 20px;
	}

	#profile-pic .col-md-6 img {
		width: 100%;
	}

	#photos .col-md-6 img {
		width: 100%;
	}

	.proctor-pic {
		position: relative;
	}

	.image-tag {
		position: absolute;
		left: 10px;
		bottom: 0;
		color: white;
		font-size: 20px;
		margin-left: 10px;
		margin-bottom: 5px;
	}

    .trash-can {
        color: red;
        cursor: pointer;
    }

	input[type=checkbox] {
		top: -15px;
	}

	input[type=checkbox].form-control {
		height: 12px;
	}

</style>

<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">Candidates' GQ Test Result</h4>
				<p class="category">You can filter candidates</p>
			</div>
			<!--<div class="col-md-4 pull-right"><button class="btn btn-info btn-fill pull-right" id="search-cv"><i class="fa fa-search"></i> Search CV</button></div>-->
		</div>

		{#{% set search_pg = 'test' %}
		{% include 'includes/candidate-search-form.swig' %}#}
		<div class="content table-responsive table-full-width">
			<table class="table table-striped ajaxDataTable">
				<thead>
					<tr>
						<td class="" colspan="13">
							<div class="btn-group">
								<button type="button" class="btn btn-success btn-fill dropdown-toggle action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
									Action &nbsp;<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="#emailModal" data-toggle="modal"><i class="fa fa-envelope fa-fw"></i> &nbsp;Send Email</a></li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<th style="width:10px !important"><label class="group-check"><input type="checkbox" class="form-control" /></label></th>
						<th><i class="fa fa-calendar"></i> Date</th>
						<th>Name</th>
						<th class="hidden">Email</th>
						{#<th>Employment Status</th>#}
						<th>Gen. Score</th>
						<th>Gen. Proctor</th>
						<th>Verbal Score</th>
						<th>Verbal Proctor</th>
						<th>Math Score</th>
						<th>Math Proctor</th>
						<th>Total</th>
						<th>Rank</th>
						<th class="text-center">Avg. Invigilation</th>
						<th>Test Status</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				
			</table>
		</div>
	</div>
</div>
{% endblock %}

{% block modals %}
	{% include 'includes/proctorModal.swig' %}
	{% include '../misc/email-modal.swig' %}	
{% endblock %}

{% block scriptTag %}
<script src="/js/proctorBackend.js?v=4"></script>
<script src="/js/plugins/datatables.min.js"></script>
<script src="/js/testResultDataTable.js"></script>
<script>
$(document).ready(function() {
	$('.applicants').addClass('active');

	drawDTable()

	$(".group-check").click(function() {
		if ($(this).find('input[type=checkbox]').is(':checked')) {
			$(".user-checkbox").prop('checked', true);
		} else {
			$(".user-checkbox").prop('checked', false);
		}
		controlActionBtn();
	});


	$(".ajaxDataTable").on('click', ".user-checkbox", function() {
		controlActionBtn();
	});


	$("#form-email").submit(function(e) {
		e.preventDefault();
		var $this = $(this);

		$this.find('button[type=submit]').html("<i class=fa fa-cog fa-spin></i> Sending...").prop('disabled', true);
		var users = [];
		$(".user-checkbox:checked").each(function() {
			users.push($(this).parents('tr').find('td.email').text());
		});

		tinymce.triggerSave();

		$.post('/admin/sendemail', $(this).serialize() + '&users=' + users, function(d) {
			if (d.status.trim() == 'success') {
				$(".alert-success").removeClass('hidden');
				$this.find('button[type=submit]').html("<i class='fa fa-envelope'></i> Send Email").prop('disabled', false);
			}
		}, 'JSON');
	});

	$("#emailModal").on("hidden.bs.modal", function () {
        $("#form-email").find(".alert-success").addClass('hidden');
    });

	$("#search-cv").click(function() {
		$(".filter-div").slideToggle();
	});
});

$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});

function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$(".action-btn").prop("disabled", false);
	} else {
		$(".action-btn").prop("disabled", true);
	}
}
</script>
{% endblock %}
