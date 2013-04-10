define(['backbone', 'text!templates/video.html', 'modal'], function (Backbone, videoTemplate) {
	'use strict';

	var VideoView = Backbone.View.extend({

		initialize: function () {
			this.template = _.template(videoTemplate);
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			this.$el.modal();
		},

		close: function () {
			App.router.navigate(
				'thread/'+App.view.currentId,
				{replace: true}
			);
			App.videoView.$('iframe').remove();

			// Restart the soundtrack
			if (App.audioView.audioOn) {
				App.audioView.loop.start(App.audioView.currentTrack);
			}
		}

	});

	return VideoView;

});
