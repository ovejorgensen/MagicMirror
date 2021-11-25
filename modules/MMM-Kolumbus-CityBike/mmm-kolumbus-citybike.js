/* eslint-disable prettier/prettier */
module.register("MMM-Kolumbus-CityBike", {
	defaults: {
		cityBikeUrl: "https://opencom.no/dataset/00b94410-ea79-49de-a10f-1a0c10c8b842/resource/6539f285-9de4-45bf-8369-c1f3960f12c7/download/bysykkel.json",
		updateInterval: 10000,
        stationIds: ["798196b7-b179-4270-bacd-221373f77202", "d7603c16-5156-4179-81e2-5127a2af19fd", "38187088-3f84-45c2-890a-df7efc502ce8"],
	},
	getStyles: function () {
		return ["mmm-kolumbus-citybike.css"];
	},
    start: function () {
        this.list = null;
        this.loaded = false;
        this.getCityBikes(this.config.cityBikeUrl);
    },
    getCityBikes: function (url) {
        this.sendSocketNotification("GET_CITYBIKES", url);
    },
    socketNotificationReceived: function (notification, payload) {
        if (notification === "CITYBIKES_RESULT") {
            this.processBikes(payload.bikeInfo);
        }
        this.updateDom(1000);
    },
    processBikes: function (obj) {
        if (obj.points) {
            this.list = obj;
            this.loaded = true;
        }
    },
	getDom: function() {
		let wrapper = document.createElement("div");
        
		if (!this.loaded) {
            wrapper.innerHTML = "loading..";
			wrapper.className = "loading";
			return wrapper;
        }

        this.config.stationIds.forEach(stationId => {
            let station = this.list.find(s => s.id === stationId);
            let stationWrapper = document.createElement("div");
            stationWrapper.className = "station";
            stationWrapper.innerHTML = station.name;
            stationWrapper.innerHTML += `${station.vehicles}/${station.capacity}`;
            wrapper.appendChild(stationWrapper);
        });
        
		return wrapper;
	},
});
