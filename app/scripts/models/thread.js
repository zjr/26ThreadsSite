define(['backbone'], function (Backbone) {
	'use strict';

	var Thread = Backbone.Model.extend({
		url: '/thread'
	});

	return Thread;
});
