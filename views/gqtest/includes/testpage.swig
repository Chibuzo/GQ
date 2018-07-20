<div class="row test">
    <div class="col-md-12 overlay-container">
        <div class="alert alert-warning text-center invisible" id="notification-alert">You are currently disconnected from the internet. You need to be connected on the internet to continue this test</div>
        <div class="test-overlay"></div>

        <div class="row">
            <h3 class="test-title text-center"></h3><br>
        </div>

        <div class="row">
            <div id="instructions" class="col-md-10 col-md-offset-1">
                <div class="instruction"></div>
                <div class="text-center">
                    <button class="btn btn-lg btn-primary hidden" id="start-test"><i class="fa fa-clock-o"></i> Start Test</button>
                </div>
            </div>
        </div>

        <div class="row inner-test-div" style="display: none;">

            <div class="col-md-5 col-sm-12 col-xs-12 pull-right">
                <!-- Timer -->
                <div class="test-panel-text text-center" style="font-size: 18px">
                    <span><strong>Time Remaining: </strong></span>
                    <div id="countdowntimer"></div><br>
                </div>
                
                <!-- Invigilation Score -->
                <div class="row">
                    <div class="col-sm-8 col-sm-offset-2 col-xs-12">
                        <div class="invigilation-report test-panel-text">
                            <div><strong>Invigilation Score:</strong></div>
                        </div>

                        <div class="progress" rel="tooltip" title="This score is a measure of the integrity of your test. Keep it high by taking test alone in a very quiet room." style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%; ">
                            {#<span class="sr-only">100% Complete (danger)</span>Integrity Score#}
                            </div>
                        </div>
                    </div>
                </div>

                

                <div class="row">
                    <div class="col-md-12" style="margin-bottom: 14px">
                        <div class="row" style="text-align: center;font-weight: bold;">
                            Question Key:
                        </div>

                        <div class="row">
                            <div class="col-xs-3">
                                <p class="key-text">
                                    Answered:
                                </p>
                                <div class="question-num-base question-key" style="background-color: #99cc66;"></div>
                            </div>

                            <div class="col-xs-3">
                                <p class="key-text">
                                    Skipped:
                                </p>
                                <div class="question-num-base question-key" style="background-color: #c9302c;"></div>
                            </div>

                            <div class="col-xs-3">
                                <p class="key-text">
                                    Current:
                                </p>
                                <div class="question-num-base question-key" style="background-color: #A37F2D"></div>
                            </div>

                            <div class="col-xs-3">
                                <p class="key-text">
                                    Unanswered:
                                </p>
                                <div class="question-num-base question-key"></div>
                            </div>

                        </div>
                    </div>
                </div>

                

                <div class="row">
                    <!-- THIS IS HIDDEN -->
                    <div class="question-count text-right" style="display: none;"><span id="current_quest"></span> / <span id="total_questions"></span></div>
                    <div class="col-md-12">
                        <div class="question-nums row">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-7 col-sm-12 col-xs-12 pull-left">
                <div class="col-md-9 col-sm-12 col-xs-12">
                    <div class="question"></div>
                    <div class="question-image"></div>
                    <div class="options">
                        <ul class="opts">
                            <li><label class="radio"><span id="span-opt-a"></span> <input name="opt" id="opt_a" type="radio" class="form-control" data-toggle="radio" value="A" /></label></li>
                            <li><label class="radio"><span id="span-opt-b"></span> <input name="opt" id="opt_b" type="radio" class="form-control" data-toggle="radio" value="B" /></label></li>
                            <li><label class="radio"><span id="span-opt-c"></span> <input name="opt" id="opt_c" type="radio" class="form-control" data-toggle="radio" value="C" /></label></li>
                            <li><label class="radio"><span id="span-opt-d"></span> <input name="opt" id="opt_d" type="radio" class="form-control" data-toggle="radio" value="D" /></label></li>
                            <li><label class="radio"><span id="span-opt-e"></span> <input name="opt" id="opt_e" type="radio" class="form-control" data-toggle="radio" value="E" /></label></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="row nav-row inner-test-div" style="display: none;">

            <div class="col-md-7 col-sm-12 col-xs-12">
                <div class="nav-btns">
                    <button class="btn btn-info btn-fill" id="prev-question"><i class="fa fa-caret-left"></i>Prev</button>
                    <button class="btn btn-info btn-fill" id="next-question">Next <i class="fa fa-caret-right"></i></button>
                </div>
            </div>

            <div class="col-md-5 col-sm-12 col-xs-12">
                <div class="nav-btns" style="text-align: center; padding-top: 10px">
                    <button class="btn btn-primary btn-fill" id="submit-test">Submit Section </button>
                </div>
            </div>

        </div>

    </div>
    <div class="test-blocked-screen hidden" style="margin-top: 15px">
        <div class="alert alert-danger">
            <div class="text-center">
                <br><i class="fa fa-ban fa-4x"></i>
                <br><br><h4>Hi {{ resume.fullname }},<br><br>Your microphone and webcam MUST grant access to this page before you can proceed with the test.</h4>
                <p>You will need to refresh this page after granting access to use your webcam and microphone.</p>
            </div>
        </div>
        <span id="integrity-score" class="hidden"></span>
    </div>
</div>

<div class="cell hidden">
    <div class="proctor-container" style="position: relative; width: 320px; height: 240px">
        <video id="proctor-video" width="320" height="240" preload autoplay loop muted style="position: absolute; top: 0; left: 0"></video>
        <canvas id="proctor-canvas" width="320" height="240" style="position: absolute; top: 0; left: 0"></canvas>
    </div>
</div>
<!-- test row end -->