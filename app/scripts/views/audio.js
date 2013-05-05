/* globals SeamlessLoop:false, Modernizr:false */
define(['backbone','text!templates/audio.html', 'audio/seamless'], function (Backbone, audioTemplate) {
	'use strict';

	var AudioView = Backbone.View.extend({

		events: {
			'click button': 'leSwitch'
		},

		initialize: function () {
			_.bindAll(this);
			var a1 = Modernizr.audio.mp3 ? 'text!audio/BangaloreUriMp3' :
                                     'text!audio/BangaloreUriOgg' ;
			var a2 = Modernizr.audio.mp3 ? 'text!audio/HypercarnalUriMp3' :
			                               'text!audio/HypercarnalUriOgg' ;
			var a3 = Modernizr.audio.mp3 ? 'text!audio/PhysicUriMp3' :
			                               'text!audio/PhysicUriOgg' ;
			require([a1, a2, a3], _.bind(function(A1, A2, A3) {
				this.uri = [A1, A2, A3];
				this.loaded = false;

				this.sec = 10 * 1000;
				this.loop = new SeamlessLoop();
				this.loop.addUri(this.uri[0], this.sec, 1);
				this.loop.addUri(this.uri[1], this.sec, 2);
				this.loop.addUri(this.uri[2], this.sec, 3);
				this.loop.callback(_.bind(this.soundsLoaded, this));

				this.template = _.template(audioTemplate);
				this.tracks = [
					{id: 1, title: 'Bangalore Rose'},
					{id: 2, title: 'Hypercarnal Ascension'},
					{id: 3, title: 'Physic'}
				];
				_.each(this.tracks, this.render, this);

				// Add active class to auto played track.
				this.$('.key-button[data-id="1"]').addClass('active');

				// Start the height shifting
				setInterval(_.bind(this.shiftHeight, this), 1500);
			}, this));
		},

		soundsLoaded: function () {
			this.loaded = true;
			this.loop.start(1);
			this.currentTrack = 1;
			this.audioOn = true;
		},

		render: function (element) {
			this.$el.append(this.template(element));
		},

		leSwitch: function (event) {
			// set active state
			this.$('.key-button').not(event.currentTarget).removeClass('active');
			$(event.currentTarget).toggleClass('active');

			// switch loops
			var track = Number($(event.currentTarget).attr('data-id'));
			if (this.audioOn) {
				if (this.currentTrack !== track) {
					this.loop.update(track, false);
					this.currentTrack = track;
				} else {
					this.loop.stop();
					this.audioOn = false;
				}
			} else {
				this.loop.start(track);
				this.audioOn = true;
				this.currentTrack = track;
			}
		},

		specialStop: function () {
			var tries = typeof(tries) === 'undefined' ? 0 : tries;
			if (!App.audioView.loaded && tries < 50) {
				window.setTimeout(App.audioView.specialStop, 25);
			} else {
				try {
					App.audioView.loop.stop();
					App.audioView.audioOn = false;
				} catch (e) {
					console.log('specialStop: ' + e + ', but nobody cares.');
				}
			}
			tries++;
		},

		shiftHeight: function () {
			if (Modernizr.csstransitions) {
				var min = 65;
				var max = 130;
				var els = this.$('.key-button');

				_.each(els, function (el) {
					var height = Math.floor(Math.random() * (max - min + 1)) + min;
					$(el).height(height);
				});
			}
		}

	});

	return AudioView;
});
