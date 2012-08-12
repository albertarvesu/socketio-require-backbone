define([
	'jquery',
	'underscore',
	'backbone'
	],
	function($, _, Backbone) {
		var message = Backbone.Model.extend({
			defaults: {
				text: "undefined",
				timestamp: "undefined"
			}
		});
		return message;
	});
