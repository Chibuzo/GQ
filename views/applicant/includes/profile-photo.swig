<div>
	<div class="row">
		<div class="col-md-7">
			<div class="photo-instructions">
				<p class="photo-instructions-title">Your photo is a vital part of your application process. For your GQ profile, your photo must meet the following requirements:</p>
                <ol>
                    <li class="photo-instructions-item"><strong>2MB</strong> or less in in size</li>
                    <li class="photo-instructions-item">Taken with full-face view directly facing the camera and length not below chest.</li>
                    <li class="photo-instructions-item">A recent picture that reflects your current appearance.</li>
                    <li class="photo-instructions-item">Do not wear accessories over your head that obscures the hairline, unless worn daily for religious purpose.</li>
                    <li class="photo-instructions-item">Headphones, wireless hand-free devices or similar items are not acceptable.</li>
                    <li class="photo-instructions-item">If you normally wear prescription glasses, hearing device or similar articles, they may be worn for your photo.</li>
                </ol>
			</div>
		</div>

		<div class="col-md-4">
			<div class="card card-user">
				<div class="image">
					<!--                                <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>-->
				</div>
				<div class="content">
					<div class="author">
						<a href="" id="change-pic">
							{% if resume.photo_status == true %}
								<img class="avatar border-gray" src="/applicant_profilephoto/{{ resume.photo }}" alt="..."/>
							{% else %}
								<img class="avatar border-gray" src="/images/face-0.jpg" alt="..."/>
							{% endif %}
						</a>
						<h4 class="title">{{ resume.fullname }}<br />
							<small>{{ resume.email }}</small>
						</h4>
					</div><br>

				</div>
				<hr>
				<div class="text-center">
					<!--<button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
					<button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
					<button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button>-->
				</div>
			</div>
			<form action="/applicant/add-profilephoto" method="post" id="form-passport-upload" enctype="multipart/form-data">
				<input type="hidden" name="photo_name" value="{{ resume.photo }}" />
				<input type="hidden" name="user_id" value="{{ resume.user.id }}">
				<input type="file" name="photo" style="display: none" id="file-control" />
			</form>
		</div>
	</div>
</div>
