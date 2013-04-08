define(['backbone', 'views/video'], function (Backbone, VideoView) {
    'use strict';

	var AppRouter = Backbone.Router.extend({

		routes: {
			'thread/:id':       'showThread',  // #thread/11
			'thread/:id/video': 'showVideo',   // #thread/11/video
			'thread/:id/info':  'showThread'   // #thread/11/info
		},

		showVideo: function (id) {
			App.videoView = new VideoView({
				el: $('#vModal'),
				model: App.threadCol.get(id)
			});
		}

	});

	return AppRouter;
});
