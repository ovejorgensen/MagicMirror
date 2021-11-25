/* eslint-disable prettier/prettier */
module.register("MMM-Kolumbus-CityBike", {
	defaults: {
		cityBikeUrl: "https://opencom.no/dataset/00b94410-ea79-49de-a10f-1a0c10c8b842/resource/6539f285-9de4-45bf-8369-c1f3960f12c7/download/bysykkel.json",
		updateInterval: 10000,
	},
	getStyles: function () {
		return ["mmm-kolumbus-citybike.css"];
	},
    start: function () {
        this.loaded = false;
        this.getCityBikes(this.config.cityBikeUrl);
    },
    getCityBikes: function (url) {
        var self = this;
        this.sendSocketNotification("GET_CITYBIKES", url);
    },
    socketNotificationReceived: function (notification, payload) {
        if (notification === "CITYBIKES_RESULT") {
            this.updateDom(payload.bikeInfo);
        }
        this.updateDom(1000);
    },
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
