/* global Module */

/* Magic Mirror
 * Module: alert
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

Module.register('alert',{
	defaults: {
		// scale|slide|genie|jelly|flip|bouncyflip|exploader
		effect: "slide",
		//time a notification is displayed
		display_time: 3500,
		//shown at startup
		welcome_message: "Welcome, start was successfull!"
	},
	getScripts: function() {
		return ["classie.js", "modernizr.custom.js", 'notificationFx.js', 'sweetalert.js'];
	},
	getStyles: function() {
		return ['ns-default.css', 'sweetalert.css'];
	},
	show_notification: function (message) {
		message = "<font size='4px' color='#4A4A4A'>" + message.title + "</font><br /><font size='5px'>" + message.message + "</font>"
		new NotificationFx({
			message : message,
			layout : "growl",
			effect : this.config.effect,
			ttl: this.config.display_time
		}).show();
	},
	show_alert: function (params) {
		if (typeof params["type"] === 'undefined') { params["type"] = null; }
		if (typeof params["imageUrl"] === 'undefined') { params["imageUrl"] = null; }
		if (typeof params["imageSize"] === 'undefined') { params["imageSize"] = null; }
		if (typeof params["timer"] === 'undefined') { params["timer"] = null; }
		swal({
			title: params["title"], 
			imageUrl: params["imageUrl"], 
			imageSize: params["imageSize"],
			type: params["type"],
			text: params["message"],
			timer: params["timer"],
			html: true,
			showConfirmButton: false 
			});
	},
	hide_alert: function () {
		swal.close()
	},
	notificationReceived: function(notification, payload, sender) {
		if (notification === 'SHOW_NOTIFICATION') {
			this.show_notification(payload)
		}
		else if (notification === 'SHOW_ALERT') {
			this.show_alert(payload)
		}
		else if (notification === 'HIDE_ALERT') {
			this.hide_alert()
		}
	},
	start: function() {
		if (this.config.welcome_message){
			this.show_notification({title: "Welcome", message: this.config.welcome_message})
		}
		Log.info('Starting module: ' + this.name);
	}

});