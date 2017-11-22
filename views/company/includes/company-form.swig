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
							<option value="{{ sector.id }}" selected="selected">{{ sector.title }}</option>
						{% else %}
							<option value="{{ sector.id }}">{{ sector.title }}</option>
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
				<label for="title">Contact Person</label> [ <span class="red">*</span> ]
				<input type="text" name="contact_person" class="form-control" id="contact_person"
					   value="{{ company.contact_person }}" required/>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label for="phone">Contact Phone</label>
				<input type="text" name="contact_phone" class="form-control" id="phone"
					   value="{{ company.contact_phone }}" required/>
			</div>
			<div class="col-md-6">
				<label for="email">Contact Email</label>
				<input type="text" name="contact_email" class="form-control" id="email"
					   value="{{ company.contact_email }}" />
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			<div class="col-md-6">
				<label for="phone">Password</label> [ <span class="red">*</span> ]
				<input type="password" name="password" class="form-control" id="password"/>
			</div>
			<div class="col-md-6">
				<label for="email">Verify Password</label> [ <span class="red">*</span> ]
				<input type="password" name="verify_password" class="form-control" id="verify-password" />
			</div>
		</div>
		<input type="hidden" name="first_check" id="first_check" value="{{ first_time }}">
	</div>
	{#<input type="hidden" name="company_id" id="company_id" value="{{ company.id }}"/>#}

	<div class="form-group upload-div">
		<div class="row">
			<div class="col-md-4">
				<div class="preview">
					<strong>Business Logo</strong>

					<div class="artwork" id="thumbnail-holder">
					</div>
					<br>
					<button type="button" class="btn btn-default btn-block" id="logo-btn">Select Logo Image
					</button>
				</div>
			</div>
			<div class="col-md-8">
				<div class="details">
					Thumbnail details
				</div>
			</div>
		</div>
	</div>
	<input type="file" name="logo" class="hidden" id="logo"/>
	<!--<input type="file" name="video_files" class="hidden" id="video-file" />-->
	<button type="submit" class="clearfix btn btn-warning btn-fill pull-right" id=""><i class="fa fa-save"></i> Update Details</button>
</form>