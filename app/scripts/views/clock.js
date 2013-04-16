define(['backbone', 'text!templates/clock.html'], function(Backbone, clock) {
	'use strict';

	var ClockView = Backbone.View.extend({

		initialize: function () {
			this.template = _.template(clock);
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
		}

	});

	return ClockView;

});
