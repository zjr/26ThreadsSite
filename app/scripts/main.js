require.config({
	paths: {
		bootstrap:  'vendor/bootstrap',
		jquery:     '../components/jquery/jquery',
		prefixFree: '../components/prefix-free/prefixfree',
		threeJS:    '../components/threejs/src/Three',
		backbone:   '../components/backbone-amd/backbone',
		underscore: '../components/underscore/underscore',
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

require(['views/app', 'jquery', 'prefixFree'], function (AppView) {
	'use strict';

	new AppView();

});
