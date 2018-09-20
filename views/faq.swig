{% extends 'theme.swig' %}
{% set title = 'Frequently Asked Questions' %}
{% block body %}
<style>
	h4 {
		cursor: pointer;
	}

	.ans {
		display: none;
		padding-bottom: 25px;
	}

	.img {
		width: 100%
	}

	img {
		margin-bottom: 30px;
		margin-top: 30px;
	}

    @media screen and (min-width: 1200px) and (max-width: 2000px) {
		.gq-container {
			width: 1320px;
			margin: auto;
		}

		.feature-row {
			margin-top: 310px;
		}
	}

#home {
	height: 34vh;
}

#home .home-wrapper {
	top: 82%
}
</style>

{% block backgroud %}
<div class="bg-img" style="background-image: url('/images/jobs.jpg');">
	<div class="overlay"></div>
</div>
{% endblock %}


<div class="container" style="padding-top: 7.8125rem; padding-bottom: 30px">
	<div class="text-center" style="margin: 20px">
		<h2>Frequently Asked Questions</h2>
	</div>

	<div class="conc">
		<h4>What jobs are currently on your platform?</h4>
        <div class="ans">With a completed candidate profile, you will be able to view available jobs.
            However, our clients are beyond those listed on the platform and you can be headhunted for jobs through the platform. 
        </div>
	</div>

    <div class="conc">
        <h4>I was chatting with someone on Live chat but my issues were not resolved</h4>
        <div class="ans">For unresloved issues on Live Chat please email support@getqualified.work and someone from the support team will either call you or send a step by step approach to resolving the issue </div>
    </div>

    <div class="conc">
        <h4>What is the salary for the job?</h4>
        <div class="ans">Unless salary expectation is given by the client for the jobs posted on our website, we are not privy to the amount. </div>
    </div>

    <div class="conc">
        <h4>Must I live in Lagos/Nigeria to be eligible to be on GQ?</h4>
        <div class="ans">No, you do not have to live in Lagos/Nigeria to access jobs on GetQualified. In fact we have candidates outside Nigeria who have used the platform to secure jobs.
            As long as you are connected to the internet, you can complete your GetQualified profile
        </div>
    </div>

    <div class="conc">
        <h4>I am interested in a job outside of Lagos and I would like to know if the job opening applies to my state?</h4>
        <div class="ans">The relevant location for each job positing is stipulated within the job listing on GetQualified. Jobs with multiple locations are replicated for each location so that only relevant candidates are put forward to our clients</div>
    </div>

    <div class="conc">
        <h4>Do I need to upload more than one video?</h4>
        <div class="ans">No, you only need to answer all the questions in one video following the instructions. You will be able to view a sample video on your candidate profile page. 
            However, if you wish you redo your video, you can create a new video and upload it. 
        </div>
    </div>

    <div class="conc">
        <h4>What if I do not have a laptop with a webcam, how do I register on GetQualified?</h4>
        <div class="ans">You can use a smartphone or tablet to complete the test provided they have a front camera.</div>
    </div>

    <div class="conc">
        <h4>How am I sure I will get a job using Getqualified?</h4>
        <div class="ans">GetQualified is a screening service used by our clients to identify the best candidates. The better your performance on the aptitude and job specifiic test(s), the more likely it is that you will be shortlisted by our clients. 

In case, your performance on the test is not as high as you would have hoped, you can register for and carry out additional training on the platform which can improve your ranking over time.</div>
    </div>

    <div class="conc">
        <h4>I have uploaded my video, what is the next step?</h4>
        <div class="ans">The next step is to check for job openings on GetQualified job board and apply to jobs which you are interested in 
        and which match your prior experience.
        </div>
    </div>

    <div class="conc">
        <h4>I have taken the basic assessment and achieved a low score. Will I still be shortlisted for interview?</h4>
        <div class="ans">GetQualified is a screening service used by our clients to identify the best candidates. The better your performance on the aptitude and job specifiic test(s), the more likely it is that you will be shortlisted by our clients. 
            In case, your performance on the test is not as high as you would have hoped, you can register for and carry out additional training on the platform which can improve your ranking over time.</div>
    </div>

    <div class="conc">
        <h4>What test percentage score is needed to pass and get called up by the employer</h4>
        <div class="ans">There is no specific score for acceptance. However, job applications are very competitive and we advise candidates to treat the assessments very seriously. 

In combination with other important elements of your job applications such as the accurancy and completeness of your resume, the basic assessment helps us and potential employers to determine your suitability for an advertised role</div>
    </div>

    <div class="conc">
        <h4>Can I apply for a job without completing the 4 steps listed in the candidate dashboard</h4>
        <div class="ans">No. You need to complete the four steps before you can apply for jobs on the platform</div>
    </div>



    <div class="conc">
        <h4>Why is my video not uploading/ I can't upload my video?</h4>
        <div class="ans">
            This is usually due to an internet issue, otherwise:
            <ul>
                <li>Check that you are connected to the internet (3G, 4G, Wifi)</li>
                <li>We recommend that you record your video directly through GetQualified as it is automatically compressed.</li>
                <li>If uploading a video recorded elsewhere, please ensure that the video file size is not more than 100 MB and that the length of the video is not more than 3 minutes.</li>
            </ul>    
        </div>
    </div>

    <div class="conc">
        <h4>My test is freezing</h4>
        <div class="ans">
            This is usually down to computer speed. We recommend that you:
            <ul>
                <li>close other browser and/or tabs leaving only the one you are taking the test with.</li>
                <li>close down any other programs that are running in the background (e.g. word, powerpoint etc)</li>
                <li>ensure that other your browers e.g. chrome/firefox are updated to the latest version</li>
            </ul>    
        </div>
    </div>

    <div class="conc hidden ">
        <h4>The "Take test" button is not responding / How do I enable my webcam and microphone</h4>
        <div class="ans">
            You should get a prompt everytime you click on "Take test" button, unless you have permanently disabled webcam and micropne access within the settings page of your browser. 
            Click hyperlink below for instructions on how to enable for each of the browers below
            - Chrome
            - Firefox
            - Internet Explorer
            - Opera
            - Safari
        </div>
    </div>

    <div class="conc">
        <h4>My test is not uploading/submitting</h4>
        <div class="ans">You may refresh the test page and try again</div>
    </div>

    <div class="conc">
        <h4>My profile picture is not uploading</h4>
        <div class="ans">The strength of your internet.<br>
            Ensure that you follow the instructions e.g file size must be within the file size limit. </div>
    </div>

</div>

{% endblock %}

{% block scriptTag %}
<script type="text/javascript">
$(document).ready(function() {
	$('h4').click(function() {
		$('.ans').slideUp();
		$(this).parent('.conc').find('.ans').slideDown();
	});
});
</script>
{% endblock %}