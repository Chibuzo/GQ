{% extends 'layout.swig' %}
{% set title = 'Scraped Jobs' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> Scraped Jobs
{% endblock %}

{% block body %}
	<div class="col-md-5 pull-right">
		<a href="#fetchJobModal" class="btn btn-success btn-fill pull-right" data-toggle="modal" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Fetch More Jobs</a>
	</div>

	<div class="col-md-12">
		<div class="card">
			<div class="header row">
				<div class="col-md-6">
					<h4 class="title">Scraped Jobs</h4>
					<p class="category"></p>
				</div>
			</div>
			{% set scrapedJob = true %}
			{% include 'includes/jobs-view.swig' %}
		</div>
	</div>

	<form action="/company/upload-csv" method="post" id="form-csv" enctype="multipart/form-data">
		<input type="hidden" name="job_id" id="job_id" />
		<input type="file" name="csv" id="csv" class="hidden" />
	</form>
{% endblock %}

{% block modals %}
	{% include 'includes/fetchJob-modal.swig' %}
	{% include 'includes/companyAutosuggest-modal.swig' %}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
	$(document).ready(function() {
		$(".scrapedjobs").addClass('active');
		$(".upload-csv").click(function(e) {
			e.preventDefault();
			var job_id = $(this).parents('tr').attr('id');
			$("#job_id").val(job_id);
			$("#csv").click();
		});

		$("#csv").change(function() {
			$("#form-csv").submit();
		});


		$(".del-job").click(function (e) {
			e.preventDefault();
			var $this = $(this);
			if (confirm("Are you sure you want to delete this job?")) {
				var id = $(this).parents('tr').attr('id');
				$.get('/job/remove', { id: id }, function(d) {
					if (d.status.trim() == 'success') {
						$this.parents('tr').fadeOut();
					}
				}, 'JSON');
			}
		});


		$(".card").on("click", ".group-check", function() {
			if ($(this).is(':checked')) {
				$(".user-checkbox").prop('checked', true);
			} else {
				$(".user-checkbox").prop('checked', false);
			}
			controlActionBtn();
		});


		$("#tb-jobs").on('click', ".user-checkbox", function() {
			controlActionBtn();
		});


		$(".card").on("click", ".move-to-jobBoard", function(e) {
			e.preventDefault();

			if (confirm("Are you sure you want to move the selected jobs to the Job Board?")) {
				var jobs = [];
				$(".user-checkbox:checked").each(function () {
					jobs.push($(this).parents('tr').attr('id'));
				});

				$.post('/scrapedJobs/moveToJobBoard', {jobs: jobs});
				$(".user-checkbox:checked").each(function () {
					$(this).parents('tr').fadeOut();
				});
			}
		});


		$(".card").on('click', ".delete-jobs", function(e) {
			e.preventDefault();

			if (confirm("Are you sure you want to delete the selected Jobs?")) {
				var jobs = [];
				$(".user-checkbox:checked").each(function() {
					jobs.push($(this).parents('tr').attr('id'));
				});

				$.post('/job/remove', { jobs: jobs });
				$(".user-checkbox:checked").each(function() {
					$(this).parents('tr').fadeOut();
				});
			}
		});
	});


function controlActionBtn() {
	if ($(".user-checkbox:checked").size() > 0) {
		$(".action-btn").prop("disabled", false);
	} else {
		$(".action-btn").prop("disabled", true);
	}
}
</script>
