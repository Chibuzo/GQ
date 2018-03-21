<div>
	<div class="row">
		<div class="col-md-7">
			<div>
				Instructions...
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
				<input type="hidden" name="photo_title" value="{{ me.fname }}-{{ me.lname }}" />
				<input type="hidden" name="user_id" value="{{ resume.user.id }}">
				<input type="file" name="photo" style="display: none" id="file-control" />
			</form>
		</div>
	</div>
</div>