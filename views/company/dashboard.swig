{% extends 'layout.swig' %}
{% set title = 'Company Dashboard' %}
{% block page_title %}
	<i class="pe-7s-graph"></i> Dashboard
{% endblock %}

{% block body %}
<style>
	.widget-box {
		padding: 11px;
		border: #e0e0e0 solid thin;
		margin: 10px;
		margin-top: 0;
		overflow: auto;
		background: #fff;
	}

	.widget-box i {
		font-size: 45px;
		margin-top: 15px;
	}

	.widget-box h3 {
		margin: 5px;
	}
</style>


<div class="col-md-12">
	<div class="row">
	<div class="col-md-3">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-music"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ s_count }}</h3>
				<p>Active Jobs</p>
			</div>
		</div>
	</div>

	<div class="col-md-3">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-album"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ a_count }}</h3>
				<p>Albums</p>
			</div>
		</div>
	</div>

	<div class="col-md-3">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-video"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ v_count }}</h3>
				<p>Videos</p>
			</div>
		</div>
	</div>

	<div class="col-md-3">
		<div class="widget-box">
			<div class="col-md-6">
				<i class="pe-7s-users"></i>
			</div>
			<div class="col-md-6 text-center">
				<h3>{{ u_count }}</h3>
				<p>Users</p>
			</div>
		</div>
	</div>
</div>
{% endblock %}