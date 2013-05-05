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

			this.$el.modal({
				closeText: 'x'
			});

			App.bindClose();
		},

		resizeModal: function () {
			var mWidth = App.view.winWidth / 2;
			var aspect = 0.5625;

			this.$el.width(mWidth).height(mWidth * aspect);
		}

	});

	return VideoView;

});
