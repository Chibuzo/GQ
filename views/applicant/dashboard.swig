{% extends 'layout.swig' %}
{% set title = 'Candidate Dashboard' %}
{% block page_title %}
	<i class="pe-7s-graph"></i> Dashboard
{% endblock %}

{% block head %}
  {% parent %}
  {% set location = "Dashboard" %}
  {% include "../externalApplications/amplified.swig" %}
{% endblock %}

{% block body %}
	<style>
		.header-text {
			font-family: Arial, Helvetica, sans-serif;
		}

		.checklist-item-row {
			margin-left: 0px;
			display: flex;
		}

		.checklist-panel-row {
			display: flex;
		}

		.panel-text-heading {
			font-weight: bold;
			color: #495057;
		}

		.panel-text {
			font-family: Arial, Helvetica, sans-serif;
		}

		.panel-text-body {
			color: grey;
		}

		.fa-chevron-right {
			color: black;
		}

		.checklist-icon {
			font-size: 4em;
		}

		.panel-checklist-icon {
			align-self: center;
		}

		.panel-body {
			padding: 10px;
		}

		.pointer {
			cursor: pointer;
		}

		.completed-true {
			color: #7cbb52;
		}

		.completed-false {
			color: #0085ba;
		}

		.disabled .completed-false {
			color: gray;
		}

		.disabled {
			opacity: 0.5;
			cursor: default;
		}

		.header-text {
			font-family: Arial, Helvetica, sans-serif;
		}

	</style>
	<div class="row">
		<div class="col-md-12">
			<div class="alert alert-info"style="overflow: auto">
				<div class="col-md-1"><i class="fa fa-info-circle fa-4x"></i></div>
				<div class="col-md-11"><p>By completing steps 1 to 4, you can apply to a wide array of job positions with leading local and international companies who are constantly looking to hire talented candidates through GetQualified.</p>
				<p>Remember, all you need is one completed profile to apply for an endless number of jobs.</p>
				<p>Let jobs find you!</p>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-7 col-md-offset-2">
			<h3 class="header-text hidden">Get started with Get Qualified</h3>
			<h4 class="header-text">Complete your profile and start applying for jobs.</h4>
		</div>
	</div>

	{% for item in userChecklist %}
		<div class="row">
			<div class="col-xs-12">
				<div class="row checklist-item-row">
					<div class="col-sm-7 col-xs-12 col-sm-offset-2">
						<a href="{{ item.action }}" class="panel panel-default row checklist-panel-row pointer {{ item.disbaledClass}}">
							<div class="panel-body col-xs-3 col-sm-2 panel-checklist-icon">
								<i class="{{ item.iconClass }} completed-{{item.completed}} checklist-icon" aria-hidden="true"></i>
							</div>
							<div class="panel-body col-xs-8 col-sm-9">
								<p class="panel-text panel-text-heading">{{ item.title }}</p>
								<p class="panel-text panel-text-body">{{item.text}}</p>
							</div>
							<div class="panel-body col-xs-1 col-sm-1 panel-checklist-icon">
								<i class="fa fa-chevron-right" aria-hidden="true"></i>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	{% endfor %}

{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
	$(".dashboard").addClass('active');

	$("a.disabled").click(function() {
		return false;
   });
});
</script>
