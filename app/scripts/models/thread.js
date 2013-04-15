define(['backbone'], function (Backbone) {
	'use strict';

	var Thread = Backbone.Model.extend({
		defaults: {
			'title': null,
			'subTitle': null,
			'description': null,
			'video': {
				'url': null,
				'vimeoId': null,
				'locked': false,
				'release': null
			}
		}
	});

	return Thread;
});
