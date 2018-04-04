{% if resume.profile_status == true %}
	{# if the resume profile is completed, start off showing the presentation
	view #}
	{% set className = '' %}
{% else %}
	{% set className = 'hidden' %}
{% endif %}

<div class="{{ className }} tab-pane fade active in" id="resume">
	{% if canEditResume == true %}
		<div class="row">
			<div id="candidate-editResumeBtn" class="col-md-2 col-md-offset-5 btn btn-primary">
				Edit Resume
			</div>
		</div>
	{% endif %}
	<hr/>
	<div class="row">
		<div class="col-md-12" style="padding: 50px; padding-top: 10px">
			{% if showContactInfo == true  %}
				<h3 class="text-center"><strong>{{ resume.fullname }}</strong></h3>
				<p class="text-center">{{ resume.address }}, {{ resume.city }} {{ resume.r_state }}</p>
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

			<h4><strong>Summary</strong></h4><hr>
			<div>{{ resume.introduction }}</div>

			<h4><strong>Education</strong></h4><hr>
			{% for edu in resume.educations %}
				<div class="row">
					<div class="col-md-8">
						<div class="school">
							{{ edu.institution }}<br><small>{{ edu.honour }}. {{ edu.programme }}</small>
						</div>
					</div>
					<div class="col-md-4" style="text-align: right;">{{ edu.start_date | date('F Y') }} - {{ edu.end_date | date('F Y') }}</div>
				</div>
				<br>
			{% endfor %}

			<h4><strong>Qualifications</strong></h4><hr>
			{% for qual in resume.qualifications %}
				<div class="row">
					<div class="col-md-8">{{ qual.qualification }}</div>
					<div class="col-md-4" style="text-align: right;">{{ qual.date_obtained | date('F Y') }}</div>
				</div>
				<br>
			{% endfor %}

			<h4><strong>Employment History</strong></h4><hr>
			{% for emp in resume.employments %}
				<div class="row">
					<div class="col-md-8">
						<div class="school">{{ emp.company }}<br><small>{{ emp.role }}</small></div>
						<br>
						<p>{{ emp.duties | raw | safe }}</p>
					</div>
					<div class="col-md-4" style="text-align: right;">
						{{ emp.start_date | date('F Y') }} - {{ emp.end_date | date('F Y') }}
					</div>
				</div>
			{% endfor %}

			{% if showContactInfo == true %}
				<h4><strong>Referrals</strong></h4><hr>
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
