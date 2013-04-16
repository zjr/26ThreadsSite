define(['backbone', 'models/cDwn', 'text!templates/cDwn.html', 'views/clock'], function(Backbone, CDwnModel, cDwnTemplate, ClockView) {
	'use strict';

	var CDwnView = Backbone.View.extend({

		initialize: function () {
			this.model = new CDwnModel({
				id: this.options.id,
				rawDate: this.options.rawDate
			});
			this.template = _.template(cDwnTemplate);
			this.render();

			setInterval(_.bind(this.clockPulse, this), 1600);

			this.listenTo(this.model, 'change', this.renderTime);
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
		},

		clockPulse: function () {
			this.$('.button-timer').toggleClass('mailOn');
		},

		renderTime: function () {
			this.clock = new ClockView({
				el: this.$('.timer'),
				model: this.model
			});
		}

	});

	return CDwnView;

});
