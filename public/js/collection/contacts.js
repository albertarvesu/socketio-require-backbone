define([
	'jquery',
	'underscore',
	'backbone',
	'model/user'
	],
	function($, _, Backbone, User) {
		var Contacts =  Backbone.Collection.extend({
			model: User,
			url: '/contacts'
		});
		return Contacts;
	});

