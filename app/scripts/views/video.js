define(['backbone', 'text!templates/video.html', 'modal'], function (Backbone, videoTemplate) {
	'use strict';

	var VideoView = Backbone.View.extend({

		initialize: function () {
			this.template = _.template(videoTemplate);
			this.render();
		},

		render: function () {
			this.resizeModal();

			this.$el.html(this.template(this.model.attributes));

			// Stop the Soundtrack
			// (Try keeping audio going during video)
			// (remember to take out the function in that case)
			// App.audioView.specialStop();

			this.$el.modal({
				/* index to normal to keep keys on top
				zIndex: 2, */
				closeText: 'x'
			});

			App.bindClose();
		},

		resizeModal: function () {
			var dWidth = $(document).width();
			var mWidth = dWidth / 2;
			var aspect = 0.5625;

			this.$el.width(mWidth).height(mWidth * aspect);
		}

	});

	return VideoView;

});
