define(['backbone', 'models/cDwn', 'text!templates/cDwn.html'], function(Backbone, CDwnModel, cDwnTemplate) {
	'use strict';

	var CDwnView = Backbone.View.extend({

		initialize: function () {
			this.model = new CDwnModel({
				id: this.options.id,
				rawDate: this.options.rawDate
			});
			this.template = _.template(cDwnTemplate);
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
		}

	});

	return CDwnView;

});
