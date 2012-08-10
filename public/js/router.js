define([
	'jquery',
	'underscore',
	'backbone',
	'view/contacts'
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'start'
		},

		start: function onStart() {
		}
	});

	var initialize = function(){
		var app_router = new AppRouter;
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});
