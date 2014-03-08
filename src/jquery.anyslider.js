/*! jQuery AnySlider 1.7.1 | Copyright 2014 Jonathan Wilsson and contributors */

;(function ($) {
	'use strict';

	var Anyslider = function (slider, options) {
		var slides = slider.children(),
			orgNumSlides = slides.length,
			numSlides = orgNumSlides,
			width = slider.width(),
			next = 0,
			current = 0,
			inner,
			timer,
			running = false,
			defaults = {
				afterChange: $.noop,
				afterSetup: $.noop,
				animation: 'slide',
				beforeChange: $.noop,
				bullets: true,
				delay: 300,
				easing: 'swing',
				interval: 5000,
				keyboardNav: true,
				nextLabel: 'Next slide',
				pauseOnHover: true,
				prevLabel: 'Previous slide',
				responsive: true,
				rtl: false,
				showControls: true,
				speed: 400,
				startSlide: 1,
				touch: true
			};

		// Animation complete callback
		function animationCallback() {
			current = next;

			if (next === 0) {
				current = orgNumSlides;

				if (options.animation !== 'fade') {
					inner.css('left', -current * width);
				}
			} else if (next === numSlides - 1) {
				current = 1;

				if (options.animation !== 'fade') {
					inner.css('left', -width);
				}
			}

			if (options.bullets) {
				slider.next('.as-nav').find('a').removeClass('as-active').eq(current - 1).addClass('as-active');
			}

			running = false;

			options.afterChange.call(slider[0]);
		}

		// The main animation function
		function run() {
			if (running || orgNumSlides <= 1) {
				return;
			}

			running = true;

			options.beforeChange.call(slider[0]);

			if (options.animation === 'fade') {
				slides.fadeOut().eq(next).delay(options.delay).fadeIn(options.speed, animationCallback);
			} else {
				inner.animate({'left': -next * width}, options.speed, options.easing, animationCallback);
			}

			tick();
		}

		// Set the autoplay timer
		function tick() {
			clearTimeout(timer);

			// Check if autoplay is enabled
			if (options.interval && orgNumSlides > 1) {
				timer = setTimeout(function () {
					next = current + 1;
					if (options.rtl) {
						next = current - 1;
					}

					run();
				}, options.interval);
			}
		}

		options = $.extend(defaults, options);

		// Setup the slides
		if (orgNumSlides > 1) {
			slides.eq(0).clone().addClass('clone').appendTo(slider);
			slides.eq(numSlides - 1).clone().addClass('clone').prependTo(slider);

			if (options.startSlide < orgNumSlides) {
				current = options.startSlide;
			}
		}

		slides = slider.children();
		numSlides = slides.length;

		// CSS setup
		slides.wrapAll('<div class="as-slide-inner" />').css('width', width);
		inner = slider.css('overflow', 'hidden').find('.as-slide-inner');

		if (options.animation === 'fade') {
			// Properties are quoted for consistency since "float" will trigger an error when the script is minified (if unquoted)
			slides.css({
				'display': 'none',
				'left': 0,
				'position': 'absolute',
				'top': 0
			}).eq(current).show();

			inner.css('width', width);
		} else {
			slides.css({
				'float': 'left',
				'position': 'relative'
			});

			inner.css({
				'left': -current * width,
				'width': numSlides * width
			});
		}

		inner.css({
			'float': 'left',
			'position': 'relative'
		});

		// Add the arrows
		if (options.showControls && orgNumSlides > 1) {
			slider.prepend('<a href="#" class="as-prev-arrow" title="LABEL">LABEL</a>'.replace(/LABEL/g, options.prevLabel));
			slider.append('<a href="#" class="as-next-arrow" title="LABEL">LABEL</a>'.replace(/LABEL/g, options.nextLabel));

			slider.delegate('.as-prev-arrow, .as-next-arrow', 'click', function (e) {
				e.preventDefault();

				if (running) {
					return;
				}

				next = current + 1;
				if ($(this).hasClass('as-prev-arrow')) {
					next = current - 1;
				}

				run();
			});
		}

		// Add navigation bullets
		if (options.bullets && orgNumSlides > 1) {
			var i,
				active,
				out = '<div class="as-nav" />',
				nav = $(out);

			for (i = 1; i <= orgNumSlides; i++) {
				active = '';
				if (i === current) {
					active = ' class="as-active"';
				}

				nav.append('<a href="#"' + active + '>' + i + '</a>');
			}

			nav.delegate('a', 'click.as', function (e) {
				e.preventDefault();

				if ($(this).hasClass('as-active') || running) {
					return;
				}

				next = nav.find('a').removeClass('as-active').filter(this).addClass('as-active').index() + 1;

				run();
			});

			slider.after(nav);
		}

		// Enable keyboard navigation
		if (options.keyboardNav) {
			$(document).bind('keydown.as', function (e) {
				var key = e.keyCode;

				// See if the left or right arrow is pressed
				if (key !== 37 && key !== 39 || orgNumSlides <= 1) {
					return;
				}

				next = current + 1;
				if (key === 37) {
					next = current - 1;
				}

				run();
			});
		}

		// Enable autoplay
		tick();

		if (options.pauseOnHover) {
			slider.hover(function () {
				clearTimeout(timer);
			}, function () {
				tick();
			});
		}

		// Enable responsive support
		if (options.responsive) {
			$(window).resize(function () {
				if (!running) {
					width = slider.width();

					inner.css('width', width);
					slides.css('width', width);

					if (options.animation !== 'fade') {
						inner.css({
							'left': -current * width,
							'width': numSlides * width
						});
					}
				}
			});
		}

		/* Enable swipe support
		 * Resources:
		 * http://wowmotty.blogspot.com/2011/10/adding-swipe-support.html
		 * http://blogs.windows.com/windows_phone/b/wpdev/archive/2012/11/15/adapting-your-webkit-optimized-site-for-internet-explorer-10.aspx#step4
		 * https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
		 */
		if (options.touch && ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints > 0)) {
			var startTime,
				startX;

			slider.bind('touchstart.as pointerdown.as MSPointerDown.as', function (e) {
				var originalEvent = e.originalEvent;

				startTime = e.timeStamp;
				startX = originalEvent.pageX || originalEvent.touches[0].pageX;
			}).bind('touchmove.as pointermove.as MSPointerMove.as', function (e) {
				var originalEvent = e.originalEvent,
					currentX = originalEvent.pageX || originalEvent.touches[0].pageX,
					currentDistance = 0,
					currentTime = e.timeStamp;

				if (startX !== 0) {
					currentDistance = Math.abs(currentX - startX);
				}

				// Only allow if movement < 1 sec and if distance is long enough
				if (startTime !== 0 && currentTime - startTime < 1000 && currentDistance > 10) {
					e.preventDefault();

					if (currentX < startX) { // Swiping to the left, i.e. previous slide
						next = current + 1;
					} else if (currentX > startX) { // Swiping to the right, i.e. next slide
						next = current - 1;
					}

					startTime = 0;
					startX = 0;

					run();

					// Android doesn't always fire touchend
					slider.trigger('touchend.as');
				}
			}).bind('touchend.as pointerup.as MSPointerUp.as', function () {
				startTime = 0;
				startX = 0;
			});
		}

		options.afterSetup.call(slider[0]);
	};

	$.fn.AnySlider = function (options) {
		return this.each(function () {
			var slider = $(this),
				anyslider;

			// Bail if we already have a plugin instance for this element
			if (slider.data('anyslider')) {
				return slider.data('anyslider');
			}

			anyslider = new Anyslider(slider, options);

			slider.data('anyslider', anyslider);
		});
	};
}(jQuery));
