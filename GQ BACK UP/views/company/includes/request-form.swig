<div class="modal inmodal fade in" id="requestModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Company Sign Up</h4>
			</div>

			<form action="/company/request" method="post" id="form-request-access">
				<div class="modal-body">
					<div class="form-group">
						<div class="row">
							<div class="col-md-12">
								<label>Company Name</label>
								<input type="text" name="company_name" class="form-control" placeholder="Name of company/organisation" id="company-name" required />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-md-12">
								<label>Contact Person</label>
								<input type="text" name="contact_name" class="form-control" placeholder="Name of contact person" id="" required />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-md-12">
								<label>Contact Phone</label>
								<input type="text" name="phone" class="form-control" placeholder="Contact Phone" required />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-md-12">
								<label>Contact Email</label>
								<input type="email" name="email" class="form-control" placeholder="Contact Email" required />
							</div>
						</div>
					</div>
					<div class="alert alert-danger hidden"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default close-modal" data-dismiss="modal">
						<i class="fa fa-times"></i>
						Cancel
					</button>
					<button type="submit" class="btn btn-danger">
						<i class="fa fa-send"></i> &nbsp;
						Send Request
					</button>
				</div>
			</form>
		</div>
	</div>
</div>