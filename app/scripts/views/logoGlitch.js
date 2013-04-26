define(['backbone'], function(Backbone) {
	'use strict';

	var LogoGlitch = Backbone.View.extend({
		initialize: function () {
			jQuery.extend(this, {
				context: this.el.getContext('2d'),
				img: new Image(),
				w: null,
				h: null,
				offset: null,
				glitchInterval: null
			});
			this.img.src = '../../assets/images/Logo.png';
			this.img.onload = _.bind(function () {
				this.render();
				$(window).bind('resize.app', _.bind(this.render, this));
			}, this);
		},
		render: function () {
			clearInterval(this.glitchInterval);
			// this.el.width = this.w = window.innerWidth;
			this.el.width = this.w = this.img.width;
			// not sure offset necessary
			// this.offset = this.w * 0.1;
			// this.el.height = this.h = ~~(175 * ((this.w - (this.offset * 2)) / this.img.width));
			this.el.height = this.h = this.img.height;
			this.glitchInterval = setInterval(_.bind(function () {
				this.clear();
				// this.context.drawImage(this.img, 0, 110, this.img.width, 175, this.offset, 0, this.w - (this.offset * 2), this.h);
				this.context.drawImage(this.img, 0, 0);
				setTimeout(_.bind(this.glitchImg, this), this.randInt(250, 1000));
			}, this), 500);
		},
		clear: function () {
			this.context.rect(0, 0, this.w, this.h);
			this.context.clearRect(0, 0, this.w, this.h);
			// this.context.fillStyle = 'black';
			// this.context.fill();
		},
		glitchImg: function () {
			for (var i = 0; i < this.randInt(1, 13); i++) {
				var x = Math.random() * this.w;
				var y = Math.random() * this.h;
				var spliceWidth = this.w - x;
				var spliceHeight = this.randInt(5, this.h / 3);
				this.context.drawImage(this.el, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
				this.context.drawImage(this.el, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
			}
		},
		randInt: function (a, b) {
			return ~~(Math.random() * (b - a) + a);
		}
	});

	return LogoGlitch;
});
