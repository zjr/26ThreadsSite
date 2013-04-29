define(['backbone', 'views/cDwn', 'text!templates/thread.html'], function (Backbone, CDwnView, threadTemplate) {
	'use strict';

	var ThreadView = Backbone.View.extend({

		events: {
			'click .info-link': 'showInfo'/*,
			'click .button-play': 'showVideo',
			'click #hiddenYT': 'showVideo'*/
		},

		initialize: function() {
			this.template = _.template(threadTemplate);

			var that = this;

			// Scroll when initialiazed
			App.threadScroller = true;

			App.router.on('route:showThread', function (id) {
				that.decider(id);
			});
		},

		decider: function (id) {
			this.model = this.collection.get(id);
			if (App.threadScroller === true) {
				this.render(id).update(id).scrollThere();
			} else {
				this.render(id).update(id);
			}
		},

		render: function (id) {
			var threadCount  = 26;
			var portion      = 1 / threadCount;
			var threadInvert = 26 + 1 - id;

			clearTimeout(this.flickerTime);
			this.flicker();

			this.model.attributes.threadPosition = portion * threadInvert;
			this.$el.html(this.template(this.model.attributes));

			var release = this.model.attributes.video.release;
			if (release) {
				this.timer = new CDwnView({
					id: id,
					el: this.$('#timer'),
					rawDate: release,
					vimeoId: this.model.attributes.video.vimeoId
				});
			}

			return this;
		},

		flicker: function () {
			if (this.$el.parent().hasClass('on')) {
				this.$el.parent().removeClass('on');
				this.flickerTime = setTimeout(_.bind(this.flicker, this), 300);
			} else {
				this.flickerTime = setTimeout(_.bind(function () {
					this.$el.parent().addClass('on');
				}, this), 300);
			}
		},

		update: function (id) {
			App.view.currentId = Number(id);
			App.threadScroller = true;
			return this;
		},

		scrollThere: function () {
			var position = this.$('.thread').attr('data-position');
			var offset   = ($(document).height() * position);
			window.scrollTo(0, offset);
			return this;
		},

		showInfo: function (arg) {
			if (typeof(arg) !== 'string') {
				arg = $(arg.currentTarget).attr('data-id');
			}
			if (!this.infoOn) {
				this.infoOn = true;
				this.$('.thread').addClass('infoOn');
				this.$('.info').addClass('active');
				this.$('.info-link').addClass('active');
				App.router.navigate('thread/'+arg+'/info');
			} else {
				this.infoOn = false;
				this.$('.thread').removeClass('infoOn');
				this.$('.info').removeClass('active');
				this.$('.info-link').removeClass('active');
				App.router.navigate('thread/'+arg, {});
			}
		},

		// showVideo: function () {
		// 	App.router.navigate('video');
		// }

	});

	return ThreadView;
});
