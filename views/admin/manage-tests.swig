{% extends 'layout.swig' %}
{% set title = 'Manage Test' %}
{% block page_title %}
	<i class="pe-7s-edit"></i> Manage Tests
{% endblock %}

{% block body %}
	{% include '../gqtest/includes/manage-test.swig' %}
{% endblock %}

{% block modals %}
{#{% include "includes/test-form.swig" %}#}
{#{% include "includes/manage-test-modal.swig" %}#}
{% endblock %}

{% block scriptTag %}
<script type="text/javascript" src="/js/gqTestBackend.js?v=2"></script>
<script type="text/javascript">
$(document).ready(function() {
	$('.gq-test').addClass('active');
});
</script>
