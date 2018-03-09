{% extends 'layout.swig' %}
{% set title = 'Manage Video' %}
{% block page_title %}
	<i class="pe-7s-video"></i> My Video
{% endblock %}

{% block body %}
<style>
.empty-vid {
	border: #ccc solid thin;
	text-align: center;
	min-height: 300px;
	border-radius: 6px;
	background-color: #f0f0f0;
}

.empty-vid .pe-7s-video {
	font-size: 80px;
	vertical-align: middle;
	margin-top:100px;
}
</style>
<div class="col-md-12">
	<div class="card">
		<div class="header row">
			<div class="col-md-6">
				<h4 class="title">My Video</h4>
				<p class="category"></p>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12" style="padding: 40px;">
				<div class="">
					{% if video.length > 3 %}
						<div>
							<video style="margin-top: 15px" width="450" height="300" controls=controls>
								<source src="/applicant_videos/{{ video }}" type="video/mp4"></source>
							</video>
						</div>

						<video id="gum" autoplay></video>
						<video id="recorded" autoplay loop></video>

						<div>
							<button id="record" disabled>Start Recording</button>
							<button id="play" disabled>Play</button>
							<button id="download" disabled>Download</button>
						</div>
					{% else %}
						<div class="row">
							<div class="col-md-4 col-md-offset-4">
								<div class="empty-vid">
									<i class="pe-7s-video"></i>
									<p><button class="btn btn-danger" id="add-video"><i class="fa fa-video-camera"></i> Upload Your Video</button></p>
								</div>
							</div>
						</div>
					{% endif %}
				</div>
			</div>
		</div>
	</div>
</div>

<form action="/applicant/add-video" method="post" id="form-video-upload" enctype="multipart/form-data">
	<input type="hidden" name="video_title" value="{{ fname }}" />
	<input type="hidden" name="video_file" value="{{ video }}">
	<input type="hidden" name="resume_id" value="{{ resume_id }}">
	<input type="file" name="video_file" style="display: none" id="file-control" />
</form>
{% endblock %}

{% block scriptTag %}
{#<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>#}
{#<script src="/js/video/main.js"></script>#}
<script type="text/javascript">
$(document).ready(function() {
	$("#add-video").click(function() {
		$("#file-control").click();
	});

	$("#file-control").change(function() {
		$("#form-video-upload").submit();
		$("#add-video").html("<i class='fa fa-cog fa-spin'></i> Uploading").prop("disabled", true);
	});
});
</script>
{% endblock %}