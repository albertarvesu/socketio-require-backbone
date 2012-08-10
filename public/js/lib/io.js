define([
    'jquery',
    'underscore',
    'backbone'
    ],
    function($, _, Backbone) {
		return io.connect('http://localhost:4000');
	});