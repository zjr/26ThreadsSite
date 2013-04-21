define(['backbone'], function(Backbone) {
	'use strict';

	var LoaderView = Backbone.View.extend({
		initialize: function () {
			this.render();
		},
		render: function () {
			
		},
		close: function () {
			this.$el.remove();
		}
	});

	return LoaderView;
});
