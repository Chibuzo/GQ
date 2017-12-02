<form action="/resume/update" method="post" id="form-resume">
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label>First Name</label>
				<input type="text" name="fname" class="form-control" placeholder="Enter your first name" value="{{ me.fname }}" required>
			</div>
			<div class="col-md-6">
				<label>Last Name</label>
				<input type="text" name="lname" class="form-control" placeholder="Enter your last name" value="{{ me.lname }}" required>
			</div>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label>Email</label>
				<input type="email" name="email" class="form-control" placeholder="Enter your email" value="{{ resume.email }}" readonly>
			</div>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label>Gender</label>
				{% if resume.gender == 'Female' %}
					{% set female = 'selected=selected' %}
				{% elseif resume.gender == 'Male' %}
					{% set male = 'selected=selected' %}
				{% endif %}
				<select name="gender" class="form-control" required>
					<option value="">Gender</option>
					<option value="Female" {{ female }}>Female</option>
					<option value="Male" {{ male }}>Male</option>
				</select>
			</div>
			<div class="col-md-6">
				<label>Phone Number</label>
				<input type="text" name="phone" class="form-control" placeholder="Your Phone Number" value="{{ resume.phone }}" required>
			</div>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label>Address</label>
				<input type="text" name="address" class="form-control" placeholder="Your residencial Address" value="{{ resume.address }}" required>
			</div>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-4">
				<label for="phone">Resident Country</label>
				<select name="country" class="form-control">
					<option value="">Select Country</option>
				</select>
			</div>
			<div class="col-md-4">
				<label for="email">State</label>
				<select name="state" class="form-control">
					<option value="">Select State</option>
				</select>
			</div>
			<div class="col-md-4">
				<label for="email">City</label>
				<input type="text" name="city" class="form-control" />
			</div>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label>Introduction</label>
				<textarea name="introduction" class="form-control" placeholder="Short profile introduction, not more than 150 words" required>{{ resume.introduction }}</textarea>
			</div>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<div class="col-md-4">
				<label>Employment Status</label>
				{% if resume.employment_status == 'Employed' %}
					{% set employed = 'selected=selected' %}
				{% elseif resume.employment_status == 'Unemployed' %}
					{% set unemployed = 'selected=selected' %}
				{% endif %}
				<select name="employment_status" class="form-control" required>
					<option value="">Employment Status</option>
					<option value="Employed" {{ employed }}>Currently Employed</option>
					<option value="Unemployed" {{ unemployed }}>Unemployed</option>
				</select>
			</div>
			<div class="col-md-4">
				<label>Available Date</label>
				<input type="text" name="available_date" class="form-control datep" placeholder="When can you start work?" value="{{ resume.available_date | date('Y-m-d') }}" required>
			</div>
			<div class="col-md-4">
				<label>Expected Salary</label>
				<input type="text" name="expected_salary" class="form-control" placeholder="The least salary you can take?" value="{{ resume.expected_salary }}" required>
			</div>
		</div>
	</div>

	<fieldset id="institutions">
		<legend>Institutions Attended</legend>
		<div class="form-group">
			{% for edu in resume.educations %}
				<div class="row inst-row">
					<div class="col-md-3">
						<label>Institution</label>
						<input type="text" name="institution[]" class="form-control" placeholder="Name of Institution" value="{{ edu.institution }}" required>
					</div>
					<div class="col-md-1">
						<label>Honour</label>
						<select name="honour[]" class="form-control">
							<option value=""></option>
							<option value="BSc">BSc</option>
							<option value="Msc">Msc</option>
							<option value="PhD">PhD</option>
							<option value="HND">HND</option>
							<option value="OND">OND</option>
						</select>
					</div>
					<div class="col-md-3">
						<label>Programme</label>
						<input type="text" name="programme[]" class="form-control" placeholder="Field of Study" value="{{ edu.programme }}" required>
					</div>
					<div class="col-md-2">
						<label>start Date</label>
						<input type="text" name="inst_start_date[]" class="form-control datep" placeholder="Date started" value="{{ edu.start_date | date('Y-m-d') }}" required>
					</div>
					<div class="col-md-2">
						<label>End Date</label>
						<input type="text" name="inst_end_date[]" class="form-control datep" placeholder="Date ended" value="{{ edu.end_date | date('Y-m-d') }}" required>
					</div>
					<input type="hidden" name="inst_id[]" value="{{ edu.id }}" />
					<div class="col-md-1">
						<a href="" class="plus-btn add-institution"><i class="fa fa-plus fa-lg"></i></a>
					</div>
				</div>
			{% endfor %}

			{% if resume.educations.length < 1 %}
			<div class="row inst-row">
				<div class="col-md-3">
					<label>Institution</label>
					<input type="text" name="institution[]" class="form-control" placeholder="Name of Institution" required>
				</div>
				<div class="col-md-1">
					<label>Honour</label>
					<select name="honour[]" class="form-control">
						<option value=""></option>
						<option value="BSc">BSc</option>
						<option value="Msc">Msc</option>
						<option value="PhD">PhD</option>
						<option value="HND">HND</option>
						<option value="OND">OND</option>
					</select>
				</div>
				<div class="col-md-3">
					<label>Programme</label>
					<input type="text" name="programme[]" class="form-control" placeholder="Field of Study" required>
				</div>
				<div class="col-md-2">
					<label>start Date</label>
					<input type="text" name="inst_start_date[]" class="form-control datep" placeholder="Date started" required>
				</div>
				<div class="col-md-2">
					<label>End Date</label>
					<input type="text" name="inst_end_date[]" class="form-control datep" placeholder="Date ended" required>
				</div>
				<input type="hidden" name="inst_id[]" />
				<div class="col-md-1">
					<a href="" class="plus-btn add-institution"><i class="fa fa-plus fa-lg"></i></a>
				</div>
			</div>
			{% endif %}

			<div class="row inst-row addable" id="another-inst">
				<div class="col-md-3">
					<label>Institution</label>
					<input type="text" name="institution[]" class="form-control" placeholder="Name of Institution">
				</div>
				<div class="col-md-1">
					<label>Honour</label>
					<select name="honour[]" class="form-control">
						<option value=""></option>
						<option value="BSc">B.Sc</option>
						<option value="Msc">MSc</option>
						<option value="PhD">PhD</option>
					</select>
				</div>
				<div class="col-md-3">
					<label>Programme</label>
					<input type="text" name="programme[]" class="form-control" placeholder="Field of Study">
				</div>
				<div class="col-md-2">
					<label>start Date</label>
					<input type="text" name="inst_start_date[]" class="form-control datep" placeholder="Date started">
				</div>
				<div class="col-md-2">
					<label>End Date</label>
					<input type="text" name="inst_end_date[]" class="form-control datep" placeholder="Date ended">
				</div>
				<div class="col-md-1">
					<a href="" class="plus-btn add-institution"><i class="fa fa-plus fa-lg"></i></a>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset id="qualifications">
		<legend>Qualifications/Professional Certifications Obtained</legend>
		<div class="form-group">
			{% for qual in resume.qualifications %}
				<div class="row qual-row">
					<div class="col-md-9">
						<label>Qualification</label>
						<input type="text" name="qualification[]" class="form-control" placeholder="Certificate Obtain" value="{{ qual.qualification }}">
					</div>

					<div class="col-md-2">
						<label>Date Obtained</label>
						<input type="text" name="qualification_date[]" class="form-control datep" placeholder="Date Obtained" value="{{ qual.date_obtained | date('Y-m-d') }}">
					</div>
					<input type="hidden" name="qualification_id[]" value="{{ qual.id }}" />
					<div class="col-md-1">
						<a href="" class="plus-btn add-qualification"><i class="fa fa-plus fa-lg"></i></a>
					</div>
				</div>
			{% endfor %}

			{% if resume.qualifications.length < 1 %}
				<div class="row qual-row">
					<div class="col-md-9">
						<label>Qualification</label>
						<input type="text" name="qualification[]" class="form-control" placeholder="Certificate Obtained">
					</div>

					<div class="col-md-2">
						<label>Date Obtained</label>
						<input type="text" name="qualification_date[]" class="form-control datep" placeholder="Date Obtained">
					</div>
					<input type="hidden" name="qualification_id[]" value="{{ qual.id }}" />
					<div class="col-md-1">
						<a href="" class="plus-btn add-qualification"><i class="fa fa-plus fa-lg"></i></a>
					</div>
				</div>
			{% endif %}

			<div class="row qual-row addable" id="another-qualification">
				<div class="col-md-9">
					<label>Qualification</label>
					<input type="text" name="qualification[]" class="form-control" placeholder="Certificate Obtained">
				</div>

				<div class="col-md-2">
					<label>Date Obtained</label>
					<input type="text" name="qualification_date[]" class="form-control datep" placeholder="Date Obtained">
				</div>

				<div class="col-md-1">
					<a href="" class="plus-btn add-qualification"><i class="fa fa-plus fa-lg"></i></a>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset id="employments">
		<legend>Employment History</legend>
		<div class="form-group">
			{% for emp in resume.employments %}
				<div class="employment-row">
					<div class="row">
						<div class="col-md-4">
							<label>Company/Organisation</label>
							<input type="text" name="company[]" class="form-control" placeholder="Name of Company/Organisation" value="{{ emp.company }}" required>
						</div>

						<div class="col-md-4">
							<label>Job Title</label>
							<input type="text" name="job_title[]" class="form-control" placeholder="Job Title/Role" value="{{ emp.role }}" required>
						</div>

						<div class="col-md-4">
							<label>Location</label>
							<input type="text" name="location" class="form-control" placeholder="City, State where you did this job">
						</div>
					</div>

					<div class="row">
						<div class="col-md-12">
							<label>Job functions</label>
							<textarea name="duty" class="form-control" placeholder="List some duties you did at the job"></textarea>
						</div>
					</div>

					<div class="row">
						<div class="col-md-5">
							<label>start Date</label>
							<input type="text" name="employment_start_date[]" class="form-control datep" placeholder="Date started" value="{{ emp.start_date | date('Y-m-d') }}">
						</div>
						<div class="col-md-5">
							<label>End Date</label>
							<input type="text" name="employment_end_date[]" class="form-control datep" placeholder="Date ended" value="{{ emp.end_date | date('Y-m-d') }}">
						</div>
						<input type="hidden" name="employment_id[]" value="{{ emp.id }}" />
						<div class="col-md-1">
							<a href="" class="plus-btn add-employment"><i class="fa fa-plus fa-lg"></i></a>
						</div>
					</div>
				</div>
			{% endfor %}

			{% if resume.employments.length < 1 %}
				<div class="employment-row">
					<div class="row">
						<div class="col-md-4">
							<label>Company/Organisation</label>
							<input type="text" name="company[]" class="form-control" placeholder="Name of Company/Organisation">
						</div>

						<div class="col-md-4">
							<label>Job Title</label>
							<input type="text" name="job_title[]" class="form-control" placeholder="Job Title/Role">
						</div>

						<div class="col-md-4">
							<label>Location</label>
							<input type="text" name="location" class="form-control" placeholder="City, State where you did this job">
						</div>
					</div>

					<div class="row">
						<div class="col-md-12">
							<label>Job functions</label>
							<textarea name="duty" class="form-control" placeholder="List some duties you did at the job"></textarea>
						</div>
					</div>

					<div class="row">
						<div class="col-md-5">
							<label>start Date</label>
							<input type="text" name="employment_start_date[]" class="form-control datep" placeholder="Date started">
						</div>
						<div class="col-md-5">
							<label>End Date</label>
							<input type="text" name="employment_end_date[]" class="form-control datep" placeholder="Date ended">
						</div>
						<div class="col-md-1">
							<a href="" class="plus-btn add-employment"><i class="fa fa-plus fa-lg"></i></a>
						</div>
					</div>
				</div>
			{% endif %}

			<div class="employment-row addable" id="another-employment">
				<div class="row">
					<div class="col-md-4">
						<label>Company/Organisation</label>
						<input type="text" name="company[]" class="form-control" placeholder="Name of Company/Organisation">
					</div>

					<div class="col-md-4">
						<label>Job Title</label>
						<input type="text" name="job_title[]" class="form-control" placeholder="Job Title/Role">
					</div>

					<div class="col-md-4">
						<label>Location</label>
						<input type="text" name="location" class="form-control" placeholder="City, State where you did this job">
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<label>Job functions</label>
						<textarea name="duty" class="form-control" placeholder="List some duties you did at the job"></textarea>
					</div>
				</div>

				<div class="row">
					<div class="col-md-5">
						<label>start Date</label>
						<input type="text" name="employment_start_date[]" class="form-control datep" placeholder="Date started">
					</div>
					<div class="col-md-5">
						<label>End Date</label>
						<input type="text" name="employment_end_date[]" class="form-control datep" placeholder="Date ended">
					</div>
					<div class="col-md-1">
						<a href="" class="plus-btn add-employment"><i class="fa fa-plus fa-lg"></i></a>
					</div>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset id="referenceContacts">
		<legend>Reference Contacts</legend>
		<div class="form-group">
			{% for ref in resume.referencecontacts %}
			{% set fname = ref.name.split(' ')[0] %}
			{% set lname = ref.name.split(' ')[1] %}
				<div class="reference-row">
					<div class="row">
						<div class="col-md-6">
							<label>First name</label>
							<input type="text" name="reference_fname[]" class="form-control" placeholder="Reference's First Name" value="{{ fname }}" required>
						</div>

						<div class="col-md-6">
							<label>Last name</label>
							<input type="text" name="reference_lname[]" class="form-control" placeholder="Reference's Last Name" value="{{ lname }}" required>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<label>Company/Organisation</label>
							<input type="text" name="reference_company[]" class="form-control" placeholder="Reference's Workplace" value="{{ ref.company }}" required>
						</div>

						<div class="col-md-6">
							<label>Job Title</label>
							<input type="text" name="reference_job_title[]" class="form-control" placeholder="Reference's Job title/Role" value="{{ ref.job_title }}" required>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<label>Email</label>
							<input type="email" name="reference_email[]" class="form-control" placeholder="Reference's Email" value="{{ ref.email }}" required>
						</div>

						<div class="col-md-5">
							<label>Phone</label>
							<input type="text" name="reference_phone[]" class="form-control" placeholder="Reference's  Name" value="{{ ref.phone }}" required>
						</div>
						<input type="hidden" name="reference_id[]" value="{{ ref.id }}" />
						<div class="col-md-1">
							<a href="" class="plus-btn add-reference"><i class="fa fa-plus fa-lg"></i></a>
						</div>
					</div>
				</div>
			{% endfor %}

			{% if resume.referencecontacts.length < 1 %}
			<div class="reference-row">
				<div class="row">
					<div class="col-md-6">
						<label>First name</label>
						<input type="text" name="reference_fname[]" class="form-control" placeholder="Reference's First Name" value="{{ fname }}">
					</div>

					<div class="col-md-6">
						<label>Last name</label>
						<input type="text" name="reference_lname[]" class="form-control" placeholder="Reference's Last Name" value="">
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label>Company/Organisation</label>
						<input type="text" name="reference_company[]" class="form-control" placeholder="Reference's Workplace" value="{{ ref.company }}">
					</div>

					<div class="col-md-6">
						<label>Job Title</label>
						<input type="text" name="reference_job_title[]" class="form-control" placeholder="Reference's Job title/Role" value="{{ ref.job_title }}">
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label>Email</label>
						<input type="email" name="reference_email[]" class="form-control" placeholder="Reference's Email" value="{{ ref.email }}">
					</div>

					<div class="col-md-5">
						<label>Phone</label>
						<input type="text" name="reference_phone[]" class="form-control" placeholder="Reference's  Name" value="{{ ref.phone }}" >
					</div>
					<input type="hidden" name="reference_id[]" value="{{ ref.id }}" />
					<div class="col-md-1">
						<a href="" class="plus-btn add-reference"><i class="fa fa-plus fa-lg"></i></a>
					</div>
				</div>
			</div>
			{% endif %}

			<div class="reference-row addable" id="another-reference">
				<div class="row">
					<div class="col-md-6">
						<label>First name</label>
						<input type="text" name="reference_fname[]" class="form-control"
							   placeholder="Reference's First Name">
					</div>

					<div class="col-md-6">
						<label>Last name</label>
						<input type="text" name="reference_lname[]" class="form-control"
							   placeholder="Reference's Last Name">
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label>Company/Organisation</label>
						<input type="text" name="reference_company[]" class="form-control"
							   placeholder="Reference's Workplace">
					</div>

					<div class="col-md-6">
						<label>Job Title</label>
						<input type="text" name="reference_job_title[]" class="form-control"
							   placeholder="Reference's Job title/Role">
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label>Email</label>
						<input type="email" name="reference_email[]" class="form-control"
							   placeholder="Reference's Email">
					</div>

					<div class="col-md-5">
						<label>Phone</label>
						<input type="text" name="reference_phone[]" class="form-control" placeholder="Reference's Name">
					</div>
					<div class="col-md-1">
						<a href="" class="plus-btn add-reference"><i class="fa fa-plus fa-lg"></i></a>
					</div>
				</div>
			</div>
		</div>
	</fieldset>

	<input type="hidden" name="resume_id" value="{{ resume.id }}" />
	<button type="submit" class="btn btn-info btn-fill pull-right btn-lg" id="btn-submit">Update Profile</button>
</form>

