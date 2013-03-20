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
		'progImgSeq',
		'jquery',
		'prefixFree'], 
	function (AppView) {
		'use strict';

		$(document).ready(function(){

			var appView = new AppView({ el:$('#video-container') });			

			// All this needs refactoring... jeez.
			appView.imgSeqLoader = new ProgressiveImageSequence('/videos/img-seq/vid-{index}.png', 685, {
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
				var _this = appView;
				if (Math.floor(_this.currentPosition*5000) != Math.floor(_this.targetPosition*5000)) {
					_this.currentPosition += (_this.targetPosition - _this.currentPosition) / 5;
					_this.render(_this.currentPosition);
				}
				reqAnimFrame(animLoop);
			}

			animLoop();
		});

		// var threads = new Threads();
		// new ThreadView({ el:$('#threads'), collection: threads });

});
