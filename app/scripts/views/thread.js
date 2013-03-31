define(['backbone', 'text!templates/thread.html'], function (Backbone, threadTemplate) {

	var ThreadView = Backbone.View.extend({

		initialize: function() {
			var that = this;
			App.router.on("route:showThread", function (id) {
				that.model = that.collection.get(id);
				that.render().scroll().update(id);
			});
			this.template = _.template(threadTemplate);
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes))
			return this;
		},

		scroll: function () {
			var position = this.$('.thread').attr('data-position');
			var offset   = (document.height * position);
			window.scrollTo(0, offset);
			return this;
		},

		update: function (id) {
			App.view.currentId = Number(id);
		}

	});

	return ThreadView;
});
