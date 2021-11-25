/* eslint-disable prettier/prettier */
const NodeHelper = require('node_helper');
const axios = require('axios');

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

        axios.get(self.cityBikeUrl)
            .then(function(response) {
                const cityBikeData = JSON.parse(response.data);
                self.sendSocketNotification('CITYBIKES_RESULT', cityBikeData);
            });
	},
});