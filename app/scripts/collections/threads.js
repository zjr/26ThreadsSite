define(['backbone', '../models/thread'], function (Backbone, Thread) {
	'use strict';

	var Threads = Backbone.Collection.extend({
		model: Thread,
		url: 'data/threads.json'
	});

	return Threads;
});
