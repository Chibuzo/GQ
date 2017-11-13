<div class="modal fade in" id="userModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Add New User</h4>
			</div>

			<form action="/user/signup" method="post" id="form-user">
				<div class="modal-body">
					<div class="form-group">
              <label for="fullname">Full Name</label>
              <input type="text" name="fullname" id="fullname" class="form-control" placeholder="User's full name..." required />
          </div>
          <div class="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" class="form-control" placeholder="Email address..." required />
          </div>
          <div class="form-group">
              <label for="user-type">User Type</label>
              <select name="user_type" id="user-type" class="form-control" required>
                <option value="">-- Select User Type --</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
          </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" class="form-control" placeholder="Password" required />
          </div>

          <div class="form-group">
              <label for="verify_password">Verify Password</label>
              <input type="password" name="verify_password" id="verify_password" class="form-control" placeholder="Re-enter password" required />
          </div>
				</div>
        <div class="alert alert-danger hidden"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times"></i> Cancel
					</button>
					<button type="submit" class="btn btn-info">
						<i class="fa fa-save"></i> Add User 
					</button>
				</div>
			</form>
		</div>
	</div>
</div>