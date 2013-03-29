require.config({
	paths: {
		bootstrap:  'vendor/bootstrap',
		jquery:     '../components/jquery/jquery',
		prefixFree: '../components/prefix-free/prefixfree',
		threeJS:    '../components/threejs/src/Three',
		backbone:   '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		json2:      '../components/json2/json2',
		handlebars: '../components/handlebars.js/dist/handlebars',
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
		'jquery',
		'views/app',
		'collections/threads',
		'views/thread',
		'progImgSeq',
		'prefixFree'
	],
	function ($, AppView, Threads, ThreadView) {
		'use strict';

		String.prototype.toTitle = function(glue) {
			glue = (glue) ? glue : ['of', 'for', 'and'];
			return this.replace(/(\w)(\w*)/g, function(_, i, r){
				var j = i.toUpperCase() + (r != null ? r : "");
				return (glue.indexOf(j.toLowerCase())<0)?j:j.toLowerCase();
			});
		};

		$(document).ready(function(){

			var appView = new AppView({ el: $('#video-container') });

			// All this needs refactoring... jeez.
			appView.imgSeqLoader = new ProgressiveImageSequence('/images/video-bg/vid-{index}.jpg', 685, {
				indexSize: 4,
				initialStep: 16,
				onProgress: this.handleLoadProgress,
				onComplete: this.handleLoadComplete,
				stopAt: 1
			});

			appView.loadCounterForIE = 0;
			appView.imgSeqLoader.loadPosition(appView.currentPosition,function(){
				appView.loadCounterForIE++;
				if (appView.loadCounterForIE == 1) {
					appView.renderVideo(appView.currentPosition);
					appView.imgSeqLoader.load();
					appView.imgSeqLoader.load();
					appView.imgSeqLoader.load();
					appView.imgSeqLoader.load();
				}
			});

			// Definitely refactor!
			window.reqAnimFrame = (function () {
				return window.requstAnimationFrame       ||
							 window.webkitRequstAnimationFrame ||
							 window.mozRequstAnimationFrame    ||
							 window.msRequstAnimationFrame     ||
							 window.oRequstAnimationFrame      ||
				function (callback, element) {
					window.setTimeout(callback, 1000 / 60);
				};
			})();

			function animLoop () {
				var that = appView;
				if (Math.floor(that.currentPosition*5000) != Math.floor(that.targetPosition*5000)) {
					that.currentPosition += (that.targetPosition - that.currentPosition) / 5;
					that.render(that.currentPosition);
				}
				reqAnimFrame(animLoop);
			}

			animLoop();

			var threads = new Threads();
			threads.fetch({ async:false });

			var threadView = new ThreadView({
				el: $('#thread'),
				collection: threads
			});

		});

		// var threads = new Threads();
		// new ThreadView({ el:$('#threads'), collection: threads });

});
