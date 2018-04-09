const Amplitude = require('amplitude');
let amplitude;

const enableAmplitude = sails.config.ENABLE_AMPLITUDE ? true : false;

if (enableAmplitude) {
    amplitude = new Amplitude('8aaf3ad4adbf426906bece04650c1e1c');
} else {
    amplitude = {
        track: function(data) {
            console.info(JSON.stringify(data));
        }
    };
}


module.exports = {
    trackEvent: function(eventName, userId, eventProperties = {}, userProperties = {}) {
        let data = {
          eventType: eventName, // required
          userId: userId, // only required if device id is not passed in
          eventProperties: eventProperties,
          userProperties: userProperties
      };

      amplitude.track(data)
    }
};
