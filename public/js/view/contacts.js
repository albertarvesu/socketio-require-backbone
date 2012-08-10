define([
	'jquery',
	'underscore',
	'backbone',
	'collection/contacts',
	'text!templates/contacts/list.html'
	],
	function($, _, Backbone, Contacts, template) {

		var ContactsView = Backbone.View.extend({

			el: "#contacts",

			initialize: function(){
				this.collection = new Contacts();
	            this.collection.fetch();
				this.collection.bind("reset", this.render, this)
        	},

			render: function onRender(contacts) {
				$(this.el)
					.html( _.template(template, contacts) )
			}
		});
		return new ContactsView;

	});