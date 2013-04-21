define(['backbone'], function (Backbone) {
	'use strict';

	var Thread = Backbone.Model.extend({
		defaults: {
			'title': null,
			'subTitle': null,
			'description': null,
			'exLink': null,
			'exLinkDesc': null,
			'video': {
				'url': null,
				'vimeoId': null,
				'release': null
			}
		}
	});

	return Thread;
});
