define([
	'jquery',
	'underscore',
	'backbone',
	'model/topic'
	],
	function($, _, Backbone, Topic) {
		return Backbone.Collection.extend({
			model: Topic,
			url: '/topics'
		});
	});

