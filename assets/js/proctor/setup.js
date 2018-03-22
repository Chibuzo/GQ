;(($, win, doc) => {
    'use strict';

    if(!$) return console.warn('Proctor: No library found. Use jQuery or MLIB');

    var defaults, proctor;

    defaults = {
        detectionLapse: 10, // lapse between general detections (audio, face)
        /**
         * @summary Score descriptions
         */
        scores: {
            noFace: 0,
            multiFace: 0,
            ambientNoise: 0,
            integrityScore: 100,
        },

        audio: {
            fps: 30,
            /**
             * Audio sensitivity to trigger recording
             */
            sensitivity: 4,
            /**
             * @summary Ignore Recording
             */
            ignoreRecording: false,
            /**
             * Duration of audio recoding (Measured in ms)
             */
            recordingDuration: 5000
        },

        video: {
            /**
             * @summary Video id or class
             */
            element: '#proctor-video',
            /**
             * @summary Canvas id or class
             */
            canvas: '#proctor-canvas',
            /**
             * Video operational frames per second
             */
            fps: 30,
            streamWidth: 320,
            streamHeight: 240,
            /**
             * @summary Ignore Tracking
             */
            ignoreTrack: false,
            /**
             * Take snaphot on proctor intialization and face tracked
             * @type boolean
             */
            takeInitialSnapshot: true
        },
        /**
         * No face was detected
         * @type function
         */
        onNoFaceTracked: function() {},
        /**
         * Perform a function on multi face tracked
         * @type function
         */
        onMultiFaceTracked: function() {},
        /**
         * @summary Do something with the snapshot taken (upload|display...) Data is in base64
         * @type function
         * @param data64 {Object} Image file in base64
         */
        handleSnapshotUpload: function(data64) {},
        /**
         * Ambient noise detection
         */
        onAmbientNoiseDetection: function(pitch, meter) {},
        /**
         * @summary This plugin is on the bleeding edge of tech. Gracefully handle exceptions
         */
        handleOutdatedBrowser: function() {},
        /**
         * Microphone permission denied
         */
        onMicPermissionDenied: function() {},
        /**
         * Webcam permission denied
         */
        onCamPermissionDenied: function() {},
        /**
         * No webcam found on user device
         */
        onCamNotDetected: function() {},
        /**
         * No Microphone found on user device
         */
        onMicNotDetected: function() {},
        /**
         * Proctor ready
         */
        proctorReady: function() {},

        showLogs: false
    };

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.enumerateDevices = function(callback) {
            navigator.mediaDevices.enumerateDevices().then(callback);
        };
    }

    var MediaDevices = [], isHTTPs = location.protocol === 'https:', canEnumerate = false;

    if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
        canEnumerate = true;
    } else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
        canEnumerate = true;
    }

    var hasMicrophone = false, hasSpeakers = false, hasWebcam = false;
    var isMicrophoneAlreadyCaptured = false, isWebcamAlreadyCaptured = false;

    function checkDeviceSupport(callback) {
        if(!canEnumerate) {
            return;
        }

        if(!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
            navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
        }

        if(!navigator.enumerateDevices && navigator.enumerateDevices) {
            navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
        }

        if(!navigator.enumerateDevices) {
            if (callback) {
                callback();
            }
            return;
        }

        MediaDevices = [];
        navigator.enumerateDevices(function(devices) {
            devices.forEach(function(_device) {
                var device = {};
                for (var d in _device) {
                    device[d] = _device[d];
                }

                if (device.kind === 'audio') {
                    device.kind = 'audioinput';
                }

                if (device.kind === 'video') {
                    device.kind = 'videoinput';
                }

                var skip;
                MediaDevices.forEach(function(d) {
                    if (d.id === device.id && d.kind === device.kind) {
                        skip = true;
                    }
                });

                if(skip) {
                    return;
                }

                if(!device.deviceId) {
                    device.deviceId = device.id;
                }

                if(!device.id) {
                    device.id = device.deviceId;
                }

                if(!device.label) {
                    device.label = 'Please invoke getUserMedia once.';
                    if (!isHTTPs) {
                        device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
                    }
                } else {
                    if(device.kind === 'videoinput' && !isWebcamAlreadyCaptured) {
                        isWebcamAlreadyCaptured = true;
                    }

                    if(device.kind === 'audioinput' && !isMicrophoneAlreadyCaptured) {
                        isMicrophoneAlreadyCaptured = true;
                    }
                }

                if(device.kind === 'audioinput') {
                    hasMicrophone = true;
                }

                if(device.kind === 'audiooutput') {
                    hasSpeakers = true;
                }

                if(device.kind === 'videoinput') {
                    hasWebcam = true;
                }

                // there is no 'videoouput' in the spec.
                MediaDevices.push(device);
            });

            if(callback) {
                callback();
            }
        });
    }

    function limitFPS(fn, fps) {
        var requestAnimFrame =  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / fps);
            };

        var then = new Date().getTime();

        fps = fps || 30;
        var interval = 1000 / fps;

        return (function loop(time){
            requestAnimationFrame(loop);

            var now = new Date().getTime();
            var delta = now - then;

            if (delta > interval) {
                then = now - (delta % interval);

                fn();
            }
        }(0));
    }

    proctor = function(options) {
        // Initialize proctor and begin instance
        this.opts = $.extend(true, defaults, options);

        this.opts.video.takeInitialSnapshot && (this.initialSnap = false);

        this.$video = $(this.opts.video.element), this.video = this.$video[0]
        this.$canvas = $(this.opts.video.canvas), this.canvas = this.$canvas[0];

        if((!this.video || !this.canvas) && !this.opts.video.ignoreTrack)
            return console.warn('Proctor: Video or Canvas not found');

        return this.init();
    }

    proctor.prototype.log = function(log) {
        this.opts.showLogs && console.log(log);
    }



    proctor.prototype.init = function() {
        var pc = this; pc.stopped = false;

        /* making sure user browser is updated and can take photos via webcam html5 */
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia );

        checkDeviceSupport(function() {
            // log device has no cam
            !hasWebcam && (pc.opts.onCamNotDetected(), pc.log('Proctor: Webcam not found'));
            // log device has no mic
            !hasMicrophone && (pc.opts.onMicNotDetected(), pc.log('Proctor: Microphone not found'));

            // log cam persmission not granted
            !isWebcamAlreadyCaptured && !pc.opts.video.ignoreTrack && pc.opts.onCamPermissionDenied(),
            // log mic permission not granted
            !isMicrophoneAlreadyCaptured && !pc.opts.audio.ignoreRecording && pc.opts.onMicPermissionDenied();

            if(!hasWebcam || !hasMicrophone) return;

            /* handle browser support for tracker and recorder */
            if((!pc.opts.audio.ignoreRecording && !navigator.getUserMedia) || (!pc.opts.audio.ignoreRecording && !Recorder.isRecordingSupported())) {
                return pc.opts.handleOutdatedBrowser();
            };

            // request webcam and mic permissions
            if((!isWebcamAlreadyCaptured && !pc.opts.video.ignoreTrack) || (!isMicrophoneAlreadyCaptured && !pc.opts.audio.ignoreRecording)) return navigator.getUserMedia({audio: true, video: true}, function(stream) { pc.proctor(); }, function(e) {});

            pc.proctor();
        });

        return {
            stop: function() {
                pc.stopped = true;
                pc.tracker && pc.tracker.stop();

                let stream = pc.video.srcObject;
                let tracks = stream.getTracks();

                tracks.forEach(function(track) {
                    track.stop();
                });

                pc.video.srcObject = null;

                pc.recorder.stop(),
                clearInterval(pc.timerIntervals);
            },
            getFeedback: function() {
                return pc.feedback;
            }
        };
    },

    proctor.prototype.proctor = function() {
        !this.opts.video.ignoreTrack && this.beginTrack(),
        !this.opts.audio.ignoreRecording && this.prepareRecorder();

        this.beginAudioTracking();
    },
    proctor.prototype.beginTrack = function() {
        var pc = this;
        var context = pc.context = this.canvas.getContext('2d');

        var tracker = new tracking.ObjectTracker(['face']);
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);
        tracker.setFPS(pc.opts.video.fps);

        pc.tracker = tracking.track(this.video, tracker, { camera: true });

        tracker.on('track', function(event) {
            context.clearRect(0, 0, pc.canvas.width, pc.canvas.height);

            !pc.trackerReady && (pc.trackerReady = true, pc.setProctorReady(), pc.log('Proctor: Tracker is ready'));

            if(event.data.length === 0) {
                // nothing was tracked
                var timer_diff = pc.timerNfT - pc.noFaceT;

                timer_diff >= pc.opts.detectionLapse && (pc.noFaceDetect = false, pc.noFaceT = pc.timerNfT = 0);

                if(timer_diff >= pc.opts.detectionLapse && !pc.noFaceDetect) {
                    // no face timer recalculation
                    pc.noFaceT = pc.timerNfT = 0;

                    // Integrity score
                    pc.noFaceN += 1,
                    pc.feedback.video.counter.noFace = pc.noFaceN,
                    pc.integrityScore -= -pc.opts.scores.noFace,
                    pc.feedback.integrityScore = pc.integrityScore;

                    pc.opts.onNoFaceTracked();

                    pc.noFaceDetect = true;
                }
            } else {
                event.data.forEach(function(rect) {
                    pc.onFaceTracked(rect);
                });

                var timer_diff = pc.timerMfT - pc.multiFaceT;

                timer_diff >= pc.opts.detectionLapse && (pc.multiFaceDetect = false, pc.multiFaceT = pc.timerMfT = 0);

                if(event.data.length > 1 && timer_diff <= pc.opts.detectionLapse && !pc.multiFaceDetect) {
                    // multi timer recalculation
                    pc.multiFaceT = pc.timerMfT = 0;

                    // Integrity score
                    pc.multiFaceN += 1,
                    pc.feedback.video.counter.multiFace = pc.multiFaceN,
                    pc.integrityScore -= -pc.opts.scores.multiFace,
                    pc.feedback.integrityScore = pc.integrityScore;

                    pc.takeSnapShot(),
                    pc.opts.onMultiFaceTracked();

                    pc.multiFaceDetect = true;
                }

                pc.initialSnap === false && (pc.takeSnapShot(), pc.initialSnap = true);
            }

            pc.opts.feedback(pc.feedback);
        });
    },
    proctor.prototype.onFaceTracked = function(rect) {
        if(this.stopped === true) return;

        this.context.strokeStyle = 'rgba(255, 255, 255, .8)';
        this.context.font = '11px Helvetica';
        this.context.fillStyle = "#fff";

        this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        this.context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        this.context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    },
    proctor.prototype.takeSnapShot = function() {
        if(this.stopped === true) return;

        this.context.drawImage(this.video, 0, 0,
            this.opts.video.streamWidth, this.opts.video.streamHeight);
        this.opts.handleSnapshotUpload(this.canvas.toDataURL("image/jpeg", 1));
    };

    proctor.prototype.beginAudioTracking = function() {
        var pc = this;
        this.audioContext = null,
        this.meter = null,
        this.mediaStreamSource;

        // monkeypatch Web Audio
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        // grab an audio context
        this.audioContext = new AudioContext();

        function drawLoop( time ) {
            if(pc.stopped === true) return;

            var pitch = pc.meter.volume * 100;

            // Update feedback
            pc.feedback.audio.pitch = pitch,
            pc.feedback.audio.meter = pc.meter;

            var timer_diff = pc.timerAnT - pc.ambientNoiseT;

            timer_diff >= pc.opts.detectionLapse && (pc.noiseDetect = false, pc.ambientNoiseT = pc.timerAnT = 0);

            if(pitch >= pc.opts.audio.sensitivity && timer_diff <= pc.opts.detectionLapse && !pc.noiseDetect) {
                // ambient timer recalculation
                pc.ambientNoiseT = pc.timerAnT = 0;
                // Integrity score
                pc.ambientNoiseN += 1,
                pc.feedback.audio.counter.noise = pc.ambientNoiseN,
                pc.integrityScore -= -pc.opts.scores.ambientNoise,
                pc.feedback.integrityScore = pc.integrityScore,
                // Call ambient noise detected function
                pc.opts.onAmbientNoiseDetection(pitch, pc.meter),
                // Start recording noise
                // Stop recording after 5 seconds
                pc.recorder.start(), setTimeout(function() {
                    pc.recorder.stop();
                }, pc.opts.audio.recordingDuration);

                pc.noiseDetect = true;
            }

            pc.opts.feedback(pc.feedback);
        }

        try {
            // ask for an audio input
            navigator.getUserMedia({
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, function(stream) {
                pc.log('Proctor: Listening');
                // Create an AudioNode from the stream.
                pc.mediaStreamSource = pc.audioContext.createMediaStreamSource(stream);

                // Create a new volume meter and connect it.
                pc.meter = createAudioMeter(pc.audioContext);
                pc.mediaStreamSource.connect(pc.meter);

                // kick off the audio updating/measures
                limitFPS(function() {
                    drawLoop();
                }, pc.opts.audio.fps);
            }, function(e) {});
        } catch(e) {
            pc.log('Proctor: getUserMedia threw exception :' + e);
        }
    },

    proctor.prototype.prepareRecorder = function() {
        var pc = this;

        pc.recorderReady = false;

        this.recorder = new Recorder({
            monitorGain: parseInt(0, 10),
            numberOfChannels: parseInt(1, 10),
            wavBitDepth: parseInt(16, 10),
            encoderPath: "/js/proctor/waveWorker.min.js"
        });

        this.recorder.addEventListener("start", function(e){
            if(pc.stopped === true) return;
            pc.log('Proctor: Recorder is started');
        });
        this.recorder.addEventListener("stop", function(e){
            pc.log('Proctor: Recorder is stopped');
        });
        this.recorder.addEventListener("pause", function(e){
            pc.log('Proctor: Recorder is paused');
        });
        this.recorder.addEventListener("resume", function(e){
            pc.log('Proctor: Recorder is resuming');
        });
        this.recorder.addEventListener("streamError", function(e){
            pc.log('Proctor: Error encountered: ' + e.error.name );
        });
        this.recorder.addEventListener("streamReady", function(e){
            pc.recorderReady = true, pc.setProctorReady();
            pc.log('Proctor: Audio stream is ready.');
        });
        this.recorder.addEventListener("dataAvailable", function(e){
            if(pc.stopped === true) return;
            var dataBlob = new Blob( [e.detail], { type: 'audio/wav' } );
            var reader = new window.FileReader();
            reader.readAsDataURL(dataBlob);
            reader.onloadend = function() {
                var base64data = reader.result;
                pc.opts.handleAudioUpload(base64data);
            }
        });

        this.recorder.initStream()
    };

    proctor.prototype.setProctorReady = function() {
        var proctor = false, pc = this;

        // check if mic/recorder is not ignored and ready
        proctor = !this.opts.audio.ignoreRecording && this.recorderReady ? true : false;
        // check if camera/tracker is not ignored and ready
        proctor = !this.opts.video.ignoreTrack && this.trackerReady ? true : false;

        if(!proctor || pc.proctorReady === true)
            return;

        // Default on proctor ready state
        proctor && this.opts.proctorReady();

        // Computations
        this.integrityScore = this.opts.scores.integrityScore,
        this.ambientNoiseN = this.noFaceN = this.multiFaceN = 0;

        this.noiseDetect = this.noFaceDetect = this.multiFaceDetect = false,
        // Timer computations for audio tracking
        this.ambientNoiseT = this.noFaceT = this.multiFaceT = 0,
        // Timers
        this.timerAnT = this.timerNfT = this.timerMfT = 0,
        // Timing Intervals
        this.timerIntervals = setInterval(function() {
            pc.timerAnT += 1; pc.timerNfT += 1; pc.timerMfT += 1;
        }, 1000);

        // Data feedback for creating visuals etc.
        this.feedback = {
            integrityScore: this.integrityScore,

            /** Audio Visuals */
            audio: {
                fps: this.opts.audio.fps,
                sensitivity: this.opts.audio.sensitivity,
                pitch: null,
                meter: null,
                counter: {
                    noise: this.ambientNoiseN
                }
            },

            video: {
                fps: this.opts.video.fps,
                width: this.opts.video.streamWidth,
                height: this.opts.video.streamHeight,
                counter: {
                    noFace: this.noFaceN,
                    multiFace: this.multiFaceN
                }
            }
        }

        pc.proctorReady = true;
    };

    win.Proctor = proctor;
})('undefined' != typeof jQuery && jQuery, window, document)
