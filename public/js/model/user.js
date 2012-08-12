define([
	'jquery',
	'underscore',
	'backbone'
	],
	function($, _, Backbone) {
		var user = Backbone.Model.extend({
			defaults: {
				name: "unknown",
				age: "unknown",
				location: "undefined"
			}
		});
		return user;
	});
