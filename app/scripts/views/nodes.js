define(['raphael', 'backbone', 'text!templates/nodes.html'], function (Raphael, Backbone, nodesTemp) {
	'use strict';

	var NodesView = Backbone.View.extend({

		events: {
			'click .node-link': 'goToThread'
		},

		initialize: function () {
			var that = this;
			this.template = _.template(nodesTemp);
			_.each(this.collection.models, this.render, this);

			App.router.on('route:showThread', function (id) {
				var aNode = that.$('#node-'+id);
				that.$('.node-link').not(aNode).removeClass('active');
				aNode.addClass('active');
			});
		},

		render: function (model) {
			this.$el.prepend(this.template(model.attributes));
		},

		goToThread: function (event) {
			event.preventDefault();
			App.router.navigate(event.target.hash, {trigger: true});
		}
	});

	return NodesView;
});
