define(['backbone', 'views/video', 'views/xmodal'], function (Backbone, VideoView, XModalView) {
    'use strict';

	var AppRouter = Backbone.Router.extend({

		routes: {
			'thread/:id':       'showThread',  // #thread/11
			'thread/:id/video': 'showVideo',   // #thread/11/video
			'thread/:id/info':  'showThread',  // #thread/11/info
			'more-info':        'moreInfo'     // #more-info
		},

		showVideo: function (id) {
			App.videoView = new VideoView({
				el: $('#vModal'),
				model: App.threadCol.get(id)
			});
		},

		moreInfo: function () {
			App.xModalView = new XModalView({
				el: $('#xModal')
			});
		}

	});

	return AppRouter;
});
