define(['backbone'], function(Backbone) {
	'use strict';

	var CDwnModel = Backbone.Model.extend({

		defaults: {
			unLocked: false
		},

		initialize: function () {
			this.now       = Date.now();
			this.endDate   = new Date(this.get('rawDate')).getTime();
			this.remaining = ((this.endDate - this.now) / 1000);

			if (this.remaining <= 0) {
				this.set({unLocked: true});
				this.apiUnlock(this.attributes.vimeoId);
				return;
			}

			this.set({
				days:     Math.floor(this.remaining / 86400),
				hours:    24 - Math.floor((this.remaining % 86400) / 3600),
				minutes:  60 - Math.floor(((this.remaining % 86400) % 3600) / 60),
				seconds:  60 - Math.floor(((this.remaining % 86400) % 3600) % 60)
			});

			this.start();
		},

		start: function () {
			var cDown = setInterval(_.bind(function () {
				if (this.get('seconds') > 59) {

					if (60 - this.attributes.seconds === 0 &&
						  60 - this.attributes.minutes === 0 &&
						  24 - this.attributes.hours === 0   &&
						  this.attributes.days === 0 ) {
						clearInterval(cDown);
						this.set({unLocked: true});
						this.apiUnlock(this.attributes.vimeoId);
						return;
					}

					this.set({seconds: 1});

					if (this.get('minutes') > 59) {
						this.set({minutes: 1});

						if (this.get('hours') > 23) {
							this.set({hours: 1});

							if (this.get('days') > 0) {
								this.set({days: this.get('days') - 1});
							}

						} else {
							this.set({hours: (this.get('hours') + 1)});
						}

					} else {
						this.set({minutes: (this.get('minutes') + 1)});
					}

				} else {
					this.set({seconds: (this.get('seconds') + 1)});
				}
			}, this), 1000);
		},

		apiUnlock: function (vimeoId) {
			var that = this;
			$.post('php/unlock.php', {'id': vimeoId})
				.done(_.bind(function (data) {
					console.log('Success!');
					console.log('this: ' + this);
					console.log('data: ' + data);
					App.threadView.timer.render(that.attributes.id);
				}, this))
				.fail(_.bind(function (data){
					console.log('this: ' + this);
					console.log('data: ' + data);
				}, this));
		}

	});

	return CDwnModel;

});
