define(['backbone', 'progImgSeq'], function (Backbone) {
	'use strict';

	var AppView = Backbone.View.extend({
		initialize: function () {
			// store elements; $el = #video-container
			this.$doc  = $(document);
			this.$win  = $(window);
			this.video = this.$el.children()[0];

			this.currentSrc = null;
			this.currentIndex = null;

			// set up vars for dimension calculations
			this.winWidth = null;
			this.winHeight = null;
			this.fullHeight = null;
			this.scrollHeight = null;

			// predefine proportions
			this.vidImgWidth = 1280;
			this.vidImgHeight = 720;

			// scroll position init
			this.currentPosition = 1.5;

			// current thread init
			this.currentId = null;

			this.calculateDimensions();

			// bind window resize event to this.handleResize
			$(window).on('resize.app', _.bind(this.handleResize, this));

			// bind window scroll event to this.handleScroll
			$(window).on('scroll.app', _.bind(this.handleScroll, this));

			//call this.handleResize to set it off...
			this.handleResize();
		},
		handleResize: function () {
			this.calculateDimensions();
			this.resizeBackgroundImage();
			this.handleScroll();
		},
		calculateDimensions: function() {
			this.winWidth = this.$win.width();
			this.winHeight = this.$win.height();
			this.fullHeight = $('#main').height();
			this.scrollHeight = this.fullHeight - this.winHeight;
		},
		resizeBackgroundImage: function () {
			var scale = Math.max( this.winHeight/this.vidImgHeight, this.winWidth/this.vidImgWidth );

			var width  = scale * this.vidImgWidth;
			var height = scale * this.vidImgHeight;

			var left = (this.winWidth - width)/2;
			var top  = (this.winHeight - height)/2;

			this.$el
				.width(width).height(height)
				.css('position', 'fixed')
				.css('left', left+'px')
				.css('top', top+'px');
		},
		handleScroll: function () {
			this.targetPosition = this.$win.scrollTop() / this.scrollHeight;
			var position = ((this.targetPosition) * 26).toInt();
			var nPosition = position === 0 ? 1 : position;
			var id = 27 - nPosition;
			if (id !== this.currentId && App.hScroll) {
				App.threadScroller = false;
				App.router.navigate('#thread/' + id, {trigger: true});
			}
		},
		render: function (position) {
			this.renderVideo(position);
		},
		renderVideo: function () {
			var index = Math.round(this.currentPosition * (this.imgSeqLoader.length - 1));

			var img = this.imgSeqLoader.getNearest(index);
			var src;

			var nearestIndex = this.imgSeqLoader.nearestIndex;
			if (nearestIndex < 0) { nearestIndex = 0; }

			if(!!img) {
				src = img.src;
				if (src !== this.currentSrc) {
					this.video.src = src;
					this.currentSrc = src;
				}
			}
		}
	});

	return AppView;
});
