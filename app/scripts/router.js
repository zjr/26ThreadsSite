define(['backbone'], function (Backbone) {

	var AppRouter = Backbone.Router.extend({

		routes: {
			"thread/:id":      "showThread",  // #thread/11
			"thread/:id/play": "showThread",  // #thread/11/play
			"thread/:id/info": "showThread"   // #thread/11/info
		},

		showThread: function (id) {
			//
		}

	});

	return AppRouter; 
});
