{% extends 'layout.swig' %}
{% set title = 'Dashboard' %}
{% block page_title %}
  <i class="pe-7s-users"></i> Manage Users
{% endblock %}

{% block body %}

	<div class="col-md-5 pull-right">
		<button class="btn btn-success btn-fill pull-right btnsm" data-toggle="modal" data-target="#userModal" style="margin-top: -10px; margin-bottom: 10px"><i class="fa fa-plus"></i> Add New User</button>
	</div>

<div class="col-md-12">
    <div class="card">
        <div class="header row">
          <div class="col-md-6">
            <h4 class="title">All Users</h4>
            <p class="category"></p>
          </div>

        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>S/NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                {#<th>User Type</th>#}
                <th>Status</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {% set n = 0 %}
              {% for user in users %}
                {% set n = n + 1 %}
                <tr id="{{ user.id }}">
                  <td>{{ n }}</td>
                  <td>{{ user.fullname }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.r_state }}</td>
					<td>{{ user.status }}</td>
                  <td class="opt-icons text-center">
                    <div class="button-group" role="group">
						<a href="/user/view-profile/{{ user.id }}" class="view-activities btn btn-secondary btn-xs btn-fill" rel="tooltip" title="View Profile"><i class="fa fa-user fa-lg"></i> </a>
						<a href="" class="remove-user btn btn-secondary btn-xs btn-fill btn-danger" rel="tooltip" title="Remove User"><i class="fa fa-trash-o fa-lg"></i> </a>
					</div>
				  </td>
                </tr>
              {% endfor %}
            </tbody>
          </table>
        </div>
    </div>
</div>
{% endblock %}

{% block modals %}
  {% include "../includes/user-modal.swig" %}
{% endblock %}  

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
  $(".users").addClass('active');

  $("#form-user").submit(function (e) {
    e.preventDefault();
    var $this = $(this);
    if ($("#password").val() != $("#verify_password").val()) {
      $(".alert-danger").html("<strong>Error:</strong> Password doesn't match.").removeClass('hidden');
      return false;
    }
    //$(this).find('button').html("<i class='fa fa-cog fa-spin'></i> Processing").prop('disabled', true);

    $.post('/company/adduser', $(this).serialize(), function (d) {
      if (d.status.trim() == 'success') {
        location.reload();
      } else {
        $(".alert-danger").html("<strong>Error:</strong> " + d.msg).removeClass('hidden');
      }
     // $this.find('button').text("Add User").prop('disabled', false);
    }, 'JSON');
  });

	$(".remove-user").click(function(e) {
		e.preventDefault();
		if (confirm("Are you sure you want to remove this user?")) {
			var $parentTr = $(this).parents('tr');
			var id = $parentTr.attr('id');
			$.post('/company/remove-user', { id: id }, function(d) {
				if (d.status.trim() == 'success') {
					$parentTr.fadeOut();
				}
			}, 'JSON');
		}
	});
});
</script>
{% endblock %}