define(['backbone', 'text!templates/xmodal.html', 'modal'], function (Backbone, xModalTemplate) {
	'use strict';

	var XModalView = Backbone.View.extend({

		initialize: function () {
			this.template = _.template(xModalTemplate);
			this.render();
		},

		render: function () {

			this.$el.html(this.template());

			this.$el.modal({
				zIndex: 2,
				closeText: 'x'
			});
		}

	});

	return XModalView;

});
