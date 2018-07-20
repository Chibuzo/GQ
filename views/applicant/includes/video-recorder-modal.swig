<div class="modal fade in" id="videoRecorderModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 675px">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h4 class="modal-title" id="myModalLabel">Record Your Video</h4>
			</div>

			<div class="modal-body" style="height: 515px">
			
				<div class="pavp-wrapper is-recordin-g is-playin-g is-vide-o is-uploadin-g" style="position: relative; top: 240px">
					<div class="view-wrap">
						<div class="stage">
							<video id="pavp-video-view" width="640" height="480" autoplay muted style="position: absolute; top: 0; left: 0; border-radius: 4px"></video>
						</div>

						<div class="controls">
							<div class="header">
								<a class="control left" data-reset>Cancel</a>
								<a class="control right" data-upload>Upload</a>
							</div>

							<span class="timer"></span>
							<a class="control record" data-recorder><span></span></a>
							<a class="playback" data-playback><span></span></a>
						</div>

						<div class="showbox">
							<div class="loader">
								<svg class="circular" viewBox="25 25 50 50">
								<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
								</svg>
							</div>
						</div>

						<div class="grid-lines"></div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-default btnfill" data-dismiss="modal">
					<i class="fa fa-times"></i> Cancel
				</button>
			</div>	
		</div>
	</div>		
</div>	