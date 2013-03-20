require.config({
	paths: {
		bootstrap:  'vendor/bootstrap',
		jquery:     '../components/jquery/jquery',
		prefixFree: '../components/prefix-free/prefixfree',
		threeJS:    '../components/threejs/src/Three',
		backbone:   '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		json2:      '../components/json2/json2',
		progImgSeq: 'vendor/progressiveImageSequence'
	},
	shim: {
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		}
	}
});

require([
		'views/app',
		// 'views/thread',
		// 'collections/threads',
		'jquery',
		'prefixFree'], 
	function (AppView, ThreadView, Threads) {
		'use strict';

		$(document).ready(function(){new AppView({ el:$('#video-container') });});

		// var threads = new Threads();
		// new ThreadView({ el:$('#threads'), collection: threads });

});
