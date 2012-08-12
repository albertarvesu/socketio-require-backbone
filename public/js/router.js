define([
	'jquery',
	'underscore',
	'backbone',
	'collection/topics',
	'view/topic/nav',
	'view/topic/content'
], function($, _, Backbone, Topics, TopicsNav, TopicsContent) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'init': 'init',
			'start': 'start',
			'topic/:id': 'showTopic'
		},

		init: function onInit() {
			var username = prompt("Please enter your username to continue");
			window.location.hash = 'start';
			this.cleanup();
		},

		start: function onStart() {
			var topics = new Topics();
			topics.fetch({ success: this.showTopicItem });
			this.cleanup();
		},

		showTopicItem: function onShowTopicItem(topics) {
			var topicNav, topicContent;
			topics.forEach(function(topic) {

				topicNav = new TopicsNav({ model: topic });
				topicContent = new TopicsContent({ model: topic });
			
				$("#topicsNav").append(topicNav.render());
				$("#topicsContent").append(topicContent.render());
			
			});

			$("#topicsNav").add("#topicsContent").find(":first").addClass("active");
		},

		showTopic: function onShow(id) {
			this.cleanup();
		},

		cleanup: function onCleanup() {
			$(".hero-unit", "#main").remove();
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
