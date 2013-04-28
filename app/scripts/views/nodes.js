define([/*'raphael', */'backbone', 'text!templates/nodes.html'], function (/*Raphael, */Backbone, nodesTemp) {
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

			this.boxes = [];
			this.connections = [];

			for (var i = 0; i < 26; i++) {
				this.boxes.push({
					x: 100,
					y: ((600 / 26) * (i + 1)),
					title: i.toString()
				});
				if (i < 25) {
					this.connections.push({
						from: this.boxes[i],
						to: this.boxes[i+1]
					});
				}
			}
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
