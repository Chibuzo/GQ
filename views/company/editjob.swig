{% extends 'layout.swig' %}
{% set title = 'Edit Job' %}
{% block page_title %}
	<i class="pe-7s-timer"></i> &nbsp;Edit Job
{% endblock %}

{% block body %}
<style>
	.plus-btn {
		position: relative;
		top: 35px;
		margin-left: 10px;
	}

	.addable {
		display: none;
	}

	fieldset {
		margin-top: 23px;
	}

	.mce-branding {
		font-size: 0;
	}

	.datep {
		cursor: default;
	}
</style>
<div class="content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="header">
						<h4 class="title"><i class="fa fa-edit"></i>&nbsp; Edit Job</h4>
					</div>
					<div class="row">
						<div class="col-md-12" style="padding: 50px">
							{% include 'includes/job-form.swig' %}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	// update select controls
	var job_category_id = {{ job.category | json | safe }};
	var job_level = {{ job.job_level | json | safe }};
	var contract_type = {{ job.contract_type | json | safe }};
	var country = {{ job.country | json | safe }};
	var currency = {{ job.salary_currency | json | safe }};

	$("select[name=category]").find('option').filter(function(i) {
		return job_category_id == $(this).val();
	}).attr("selected", "selected");

	$("select[name=job_level]").find('option').filter(function(i) {
		return job_level == $(this).val();
	}).attr("selected", "selected");

	$("select[name=contract_type]").find('option').filter(function(i) {
		return contract_type == $(this).val();
	}).attr("selected", "selected");

	$("select[name=country]").find('option').filter(function(i) {
		return country == $(this).val();
	}).attr("selected", "selected");

	$("select[name=currency]").find('option').filter(function(i) {
		return currency == $(this).val();
	}).attr("selected", "selected");
});
</script>
{% endblock %}