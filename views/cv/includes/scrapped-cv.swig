<div id="scrapped-cv">
    {% if req.session.user_type == 'Applicant' || req.session.user_type == 'admin' %}
        <button class="btn btn-fill btn-info btn-lg pull-right" id="cv-upload-btn" style="position: absolute; top: 15px; right: 22px; z-index: 10"><i class="fa fa-upload"></i> Re-upload Resume</button>
        <button class="btn btn-fill btn-primary btn-lg pull-right" id="edit-cv-btn" style="position: absolute; top: 81px; right: 22px; z-index: 10"><i class="fa fa-pencil"></i> Edit Resume Data</button>
    {% endif %}    
    {{ cv.html | safe }}
</div>