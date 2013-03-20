define(['backbone'], function (Backbone) {

	var AppView = Backbone.View.extend({
		initialize: function () {
			// store elements; $el = #video-container
			this.$doc  = $(document);
			this.$win  = $(window);
			this.video = this.$el.children('video')[0]

			// set up vars for dimension calculations
			this.winWidth = null;
			this.winHeight = null;
			this.fullHeight = null;
			this.scrollHeight = null;

			// predefine proportions
			this.vidImgWidth = 1280;
			this.vidImgHeight = 720;

			// scroll position init
			this.currentPosition = 0;

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
			this.currentPosition = this.$win.scrollTop() / this.scrollHeight;
			this.render(this.currentPosition);
		},
		render: function (position) {
			if (this.video.duration) {
				this.video.currentTime = position * this.video.duration;
			}
		}
	});

	return AppView; 
});
