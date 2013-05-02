define(['backbone', 'raphael'], function(Backbone, Raphael) {
	'use strict';

	var RNodesView = Backbone.View.extend({
		initialize: function () {
			this.collection  = App.threadCol;
			this.boxes       = [];
			this.connections = [];
			var threads      = 26;

			for (var i = 1; i < (threads + 1); i++) {
				this.boxes.push({
					x: 100,
					y: ((600 / 26) * i),
					title: i + ' \u2013 ' + this.collection.get(i).attributes.title.toTitle()
				});
			}

			for (var n = 1; n < (threads); n++) {
				this.connections.push({
					from: this.boxes[n-1],
					to:   this.boxes[n]
				});
			}

			this.render();
		},
		render: function () {
			this.paper = new Raphael(this.el, 200, 768);
			var w = 3;

			var redraw = _.bind(function () {
				this.connections.forEach(_.bind(function (connection) {
					if (typeof connection.view !== 'undefined') {
						connection.view.remove();
					}
					connection.view = this.paper.path(
						'M'+connection.from.x+','+connection.from.y+' '+
						'L'+connection.to.x+','+connection.to.y
					);
					connection.view.toBack();
					// connection.view.attr('stroke', 'white')
				}, this));

				this.boxes.forEach(_.bind(function (box) {
					if (typeof box.view === 'undefined') {
						box.view = {
							circ: this.paper.circle(this.x,this.y,w)
						};
						box.view.circ.attr({fill:'white'});
						box.view.circ.hover(function () {
							window.cancelAnimationFrame(App.slideAnim);
						}, function () {
							App.slideAnim = window.requestAnimationFrame(_.bind(slide, this));
						});
						box.view.circ.click(function () {
							console.log(this);
						});
					}
					var tbox = 't' + box.x + ',' + box.y;
					box.view.circ.transform(tbox);
				}, this));

			}, this);

			this.anim = [];
			for (var i = 0; i < 25; i++) {
				var sin = [];
				var mtp = [];
				sin[0]  = ((this.randInt(1, 100) % 2) === 0) ? true : false;
				sin[1]  = ((this.randInt(1, 100) % 2) === 0) ? true : false;
				mtp[0]  = this.randInt(1, 5);
				mtp[1]  = this.randInt(1, 5);
				var orX = this.boxes[i].x;
				var orY = this.boxes[i].y;
				this.anim.push({
					sin: sin,
					mtp: mtp,
					orX: orX,
					orY: orY
				});
			}

			var a = 0;
			var slide = _.bind(function () {
				a = (a > 0.9) ? 0 : a;
				a += 0.1;
				for (var i = 0; i < 25; i++) {
					if (this.anim[i].sin[0]) {
						this.boxes[i].x = this.anim[i].orX + Math.sin(a) * this.anim[i].mtp[0];
					} else {
						this.boxes[i].x = this.anim[i].orX + Math.cos(a) * this.anim[i].mtp[0];
					}
					if (this.anim[i].sin[1]) {
						this.boxes[i].y = this.anim[i].orY + Math.sin(a) * this.anim[i].mtp[1];
					} else {
						this.boxes[i].y = this.anim[i].orY + Math.cos(a) * this.anim[i].mtp[1];
					}
				}
				redraw();
				App.slideAnim = window.requestAnimationFrame(_.bind(slide, this));
			}, this);
			slide();

		},

		randInt: function (a, b) {
			return ~~(Math.random() * (b - a) + a);
		}

	});

	return RNodesView;
});
