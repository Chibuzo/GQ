<div class="modal inmodal fade in" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel"><i class="fa fa-envelope"></i> &nbsp;&nbsp;Send Email</h4>
			</div>

			<form action="" method="post" id="form-email">
				<div class="modal-body">
					<div class="form-group">
						<label>Subject</label>
						<input type="text" name="subject" class="form-control" />
					</div>
					<div class="form-group">
						<label>Message</label>
						<textarea name="message" class="form-control editor"></textarea>
					</div>
					<div class="alert alert-success hidden">Message sent!</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
					<button type="submit" class="btn btn-info"><i class="fa fa-envelope"></i> Send Email </button>
				</div>
			</form>
		</div>
	</div>
</div>