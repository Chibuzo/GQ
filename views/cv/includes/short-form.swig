<div id="short-form" class="hidden">    
    <small>Fields marked in asterisk are compulsory</small>
	<form action="/resume/update" method="post" id="short-resume-form">
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
        <input type="hidden" name="resume_id" value="{{ resume.id }}" />
		<input type="hidden" name="status" value="{{ resume.status }}" />
		<input type="hidden" name="profile_status" value="{{ resume.profile_status }}" />		
		<input type="hidden" name="video_status" value="{{ video_status }}" />
		<input type="hidden" name="test_status" value="{{ test_status }}" />
		<button type="submit" class="btn btn-info btn-fill pull-right btn-lg" id="btn-submit">Update Profile</button>
        <button type="button" class="btn btn-white btn-fill pull-right btn-lg hidden" id="btn-cancel-update">Cancel</button>
    </form>
</div>    