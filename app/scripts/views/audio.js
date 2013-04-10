/* globals SeamlessLoop:false */
define(['backbone', 'text!audio/BangaloreURI', 'text!audio/HypercarnalURI', 'text!audio/PhysicURI', 'text!templates/audio.html', 'audio/seamless'], function (Backbone, Bangalore, Hypercarnal, Physic, audioTemplate) {
	'use strict';

	var AudioView = Backbone.View.extend({

		events: {
			'click button': 'leSwitch'
		},

		initialize: function () {
			this.loaded = false;

			// Whole lot of stuff that should be split into collections and models.
			this.uri = [Bangalore, Hypercarnal, Physic];
			this.sec = 10 * 1000;
			this.loop = new SeamlessLoop();
			this.loop.addUri(this.uri[0], this.sec, 1);
			this.loop.addUri(this.uri[1], this.sec, 2);
			this.loop.addUri(this.uri[2], this.sec, 3);
			this.loop.callback(this.soundsLoaded);

			this.template = _.template(audioTemplate);
			this.tracks = [
				{id: 1, title: 'Bangalore Rose'},
				{id: 2, title: 'Hypercarnal Ascension'},
				{id: 3, title: 'Physic'}
			];
			_.each(this.tracks, this.render, this);

			// Add active class to auto played track.
			this.$('.key-button[data-id="1"]').addClass('active');
		},

		soundsLoaded: function () {
			// Sad messed up context :-(
			App.audioView.loaded = true;
			//App.audioView.loop.start(1);
			//App.audioView.currentTrack = 1;
			//App.audioView.audioOn = true;
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
		}
	});

	return AudioView;
});
