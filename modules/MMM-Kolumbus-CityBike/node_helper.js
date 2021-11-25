/* eslint-disable prettier/prettier */
var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function() {
		console.log('Starting node helper for: ' + this.name);
        this.config = null;
        this.cityBikeUrl = '';
	},
	socketNotificationReceived: function(notification, payload) {
		let self = this;
        if(notification === 'GET_CITYBIKES') {
            self.config = payload.config;
            self.cityBikeUrl = payload.forecastUrl;
            this.getCityBikes();
        }
	},
	getCityBikes: function() {
		let self = this;
        request({url: this.cityBikeUrl, method: 'GET'}, function(error, response, message) {
            if (!error && (response.statusCode === 200 || response.statusCode === 304)) {
                const cityBikeData = JSON.parse(message);
                self.sendSocketNotification('YR_FORECAST_DATA', cityBikeData);
            }
            setTimeout(function() { self.getCityBikes(); }, self.config.updateInterval);
        });
	},
});