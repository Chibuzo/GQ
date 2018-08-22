;((win, doc) => {
    'use strict';

    var defaults, pavp;

    defaults = {
        limit: 150, // In seconds

        handleOutdatedBrowser: function() {
            alert('MediaRecorder not supported on your browser, use Firefox 30 or Chrome 49 instead.');
        },
        onMicPermissionDenied: function() {

        },
        onCamPermissionDenied: function() {

        },
        onCamNotDetected: function() {
            console.log('Pavp: Webcam not found')
        },
        onMicNotDetected: function() {
            console.log('Pavp: Microphone not found')
        },
        ready: function() {},

        onUploadButtonClicked: function(o, b64) {

        },

        showLogs: true,
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
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

    var hasWebcam = false, hasMicrophone = false, hasSpeakers = false;
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

    pavp = function(options) {
        var v = this;

        v.mediaRecorder;
        v.chunks = [];
        v.count = 0;

        v.opts = $.extend(true, defaults, options),
        v.$video = $('#pavp-video-view'), v.video = v.$video[0];

        v.$pavp = $('.pavp-wrapper');
        v.$rec_button = v.$pavp.find('[data-recorder]');
        v.$rec_header = v.$pavp.find('.header');
        v.$rec_reset  = v.$pavp.find('[data-reset]');
        v.$rec_upload = v.$pavp.find('[data-upload]');
        v.$rec_download = v.$pavp.find('[data-download]');
        v.$playback   = v.$pavp.find('[data-playback]');

        v.is_recording = false;
        v.is_video = false;
        v.is_playing = false;

        v.timer;

        v.rec_duration = 0;
        v.play_duration = 0;

        v.setup();

        return v.response();
    }

    pavp.prototype.getBrowser = function() {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = ''+parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;
    
        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
         browserName = "Opera";
         fullVersion = nAgt.substring(verOffset+6);
         if ((verOffset=nAgt.indexOf("Version"))!=-1)
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
         browserName = "Microsoft Internet Explorer";
         fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome"
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
         browserName = "Chrome";
         fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version"
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
         browserName = "Safari";
         fullVersion = nAgt.substring(verOffset+7);
         if ((verOffset=nAgt.indexOf("Version"))!=-1)
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox"
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
         browserName = "Firefox";
         fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, "name/version" is at the end of userAgent
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
               (verOffset=nAgt.lastIndexOf('/')) )
        {
         browserName = nAgt.substring(nameOffset,verOffset);
         fullVersion = nAgt.substring(verOffset+1);
         if (browserName.toLowerCase()==browserName.toUpperCase()) {
          browserName = navigator.appName;
         }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
           fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
           fullVersion=fullVersion.substring(0,ix);
    
        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
         fullVersion  = ''+parseFloat(navigator.appVersion);
         majorVersion = parseInt(navigator.appVersion,10);
        }
    
    
        return browserName;
    },
    pavp.prototype.errorCallback = function(error) {
        this.log('navigator.getUserMedia error: ', error);
    },

    pavp.prototype.fTime = function(secs) {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));
    
        if (min < 10) {
            min = "0" + min;
        }
    
        if (sec < 10) {
            sec = "0" + sec;
        }
    
        if(hr <= 0) {
            return min + ':' + sec;
        }
    
        return hr + ':' + min + ':' + sec;
    }

    pavp.prototype.setup = function() {
        var v = this;

        checkDeviceSupport(function() {
            // log device has no cam
            !hasWebcam && v.opts.onCamNotDetected();
            // log device has no mic
            !hasMicrophone && v.opts.onMicNotDetected();

            // log cam permission not granted
            !isWebcamAlreadyCaptured && v.opts.onCamPermissionDenied(),
            // log mic permission not granted
            !isMicrophoneAlreadyCaptured && v.opts.onMicPermissionDenied();

            if(!hasWebcam || !hasMicrophone) return;

            /* handle browser support for tracker and recorder */
            if(!navigator.getUserMedia) return v.opts.handleOutdatedBrowser();

            v.setup2();
        });
    },
    pavp.prototype.setup2 = function() {
        var v = this;

        if(v.getBrowser() == "Chrome"){
            v.constraints = {
                "audio": true,
                "video": {
                    "mandatory": {
                        "minWidth": 640,
                        "maxWidth": 640,
                        "minHeight": 480,
                        "maxHeight": 480
                    },
                    "optional": []
                }
            }; //Chrome did not support the new constraints spec until 59 for video and 60 for audio
        } else if(v.getBrowser() == "Firefox") {
            v.constraints = {
                audio: true,
                video: {
                    width: {
                        min: 640,
                        ideal: 640,
                        max: 640
                    },
                    height: {
                        min: 480,
                        ideal: 480,
                        max: 480
                    }
                }
            }; //Firefox
        };

        if(typeof MediaRecorder === 'undefined' || !navigator.getUserMedia) {
            v.opts.handleOutdatedBrowser()
        }else {
            navigator.getUserMedia(v.constraints, function(stream) {
                v.stream = stream;

                if (typeof MediaRecorder.isTypeSupported == 'function'){
                    /**
                        MediaRecorder.isTypeSupported is a function announced in https://developers.google.com/web/updates/2016/01/mediarecorder and later introduced in the MediaRecorder API spec http://www.w3.org/TR/mediastream-recording/
                    */
                    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                        var options = { mimeType: 'video/webm;codecs=vp9' };
                    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
                        var options = { mimeType: 'video/webm;codecs=h264' };
                    } else  if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                        var options = { mimeType: 'video/webm;codecs=vp8' };
                    };
        
                    v.log('Using ' + options.mimeType);
                    v.mediaRecorder = new MediaRecorder(stream, options);
                } else {
                    v.log('isTypeSupported is not supported, using default codecs for browser');
                    v.mediaRecorder = new MediaRecorder(stream);
                }

                var url = window.URL || window.webkitURL;

                url ? 
                    (v.video.src = url.createObjectURL(v.stream)) : 
                        (v.video.srcObject = v.stream), v.video.play();

                v.mediaRecorder.ondataavailable = function(e) {
                    v.chunks.push(e.data);
                },
                v.mediaRecorder.onerror = function(e){
                    v.log('Error: ', e);
                },
                v.mediaRecorder.onstart = function(){
                    v.log('Started & state = ' + v.mediaRecorder.state);

                    v.is_recording = true;
                    v.is_video = false;
                    v.is_playing = false;

                    v.rec_duration = 0;

                    v.$pavp.addClass('is-recording'),
                    v.$pavp.removeClass('is-playing'),
                    v.$pavp.removeClass('is-video'),
                    v.$rec_header.addClass('hidden');

                    v.timer = setInterval(function() {
                        v.rec_duration += .2;
                        v.$pavp.find('.timer').html(v.fTime(v.rec_duration) + ' / ' + v.fTime(v.opts.limit));
                        v.rec_duration >= v.opts.limit && v.mediaRecorder.stop();
                    }, 200);
                },
                v.mediaRecorder.onstop = function(){
                    v.log('Stopped & state = ' + v.mediaRecorder.state);

                    clearInterval(v.timer);

                    v.is_recording = false;
                    v.is_video = true;
                    v.is_playing = true;

                    v.$pavp.removeClass('is-recording'),
                    v.$pavp.addClass('is-playing'),
                    v.$pavp.addClass('is-video'),
                    v.$rec_header.removeClass('hidden');

                    v.blob = new Blob(v.chunks, { type: "video/webm" });
                    
                    v.chunks = [];
                    v.video.muted = false;
                    v.video.srcObject = null,
                    v.video.src =  window.URL.createObjectURL(v.blob);

                    v.play_duration = 0;
                    v.timer = setInterval(function() {
                        var t = v.video.currentTime,
                            d = v.video.duration && v.video.duration != 'Infinity' ? 
                                    v.video.duration : 
                                        v.play_duration;

                        if(v.video.readyState && v.play_duration < v.rec_duration && v.is_video && v.is_playing && !v.video.ended) {
                            v.play_duration += .2;
                            v.$pavp.find('.timer').html(v.fTime(v.play_duration) + ' / ' + v.fTime(v.rec_duration));
                        }

                        v.video.ended && (v.$pavp.removeClass('is-playing'), v.play_duration = 0);
                    }, 200)
                },
                v.mediaRecorder.onwarning = function(e){
                    v.log('Warning: ' + e);
                };

                v.finally();
            }, v.errorCallback);
        }
    },
    pavp.prototype.finally = function() {
        var v = this;

        v.opts.ready(), v.log('Pavp: Ready'), v.ready = true,
        v.$pavp.find('.timer').html('00:00 / ' + v.fTime(v.opts.limit));

        v.$rec_reset.on('click', function() {
            v.reset();
        }),
        v.$rec_button.on('click', function(e) {
            if(v.is_playing || v.is_video)
                return;

            if(!v.is_recording) {
                v.stream ? v.mediaRecorder.start(10) : alert('Recorder not available.');
            } else {
                v.mediaRecorder.stop();
            }
        }),
        v.$rec_upload.on('click', function() {
            var b = confirm("Upload video?");

            b === true && 
                (v.video.pause(), v.is_playing = false, v.$pavp.removeClass('is-playing'), v.upload());
        }),
        v.$rec_download.on('click', function() {
            v.download();
        }),
        v.$playback.on('click', function() {
            if(!v.is_recording && v.video.srcObject == null && v.is_video) {
                v.video.paused ?
                    (v.video.play(), v.is_playing = true, v.$pavp.addClass('is-playing')) : 
                        (v.video.pause(), v.is_playing = false, v.$pavp.removeClass('is-playing'));
            }
        });
    },

    pavp.prototype.reset = function() {
        var v = this;

        v.blob = null;
        v.chunks = [];

        v.is_recording = false;
        v.is_video = false;
        v.is_playing = false;

        v.$video.removeAttr('src'),
        v.video.muted = true,
        v.video.srcObject = v.stream;

        v.rec_duration = 0;
        v.play_duration = 0;

        v.$pavp.removeClass('is-playing'),
        v.$pavp.removeClass('is-video'),
        v.$pavp.removeClass('is-recording'),
        v.$pavp.removeClass('is-uploading');

        v.timer && clearInterval(v.timer);

        v.$pavp.find('.timer').html('00:00 / ' + v.fTime(v.opts.limit));
    },

    pavp.prototype.response = function() {
        var v = this;

        return {
            stop: function() {
                v.stop();
            },
            uploadComplete: function() {
                v.uploadComplete();
            }
        }
    },

    pavp.prototype.download = function() {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(this.blob);

        this.$pavp[0].appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = 'intro_video';
        a.click();
        window.URL.revokeObjectURL(url);
    },

    pavp.prototype.upload = function() {
        var v = this;
        var is_uploading = true;

        var reader = new FileReader();
        reader.readAsDataURL(v.blob);
        reader.onloadend = function() {
            v.$pavp.addClass('is-uploading'),
            v.opts.onUploadButtonClicked(v.response(), reader.result);
        }
    },
    pavp.prototype.uploadComplete = function() {
        this.reset();
    },
    pavp.prototype.stop = function() {
        this.reset();

        let tracks = this.stream && this.stream.getTracks();

        tracks && tracks.forEach(function(track) {
            track.stop();
        });

        this.$video.removeAttr('src');
        this.video.srcObject = null;
        this.stream = null;
    },

    pavp.prototype.log = function(t) {
        console.log(t);
    }

    win.Pavp = pavp;
})(window, document);