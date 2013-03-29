define(['backbone', 'text!templates/nodes.html'], function (Backbone, nodesTemp) {

	var NodesView = Backbone.View.extend({

		events: {
			"click .thread-link": "goToThread"
		},

		initialize: function () {
			this.template = _.template(nodesTemp);
			_.each(this.collection.models, this.render, this);
		},

		render: function (model) {
			this.$el.prepend(this.template(model.attributes));
		},

		goToThread: function (event) {
			event.preventDefault();
			App.router.navigate(event.target.hash, {trigger: true})
		}
	});

	return NodesView; 
});
