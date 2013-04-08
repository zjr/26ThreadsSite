define(['backbone', 'text!templates/video.html', 'modal'], function (Backbone, videoTemplate) {
	'use strict';

	var VideoView = Backbone.View.extend({

		events: {
			'click .close': 'close'
		},

		initialize: function () {
			this.template = _.template(videoTemplate);
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			this.$el.modal();
		},

		close: function () {
			$.modal.close();
			App.router.navigate('../', {replace: true});
		}

	});

	return VideoView;

});
