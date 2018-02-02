<form action="/company/update-details" method="post" id="form-company-setup" enctype="multipart/form-data">
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="title">Name of Company/Organisation </label> [ <span class="red">*</span> ]
				<input type="text" name="company_name" class="form-control" id="company_name"
					   value="{{ company.company_name }}" required/>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="title">Brief Description</label>
				<textarea name="description" class="form-control" id="description">{{ company.description }}</textarea>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="title">Industry</label>
				<select name="sector" class="form-control">
					<option value="">-- Choose Company Industry --</option>
					{% for sector in sectors %}
						{% if company.sector == sector.id %}
							<option value="{{ sector.title }}" selected="selected">{{ sector.title }}</option>
						{% else %}
							<option value="{{ sector.title }}">{{ sector.title }}</option>
						{% endif %}
					{% endfor %}
				</select>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="title">Address</label>
				<input type="text" name="address" class="form-control" id="address" value="{{ company.address }}" required/>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-4">
				<label for="phone">Country</label>
				<select name="country" class="form-control">
					{% for country in countries %}
						<option value="{{ country.country }}">{{ country.country }}</option>
					{% endfor %}
				</select>
			</div>
			<div class="col-md-4">
				<label for="email">State</label>
				<select name="state" class="form-control">
					<option value="">Select State</option>
					{% for state in states %}
						{% if state.state_name == company.r_state %}
							<option value="{{ state.state_name }}" selected="selected">{{ state.state_name }}</option>
						{% else %}
							<option value="{{ state.state_name }}">{{ state.state_name }}</option>
						{% endif %}
					{% endfor %}
				</select>
			</div>
			<div class="col-md-4">
				<label for="email">City</label>
				<input type="text" name="city" class="form-control" value="{{ company.city }}" />
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-12">
				<label for="title">Contact Person</label> [ <span class="red">*</span> ]
				<input type="text" name="contact_person" class="form-control" id="contact_person"
					   value="{{ company.contact_person }}" required/>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label for="phone">Contact Phone</label> [ <span class="red">*</span> ]
				<input type="text" name="contact_phone" class="form-control" id="phone"
					   value="{{ company.contact_phone }}" required/>
			</div>
			<div class="col-md-6">
				<label for="email">Contact Email</label>
				<input type="text" name="contact_email" class="form-control" id="email"
					   value="{{ company.contact_email }}" readonly />
			</div>
		</div>
	</div>

	{% if first_time == 'true' %}
		<div class="form-group">
			<div class="row">
				<div class="col-md-6">
					<label for="phone">Password</label>
					<input type="password" name="password" class="form-control" id="password"/>
				</div>
				<div class="col-md-6">
					<label for="email">Verify Password</label>
					<input type="password" name="verify_password" class="form-control" id="verify-password" />
				</div>
			</div>
			<input type="hidden" name="first_check" id="first_check" value="{{ first_time }}">
		</div>
	{% endif %}
	{#<input type="hidden" name="company_id" id="company_id" value="{{ company.id }}"/>#}
	<input type="hidden" name="logo_name" value="{{ company.logo_name }}" />
	<div class="form-group uploaddiv">
		{#<div class="row">#}
			{#<div class="col-md-4">#}
				{#<div class="preview">#}
					{#<strong>Business Logo</strong>#}

					{#<div class="artwork" id="thumbnail-holder">#}
					{#</div>#}
					{#<br>#}
					{#<button type="button" class="btn btn-default btn-block" id="logo-btn">Select Logo Image#}
					{#</button>#}
				{#</div>#}
			{#</div>#}
			{#<div class="col-md-8">#}
				{#<div class="details">#}
					{#Thumbnail details#}
				{#</div>#}
			{#</div>#}
		{#</div>#}
		<label for="logo">Company Logo Image</label>
		<input type="file" name="logo" class="form-control-file"  id="logo" />
	</div>
	<!--<input type="file" name="video_files" class="hidden" id="video-file" />-->
	<button type="submit" class="clearfix btn btn-warning btn-fill pull-right" id=""><i class="fa fa-save"></i> Update Details</button>
</form>