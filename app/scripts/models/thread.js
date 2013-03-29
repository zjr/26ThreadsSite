define(['backbone'], function (Backbone) {

	var Thread = Backbone.Model.extend({
		defaults: {
			"title": null,
			"subTitle": null,
			"description": null,
			"video": {
				"url": null,
				"locked": false,
				"release": null
			}
		}
	});

	return Thread;
});
