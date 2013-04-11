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
			var $elm = $('#xModal')
			if (!App.xModalView) {
				App.xModalView = new XModalView({
					el: $elm
				});
			} else {
				App.xModalView.render();
			}
		}

	});

	return AppRouter;
});
