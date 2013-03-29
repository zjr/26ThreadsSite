define(['backbone', 'text!templates/thread.html'], function (Backbone, threadTemplate) {

	var ThreadView = Backbone.View.extend({

		initialize: function() {
			var that = this;
			App.router.on("route:showThread", function (id) {
				that.model = that.collection.get(id);
				that.render();
			});
			template = _.template(threadTemplate);
		},


		render: function () {
			this.$el.html(template(this.model.attributes))
			return this;
		}

	});

	return ThreadView;
});
