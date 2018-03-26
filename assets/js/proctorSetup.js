//$(document).ready(() => {
    let proctor;

    // sample initializing proctor/setup
    function startProctor() {
        return new Proctor({
            detectionLapse: 60, // detection lapse (seconds)

            scores: {
                noFace: -3,
                multiFace: -10,
                ambientNoise: -2,
                integrityScore: 100,
            },

            audio: {
                fps: 2, // from 0(maximum cpu available fps) 60hz max (1)
                sensitivity: 95, // from 0 - 100
                ignoreRecording: false
            },

            video: {
                element: '#proctor-video',
                canvas: '#proctor-canvas',
                fps: 20, // from 0(maximum cpu available fps) 60hz max (2)
                streamWidth: 320,
                streamHeight: 240,
                ignoreTrack: false,
                takeInitialSnapshot: true
            },

            handleOutdatedBrowser: () => {
                // alert('Update your browser ma niggah');
            },

            handleSnapshotUpload: (data64, eventName) => {
                // console.log("Proctor: Upload Snapshot");
            },
            handleAudioUpload: (data64) => {
                // console.log("Proctor: Upload Audio");
            },
            onNoFaceTracked: (feedback) => {
                // console.log('Proctor: No face detected');
                console.log(feedback)
            },
            // on multi face detected
            onMultiFaceTracked: () => {
                // console.log('Proctor: Multiple faces detected');
                console.log();
            },
            // Integrity score deduction can be applied here
            onAmbientNoiseDetection: (pitch, meter) => {
                // console.log('Proctor: Ambient noise detected');
            },

            onMicPermissionDenied: () => {
                // console.warn('Proctor (Perms): Microphone needed for this test');
                blockTest();
            },
            onCamPermissionDenied: () => {
                // console.warn('Proctor (Perms): Webcam needed for this test');
                blockTest();
            },

            onCamNotDetected: () => {
                // console.warn('Proctor: This device does not have a webcam');
                blockTest();
            },
            onMicNotDetected: () => {
                // console.warn('Proctor: This device does not have a microphone');
                blockTest();
            },

            proctorReady: () => {
                // console.log('Proctor is ready.');
                startTest();
            },

            //feedback: (e) => {
            //    //console.log(e);
            //},

            showLogs: true
        });
    }
    let stopProctorAndGetFeedback = () => {
        let feedback;
        proctor.stop(), (feedback = proctor.getFeedback());
        delete proctor;
    }

    //proctor = startProctor();
//});