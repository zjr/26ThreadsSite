define(['backbone', '../models/thread'], function (Backbone, Thread) {
	'use strict';

	var Threads = Backbone.Collection.extend({
		model: Thread,
		url: '/threads.json'
	});

	return Threads;
});
