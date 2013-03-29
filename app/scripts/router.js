define(['backbone'], function (Backbone) {

	var AppRouter = Backbone.Router.extend({

		routes: {
			"info":            "showInfo",    // #info
			"thread/:id":      "showThread",  // #thread/11
			"thread/:id/play": "showVideo"    // #thread/11/play
		},

		showThread: function (id) {
			//
		}

	});

	return AppRouter; 
});
