define([
	'jquery',
	'underscore',
	'backbone',
	'collection/topics',
	'text!templates/topic/contentItem.html'
	],
	function($, _, Backbone, Conferences, template) {
		return Backbone.View.extend({

			tagName: 'div',
			className: 'tab-pane',
			template: _.template(template),

			initialize: function() {
				this.model.bind("change", this.change, this)
        	},

			render: function onRender() {
				return $(this.el)
					.html( this.template( this.model.toJSON() ) );
			},

			change: function onChange() {
				console.log("changed",this.model.toJSON());
			}
		});

	});