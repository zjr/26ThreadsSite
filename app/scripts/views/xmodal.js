define(['backbone', 'text!templates/xmodal.html', 'modal'], function (Backbone, xModalTemplate) {
	'use strict';

	var XModalView = Backbone.View.extend({

		initialize: function () {
			this.template = _.template(xModalTemplate);
			this.$el.html(this.template());
			this.render();
		},

		render: function () {
			this.$el.height($(window).height() * 0.8);
			this.$el.modal({
				zIndex: 2,
				closeText: 'x'
			});
			App.bindClose();
		}

	});

	return XModalView;

});
