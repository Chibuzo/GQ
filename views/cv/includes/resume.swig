{% if resume.profile_status == true %}
	{# if the resume profile is completed, start off showing the presentation view #}
	{% set className = '' %}
{% else %}
	{% set className = 'hidden' %}
{% endif %}

<div class="{{ className }}" id="resume-view">
	{% if canEditResume == true %}
		<div class="row text-center">
			<button class="btn btn-primary" id="candidate-editResumeBtn"><i class="fa fa-user"></i> Edit Resume</button>
		</div>
	{% endif %}

	<div class="row">
		<div class="col-md-12 div-cv" id="cv-view">
			{% if showContactInfo == true  %}
				<h3 class="text-center"><strong>{{ resume.fullname }}</strong></h3>
				<p class="text-center"><i class="fa fa-map-marker" aria-hidden="true" style="color: #1DC7EA;"></i>{{ resume.address }}, {{ resume.city }} {{ resume.r_state }}</p>
				<p class="text-center">
					<i class="fa fa-phone-square" aria-hidden="true" style="color: #1DC7EA;"></i>
					{{ resume.phone }}
				</p>
				<p class="text-center">
					<i class="fa fa-envelope" aria-hidden="true" style="color: #1DC7EA;"></i>
					{{ resume.email }}
				</p>
			{%  else %}
				<h3 class="text-center"><strong>{{ me.fname }} {{ me.lname|first }}</strong></h3>
			{% endif %}

			<h4>&nbsp;Bio Data</h4><hr>
			<div class="row">
				<div class="col-md-12">
					<p><strong>Gender:</strong> {{ resume.gender }}</p>
					<p><strong>Date of Birth:</strong> {{ resume.dob | date('d M Y') }}</p>
				</div>
			</div>

			<h4>&nbsp;Summary</h4><hr>
			<div class="row"><div class="col-md-12">{{ resume.introduction }}</div></div>

			<h4>&nbsp;Education</h4><hr>
			{% for edu in resume.educations %}
				<div class="row">
					<div class="col-md-8 col-xs-7">
						<div class="school">
							{{ edu.institution }}<br><small>{{ edu.programme }} ({{ edu.honour }}) {% if edu.r_class != 0 %} - {{ edu.r_class }} {% endif %}</small>
						</div>
					</div>
					<div class="col-md-4 col-xs-5" style="text-align: right;">{{ edu.start_date | date('M Y') }} - {{ edu.end_date | date('M Y') }}</div>
				</div>
				<br>
			{% endfor %}

			<h4>&nbsp;Professional Certification</h4><hr>
			{% for qual in resume.qualifications %}
				<div class="row">
					<div class="col-md-5 col-xs-5">{{ qual.qualification }}</div>
					<div class="col-md-5 col-xs-4">{{ qual.institution }}</div>
					<div class="col-md-2 col-xs-3" style="text-align: right;">{{ qual.date_obtained | date('M Y') }}</div>
				</div>
				<br>
			{% endfor %}

			<h4>&nbsp;Employment History</h4><hr>
			{% for emp in resume.employments %}
				<div class="row">
					<div class="col-md-8">
						<div class="school">{{ emp.company }}<br><small>{{ emp.role }}</small></div>
						<br>
						<p>{{ emp.duties | raw | safe }}</p>
					</div>
					<div class="col-md-4" style="text-align: right;">
						{{ emp.start_date | date('M Y') }} - {{ emp.end_date | date('M Y') }}
					</div>
				</div>
			{% endfor %}

			<h4>&nbsp;Employment Status</h4><hr>
			<div class="row">
				<div class="col-md-12">
					<p>Empoyment Status: {{ resume.employment_status }}</p>
					<p>Available on: {{ resume.available_date | date('d M Y') }}</p>
				</div>
			</div>

			<h4>&nbsp;Salary</h4><hr>
			<div class="row">
				<div class="col-md-12">
					<p>Expected Salary: &#8358;{{ resume.expected_salary | formatCurrency }}</p>
					<p>Current Salary: &#8358;{{ resume.current_salary | formatCurrency }}</p>
				</div>
			</div>

			{% if showContactInfo == true %}
				<h4>&nbsp;Referees</h4><hr>
				{% for ref in resume.referencecontacts %}
					<div class="row">
						<div class="col-md-12">
							<h5><strong>{{ ref.name }}</strong></h5>
							<div class=""> {{ ref.job_title }}, {{ ref.company }} </div>
							<div>{{ ref.email }}</div>
							<div>{{ ref.phone }}</div>
						</div>
					</div>
					<br>
				{% endfor %}
			{% endif %}


		</div>
	</div>
</div>
