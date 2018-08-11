{#{% if resume.profile_status == true %}
	{# if the resume profile is completed, start off hiding the form view #
	{% set className = 'hidden' %}
{% else %}
	{% set className = '' %}
{% endif %}#}

<div id="resumeForm-container" class="hidden">
	<div class="clearfix"><a href="/viewsampleresume" class="btn btn-danger pull-right"><i class="fa fa-file-pdf-o"></i> View Sample CV</a></div>
	<small>Fields marked in asterisk are compulsory</small>
	<form action="/resume/update" method="post" id="form-resume">
		<div class="form-group">
			<div class="row">
				<div class="col-md-6">
					<label>First Name</label> <span class="red">*</span>
					<input type="text" name="fname" class="form-control" placeholder="Enter your first name" value="{{ me.fname }}" required>
				</div>
				<div class="col-md-6">
					<label>Last Name</label> <span class="red">*</span>
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
				<div class="col-md-4">
					<label><i class="fa fa-male"></i> &nbsp;Gender</label> <span class="red">*</span>
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
				<div class="col-md-4">
					<label><i class="fa fa-calendar"></i> &nbsp;Date of Birth</label> <span class="red">*</span>
					{% if resume.dob %}
						<input type="text" name="dob" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" class="form-control gq-datep" value="{{ resume.dob | date('Y-m-d') }}" required readonly>
					{% else %}
						<input type="text" name="dob" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" class="form-control gq-datep" required readonly>
					{% endif %}
				</div>
				<div class="col-md-4">
					<label><i class="fa fa-phone"></i> &nbsp;Phone Number</label> <span class="red">*</span>
					<input type="text" name="phone" class="form-control" placeholder="Your Phone Number" value="{{ resume.phone }}" required>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-12">
					<label><i class="fa fa-map-marker"></i>&nbsp;Address</label> <span class="red">*</span>
					<input type="text" name="address" class="form-control" placeholder="Your residential address" value="{{ resume.address }}" required>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-4">
					<label for="phone"><i class="fa fa-map-marker"></i>&nbsp;Resident Country</label> <span class="red">*</span>
					<select name="country" class="form-control" required>
						{% for country in countries %}
							<option value="{{ country.country }}">{{ country.country }}</option>
						{% endfor %}
					</select>
				</div>
				<div class="col-md-4">
					<label for="email"><i class="fa fa-map-marker"></i>&nbsp;State</label>
					<select name="state" class="form-control" required>
						<option value="">Select State</option>
						{% for state in states %}
							<option value="{{ state.state_name }}">{{ state.state_name }}</option>
						{% endfor %}
					</select>
				</div>
				<div class="col-md-4">
					<label for="email"><i class="fa fa-map-marker"></i>&nbsp;City</label> <span class="red">*</span>
					<input type="text" name="city" class="form-control" value="{{ resume.city }}" required />
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-12">
					<label>Professional Summary</label> <span class="red">*</span>
					<textarea name="introduction" class="form-control" placeholder="Not more than 70 words" required>{{ resume.introduction }}</textarea>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-4">
					<label>Employment Status</label> <span class="red">*</span>
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
					<label>Current Annual Salary</label> <span class="red">*</span>
					<input type="number" name="current_salary" class="form-control" placeholder="Current Annual Salary?" value="{{ resume.current_salary }}" required>
				</div>

				<div class="col-md-4">
					<label>Expected Annual Salary</label> <span class="red">*</span>
					<input type="number" name="expected_salary" class="form-control" placeholder="Expected Annual Salary?" value="{{ resume.expected_salary }}" required>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-md-4">
					<label>Available Employment Start Date</label> <span class="red">*</span>
					{% if resume.available_date %}
						<input type="text" name="available_date" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="{{ resume.available_date | date('Y-m-d') }}" readonly required>
					{% else %}
						<input type="text" name="available_date" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required readonly>
					{% endif %}
				</div>
			</div>
		</div>

		<fieldset id="institutions">
			<legend>Education</legend>
			<div class="form-group">
                {% for edu in resume.educations %}
                    <div class="inst-row">
						<div class="row">
							<div class="col-md-4">
								<label>Institution</label>
								<input type="text" name="institution[]" class="form-control school" placeholder="Name of Institution" value="{{ edu.institution }}" required>
							</div>
							<div class="col-md-2">
								<label>Honour</label>
								{% set selected = 'selected' %}
								<select name="honour[]" class="form-control" required>
									<option value=""></option>
									{% for honor in honours %}
										{% if honor.honour == edu.honour %}
											<option value="{{ honor.honour }}" selected="selected">{{ honor.honour }}</option>
										{% else %}
											<option value="{{ honor.honour }}">{{ honor.honour }}</option>
										{% endif %}
									{% endfor %}
								</select>
							</div>

							<div class="col-md-3">
								<label>Programme</label>
								<input type="text" name="programme[]" class="form-control" placeholder="Field of Study" value="{{ edu.programme }}" required>
							</div>
							<div class="col-md-2">
								<label>Result</label>
								<select name="r_class[]" class="form-control">
									<option value=""></option>
									{% for clas in r_class %}
										{%if clas.name == edu.r_class %}
											<option value="{{ clas.id }}" selected="selected">{{ clas.name }}</option>
										{% else %}
											<option value="{{ clas.id }}">{{ clas.name }}</option>
										{% endif %}	
									{% endfor %}
								</select>
							</div>
						</div>

						<div class="row">
							<div class="col-md-2">
								<label>Start Date</label>
								{% if edu.start_date %}
									<input type="text" name="inst_start_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="{{ edu.start_date | date('Y-m-d') }}" required readonly>
								{% else %}
									<input type="text" name="inst_start_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required readonly>
								{% endif %}
							</div>
							<div class="col-md-2">
								<label>End Date</label>
								{% if edu.end_date %}
									<input type="text" name="inst_end_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="{{ edu.end_date | date('Y-m-d') }}" required readonly>
								{% else %}
									<input type="text" name="inst_end_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required readonly>
								{% endif %}
							</div>
							<input type="hidden" name="inst_id[]" value="{{ edu.id }}" />

							<div class="col-md-1 col-xs-12 delete-entry-col">
								<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
								<div class="delete-entry-container">
									<a href="" data-id="{{ edu.id }}" class="delete-entry remove-edu-btn ">
										Remove
									</a>
								</div>
							</div>
						</div>
					</div>
                {% endfor %}


                {% if resume.educations.length < 1 %}
                    <div class="inst-row">
						<div class="row">
							<div class="col-md-4">
								<label>Institution</label>
								<input type="text" name="institution[]" class="form-control school is-required" placeholder="Name of Institution" required>
							</div>
							<div class="col-md-2">
								<label>Honour</label>
								<select name="honour[]" class="form-control" required>
									<option value=""></option>
									{% for honor in honours %}
										<option value="{{ honor.honour }}">{{ honor.honour }}</option>
									{% endfor %}
								</select>
							</div>
							<div class="col-md-3">
								<label>Programme</label>
								<input type="text" name="programme[]" class="form-control is-required" placeholder="Field of Study" required>
							</div>
							<div class="col-md-2">
								<label>Result</label>
								<select name="r_class[]" class="form-control">
									<option value=""></option>
									{% for clas in r_class %}
										<option value="{{ clas.id }}">{{ clas.name }}</option>
									{% endfor %}
								</select>
							</div>
						</div>

						<div class="row">
							<div class="col-md-2">
								<label>start Date</label>
								<input type="text" name="inst_start_date[]" class="form-control gq-datep is-required" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required readonly>
							</div>
							<div class="col-md-2">
								<label>End Date</label>
								<input type="text" name="inst_end_date[]" class="form-control gq-datep is-required" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required readonly>
							</div>
						</div>
						<input type="hidden" name="inst_id[]" value="0" />
					</div>
                {% endif %}

				<div class="inst-row addable" id="another-inst">
					<div class="row">
						<div class="col-md-4">
							<label>Institution</label>
							<input type="text" name="institution[]" class="form-control school is-required" placeholder="Name of Institution">
						</div>
						<div class="col-md-2">
							<label>Honour</label>
							<select name="honour[]" class="form-control">
								<option value=""></option>
								{% for honor in honours %}
									<option value="{{ honor.honour }}">{{ honor.honour }}</option>
								{% endfor %}
							</select>
						</div>
						<div class="col-md-3">
							<label>Programme</label>
							<input type="text" name="programme[]" class="form-control is-required" placeholder="Field of Study">
						</div>
						<div class="col-md-2">
							<label>Result</label>
							<select name="r_class[]" class="form-control">
								<option value=""></option>
								{% for clas in r_class %}
									<option value="{{ clas.id }}">{{ clas.name }}</option>
								{% endfor %}
							</select>
						</div>
					</div>

					<div class="row">
						<div class="col-md-2">
							<label>start Date</label>
							<input type="text" name="inst_start_date[]" class="form-control gq-datep is-required" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
						</div>
						<div class="col-md-2">
							<label>End Date</label>
							<input type="text" name="inst_end_date[]" class="form-control gq-datep is-required" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
						</div>
						<input type="hidden" name="inst_id[]" value="0" />
						<div class="col-md-1 col-xs-12 delete-entry-col">
							<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
							<div class="delete-entry-container">
								<a href="" class="delete-entry remove-edu-btn">
									Remove
								</a>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="text-center col-sm-2 col-sm-offset-5">
						<div class="add-entry-container">
								<a href="" class="add-institution">
										Add Education
								</a>
						</div>
					</div>
				</div>
            </div>
		</fieldset>

		<fieldset id="qualifications">
			<legend>Professional Certifications</legend>
			<div class="form-group">
				{% for qual in resume.qualifications %}
					<div class="row qual-row">
						<div class="col-md-5">
							<label>Qualification</label>
							<input type="text" name="qualification[]" class="form-control" placeholder="Certificate Obtain" value="{{ qual.qualification }}">
						</div>

						<div class="col-md-4">
							<label>Institution</label>
							<input type="text" name="qualification_institution[]" class="form-control" placeholder="Institution Obtained From" value="{{ qual.institution }}">
						</div>

						<div class="col-md-2">
							<label>Date Obtained</label>
							{% if qual.date_obtained %}
								<input type="text" name="qualification_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="{{ qual.date_obtained | date('Y-m-d') }}" readonly>
							{% else %}
								<input type="text" name="qualification_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
							{% endif %}
						</div>
						<input type="hidden" name="qualification_id[]" value="{{ qual.id }}" />
						<div class="col-md-1 col-xs-12 delete-entry-col">
							<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
							<div class="delete-entry-container">
								<a href="" data-id="{{ qual.id }}" class="delete-entry remove-qualification-btn ">
									Remove
								</a>
							</div>
						</div>
					</div>
				{% endfor %}

                {% if resume.qualifications.length < 1 %}
                    <div class="row qual-row">
    					<div class="col-md-5">
    						<label>Qualification</label>
    						<input type="text" name="qualification[]" class="form-control" placeholder="Certificate Obtained">
    					</div>

						<div class="col-md-4">
							<label>Institution</label>
							<input type="text" name="qualification_institution[]" class="form-control" placeholder="Institution Obtained From" />
						</div>

    					<div class="col-md-2">
    						<label>Date Obtained</label>
    						<input type="text" name="qualification_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
						</div>
						<input type="hidden" name="qualification_id[]" value="0" />
						<div class="col-md-1 col-xs-12 delete-entry-col">
							<label class="hidden-xs" style="visibility: hidden; width: 100%;">|</label>
							<div class="delete-entry-container">
								<a href="" class="delete-entry remove-qualification-btn ">
									Remove
								</a>
							</div>
						</div>
					</div>
				{% endif %}

				<div class="row qual-row addable" id="another-qualification">
					<div class="col-md-5">
						<label>Qualification</label>
						<input type="text" name="qualification[]" class="form-control" placeholder="Certificate Obtained">
					</div>
					<div class="col-md-4">
							<label>Institution</label>
							<input type="text" name="qualification_institution[]" class="form-control" placeholder="Institution Obtained From">
						</div>

					<div class="col-md-2">
						<label>Date Obtained</label>
						<input type="text" name="qualification_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
					</div>
					<input type="hidden" name="qualification_id[]" value="0" />
					<div class="col-md-1 col-xs-12 delete-entry-col">
						<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
						<div class="delete-entry-container">
							<a href="" class="delete-entry remove-qualification-btn ">
								Remove
							</a>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="text-center col-sm-2 col-sm-offset-5">
						<div class="add-entry-container">
								<a href="" class="add-qualification">
										Add Qualification
								</a>
						</div>
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
								<input type="text" name="location" class="form-control" value="{{ emp.location }}" placeholder="City, State where you did this job">
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<label>Job functions</label>
								<textarea name="duty" class="form-control" placeholder="List some duties you did at the job">{{ emp.duties }}</textarea>
							</div>
						</div>

						<div class="row">
							<div class="col-md-4">
								<label>start Date</label>
								{% if emp.start_date %}
									<input type="text" name="employment_start_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="{{ emp.start_date | date('Y-m-d') }}" readonly>
								{% else %}
									<input type="text" name="employment_start_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
								{% endif %}
							</div>
							<div class="col-md-4">
								<label>End Date</label>
								{% if emp.end_date %}
									<input type="text" name="employment_end_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" value="{{ emp.end_date | date('Y-m-d') }}" readonly>
								{% else %}
									<input type="text" name="employment_end_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
								{% endif %}
							</div>
							<input type="hidden" name="employment_id[]" value="{{ emp.id }}" />
							<div class="col-md-1 col-xs-12 delete-entry-col">
								<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
								<div class="delete-entry-container">
									<a href="" data-id="{{ emp.id }}" class="delete-entry remove-employment-btn">
										Remove
									</a>
								</div>
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
								<input type="text" name="location" class="form-control" placeholder="City, State">
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<label>Job functions</label>
								<textarea name="duty" class="form-control" placeholder="List your key responsibilities"></textarea>
							</div>
						</div>

						<div class="row">
							<div class="col-md-4">
								<label>start Date</label>
								<input type="text" name="employment_start_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
							</div>
							<div class="col-md-4">
								<label>End Date</label>
								<input type="text" name="employment_end_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
							</div>
							<input type="hidden" name="employment_id[]" value="0" />
							<div class="col-md-1 col-xs-12 delete-entry-col">
								<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
								<div class="delete-entry-container">
									<a href="" class="delete-entry remove-employment-btn">
										Remove
									</a>
								</div>
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
						<div class="col-md-4">
							<label>start Date</label>
							<input type="text" name="employment_start_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
						</div>
						<div class="col-md-4">
							<label>End Date</label>
							<input type="text" name="employment_end_date[]" class="form-control gq-datep" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" readonly>
						</div>
						<input type="hidden" name="employment_id[]" value="0" />
						<div class="col-md-1 col-xs-12 delete-entry-col">
							<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
							<div class="delete-entry-container">
								<a href="" class="delete-entry remove-employment-btn">
									Remove
								</a>
							</div>
						</div>
					</div>
				</div>

                 <div class="row">
                    <div class="text-center col-sm-2 col-sm-offset-5">
                    	<div class="add-entry-container">
								<a href="" class="add-employment">
										Add Employment
                        		</a>
						</div>
                    </div>
                </div>
			</div>
		</fieldset>

		<fieldset id="referenceContacts">
			<legend>Referee Contacts</legend>
			<div class="form-group">
				{% for ref in resume.referencecontacts %}
					{% set fname = ref.name.split(' ')[0] %}
					{% set lname = ref.name.split(' ')[1] %}

					<div class="reference-row">
						<div class="row">
							<div class="col-md-6">
								<label>First name</label>
								<input type="text" name="reference_fname[]" class="form-control" placeholder="Reference's First Name" value="{{ fname }}">
							</div>

							<div class="col-md-6">
								<label>Last name</label>
								<input type="text" name="reference_lname[]" class="form-control" placeholder="Reference's Last Name" value="{{ lname }}">
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
								<input type="text" name="reference_phone[]" class="form-control" placeholder="Reference's  Name" value="{{ ref.phone }}">
							</div>
							<input type="hidden" name="reference_id[]" value="{{ ref.id }}" />
							<div class="col-md-1 col-xs-12 delete-entry-col">
								<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
								<div class="delete-entry-container">
									<a href="" data-id="{{ ref.id }}" class="delete-entry remove-reference-btn">
										Remove
									</a>
								</div>
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
							<input type="hidden" name="reference_id[]" value="0" />
							<div class="col-md-1 col-xs-12 delete-entry-col">
								<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
								<div class="delete-entry-container">
									<a href="" class="delete-entry remove-reference-btn">
										Remove
									</a>
								</div>
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
						<input type="hidden" name="reference_id[]" value="0" />
						<div class="col-md-1 col-xs-12 delete-entry-col">
							<label class="hidden-xs" style="visibility: hidden; width: 100%;">Remove</label>
							<div class="delete-entry-container">
								<a href="" class="delete-entry remove-reference-btn">
									Remove
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

             <div class="row">
                    <div class="text-center col-sm-2 col-sm-offset-5">
                    	<div class="add-entry-container">
								<a href="" class="add-reference">
										Add Reference
                        		</a>
						</div>
                    </div>
                </div>
		</fieldset>

		<input type="hidden" name="resume_id" value="{{ resume.id }}" />
		<input type="hidden" name="status" value="{{ resume.status }}" />
		<input type="hidden" name="video_status" value="{{ video_status }}" />
		<input type="hidden" name="test_status" value="{{ test_status }}" />
		<button type="submit" class="btn btn-info btn-fill pull-right btn-lg" id="btn-submit">Update Profile</button>
	</form>
</div>
