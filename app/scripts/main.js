/* globals ProgressiveImageSequence:false, Modernizr:false */
require.config({
	paths: {
		bootstrap:  'vendor/bootstrap',
		jquery:     '../components/jquery/jquery',
		backbone:   '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		json2:      '../components/json2/json2',
		modal:      '../components/jquery-modal/jquery.modal',
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
		'router',
		'collections/threads',
		'views/thread',
		'views/nodes',
		'views/audio',
		'views/logoGlitch',
		'progImgSeq'
	],
	function ($, AppView, Router, Threads, ThreadView, NodesView, AudioView, LogoGlitch) {
		'use strict';

		Function.prototype.method = function(name, func) {
			this.prototype[name] = func;
			return this;
		};

		String.method('toTitle', function(glue) {
			glue = (glue) ? glue : ['of', 'for', 'and', 'vs', 's'];
			return this.replace(/(\w)(\w*)/g, function(_, i, r){
				var j = i.toUpperCase() + (r !== null ? r : '');
				return (glue.indexOf(j.toLowerCase())<0)?j:j.toLowerCase();
			});
		});

		Number.method('toInt', function () {
			return Math.round(Number(this));
		});

		window.App = {};

		$(document).ready(function(){

			window.scrollTo(0, $(document).height()-$(window).height());

			App.router = new Router();

			App.view = new AppView({ el: $('#video-container') });

			// All this needs refactoring... jeez.
			App.view.imgSeqLoader = new ProgressiveImageSequence('/assets/images/video-bg/vid-{index}.jpg', 360, {
				indexSize: 4,
				initialStep: 16,
				onProgress: this.handleLoadProgress,
				onComplete: this.handleLoadComplete,
				stopAt: 1
			});

			App.view.loadCounterForIE = 0;
			App.view.imgSeqLoader.loadPosition(App.view.currentPosition,function(){
				App.view.loadCounterForIE++;
				if (App.view.loadCounterForIE === 1) {
					App.view.renderVideo(App.view.currentPosition);
					App.view.imgSeqLoader.load();
					App.view.imgSeqLoader.load();
					App.view.imgSeqLoader.load();
					App.view.imgSeqLoader.load();
				}
			});

			// Definitely refactor!
			window.reqAnimFrame = (function () {
				return window.requstAnimationFrame       ||
							 window.webkitRequstAnimationFrame ||
							 window.mozRequstAnimationFrame    ||
							 window.msRequstAnimationFrame     ||
							 window.oRequstAnimationFrame      ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
			})();

			function animLoop () {
				var that = App.view;
				if (Math.floor(that.currentPosition*5000) !== Math.floor(that.targetPosition*5000)) {
					that.currentPosition += (that.targetPosition - that.currentPosition) / 5;
					that.render(that.currentPosition);
				}
				window.reqAnimFrame(animLoop);
			}

			animLoop();

			App.audioView = new AudioView({ el: $('#audio-container') });

			App.threadCol = new Threads();
			App.threadCol.fetch({ async:false });

			App.threadView = new ThreadView({
				el: $('#thread-container'),
				collection: App.threadCol
			});

			App.nodeView = new NodesView({
				el: $('#node-list'),
				collection: App.threadCol
			});

			// Close the modal! refactor!!! ahhh waste!
			App.closeModal = function () {
				App.router.navigate(
					'thread/'+App.view.currentId,
					{replace: true}
				);
				try {
					App.videoView.$('iframe').remove();
				} catch (e) {
					console.log('Not a video...  ' + e);
				}

				// Restart the soundtrack
				// if (App.audioView.audioOn) {
				// 	App.audioView.loop.start(App.audioView.currentTrack);
				// }
			};

			// Start History!!!
			if (Backbone.history.start()) {
				var linkComponents = window.location.href.split('/');
				var pop = linkComponents.pop();
				var id = linkComponents[4];
				if (pop === 'info') {
					App.threadView.showInfo(id);
				} else if (pop === 'video') {
					App.threadView.decider(id);
				}
			} else {
				App.router.navigate('thread/1', {trigger: true});
			}

			$(document).keydown(function (e) {
				switch(e.which) {
				// Up key
				case 38:
					if (App.view.currentId !== 26) {
						App.router.navigate('#thread/'+(App.view.currentId + 1), {trigger: true});
					}
					break;
				// Down key
				case 40:
					if (App.view.currentId !== 1) {
						App.router.navigate('#thread/'+(App.view.currentId - 1), {trigger: true});
					} else {
						// Glow!!!
					}
					break;
				}
			});

			// if (Modernizr.canvas) {
			// 	var elm = '<canvas id="logoGlitch"></canvas>';
			// 	App.logoGlitch = new LogoGlitch({
			// 		el: $(elm).replaceAll('#logo')
			// 	});
			// }

			var loaderHide = function () {
				$('.loader').fadeOut(1000);
				setTimeout(loaderDelete, 1000);
			};
			var loaderDelete = function () {
				$('.loader').remove();
			};
			setTimeout(loaderHide, 1000);

		});
	});
