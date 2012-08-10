require.config({
	baseUrl: 'js',
	paths: {
		"jquery": "lib/require-jquery",
		"underscore": "lib/underscore",
		"backbone": "lib/backbone",
		"bootstrap": "lib/bootstrap",
		"sync": "lib/backbone.sync",
		"io": "lib/io",
		"app": "app",

	}
});
require([
	'app',
	'io',
	'sync'
	], 
	function(App){
		App.initialize();
});
