define([
	'jquery',
	'underscore',
	'backbone'
	],
	function($, _, Backbone) {
		var contact = Backbone.Model.extend({
			defaults: {
				name: "name",
				age: 1
			}
		});
		return contact;
	});
