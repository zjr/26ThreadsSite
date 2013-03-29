define(['backbone', 'text!templates/thread.html'], function (Backbone, threadTemplate) {

	var ThreadView = Backbone.View.extend({

		initialize: function() {
			// this.listenTo(this.model, "change", this.render)

			template = _.template(threadTemplate);

			this.model = this.collection.get(1)

			this.render();
		},

		render: function () {
			this.$el.html(template(this.model.attributes))
			return this;
		}

	});

	return ThreadView;
});
