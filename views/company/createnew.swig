{% extends 'layout.swig' %}
{% set title = 'Create New Test' %}
{% block page_title %}
	<i class="pe-7s-edit"></i> &nbsp;Create New Text
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

	.add-quest-btn {
		display: none;
	}
</style>
<div class="content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="header">
						<h4 class="title"><i class="fa fa-edit"></i>&nbsp; Create New Test</h4>
					</div>
					<div class="row">
						<div class="col-md-12" style="padding: 50px">
							{% include '../gqtest/includes/test-form.swig' %}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestBackend.js"></script>
<script type="text/javascript">
$(document).ready(function() {

});
</script>
{% endblock %}