define(['backbone', 'text!templates/thread.html'], function (Backbone, threadTemplate) {

	var ThreadView = Backbone.View.extend({

		events: {
			"click #info": "showInfo"
		},

		initialize: function() {
			this.template = _.template(threadTemplate);

			App.threadScroller = true;

			var that = this;
			App.router.on("route:showThread", function (id) {
				that.model = that.collection.get(id);
				if (App.threadScroller === true) {
					that.render(id).update(id).scrollThere();
				} else {
					that.render(id).update(id);
				}
			});
		},

		render: function (id) {
			var threadCount  = 26;
			var portion      = 1 / threadCount;
			var threadInvert = 26 + 1 - id
			this.model.attributes.threadPosition = portion * threadInvert
			this.$el.html(this.template(this.model.attributes))
			return this;
		},

		update: function (id) {
			App.view.currentId = Number(id);
			App.threadScroller = true;
			return this;
		},

		scrollThere: function () {
			var position = this.$('.thread').attr('data-position');
			var offset   = (document.height * position);
			window.scrollTo(0, offset);
			return this;
		},

		showInfo: function () {
			
		}

	});

	return ThreadView;
});
