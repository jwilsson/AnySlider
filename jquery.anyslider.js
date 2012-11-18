/*! jQuery AnySlider 1.5.0 | Copyright 2012 Jonathan Wilsson */

/* global clearTimeout, document, jQuery, setTimeout, window */
(function ($) {
	'use strict';

	var Anyslider = function (slider, options) {
		var slides = slider.children(),
			orgNumSlides = slides.length,
			numSlides = orgNumSlides,
			width = slider.width(),
			next = 0,
			current = 1,
			inner,
			arrows,
			timer,
			running = false,
			i,
			active,
			out = '<div class="as-nav">',
			nav = $(out),
			startTime,
			startX,
			defaults = {
				afterChange: function () {},
				afterSetup: function () {},
				animation: 'slide',
				beforeChange: function () {},
				bullets: true,
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

				if (defaults.animation !== 'fade') {
					inner.css('left', -current * width);
				}
			} else if (next === numSlides - 1) {
				current = 1;

				if (defaults.animation !== 'fade') {
					inner.css('left', -width);
				}
			}

			if (defaults.bullets) {
				slider.find('.as-nav a').removeClass('as-active').filter('[data-num=' + current + ']').addClass('as-active');
			}

			running = false;

			defaults.afterChange.call(slider);
		}

		// The main animation function
		function run() {
			if (running) {
				return;
			}

			running = true;

			defaults.beforeChange.call(slider);

			if (defaults.animation === 'fade') {
				slides.fadeOut().eq(next).delay(300).fadeIn(defaults.speed, animationCallback);
			} else {
				inner.animate({'left': -next * width}, defaults.speed, defaults.easing, animationCallback);
			}
		}

		// Set the autoplay timer
		function tick() {
			timer = setTimeout(function () {
				next = current + 1;
				if (defaults.rtl) {
					next = current - 1;
				}

				run();

				tick();
			}, defaults.interval);
		}

		// If the user has supplied options let's merge them with the defaults
		if (options) {
			$.extend(defaults, options);
		}

		// Setup the slides
		slides.eq(0).clone().addClass('clone').appendTo(slider);
		slides.eq(numSlides - 1).clone().addClass('clone').prependTo(slider);

		slides = slider.children();
		numSlides = slides.length;

		// Set the starting slide
		if (defaults.startSlide < orgNumSlides) {
			current = defaults.startSlide;
		}

		// CSS setup
		slides.wrapAll('<div class="as-slide-inner"></div>').css('width', width);
		inner = slider.css('overflow', 'hidden').find('.as-slide-inner');

		if (defaults.animation === 'fade') {
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
		if (defaults.showControls) {
			slider.prepend('<a href="#" class="as-prev-arrow" title="' + defaults.prevLabel + '">' + defaults.prevLabel + '</a>')
				.append('<a href="#" class="as-next-arrow" title="' + defaults.nextLabel + '">' + defaults.nextLabel + '</a>');

			arrows = slider.find('.as-prev-arrow, .as-next-arrow').wrapAll('<div class="as-arrows"></div>');

			// Add event listener for click on previous and next buttons
			slider.delegate(arrows.selector, 'click', function (e) {
				e.preventDefault();

				if (running) {
					return false;
				}

				next = current + 1;
				if (e.target.className === 'as-prev-arrow') {
					next = current - 1;
				}

				run();
			});
		}

		// Add navigation bullets
		if (defaults.bullets) {
			slider.after(nav);

			for (i = 1; i <= orgNumSlides; i++) {
				active = '';
				if (i === current) {
					active = 'class="as-active"';
				}

				nav.append('<a href="#"' + active + 'data-num="' + i + '">' + i + '</a>');
			}

			nav.delegate('a', 'click', function (e) {
				e.preventDefault();

				if ($(this).hasClass('as-active') || running) {
					return false;
				}

				next = nav.find('a').removeClass('as-active').filter(this).addClass('as-active').data('num');

				run();
			});
		}

		// Enable keyboard navigation
		if (defaults.keyboardNav) {
			$(document).keydown(function (e) {
				var key = e.keyCode;

				if (key !== 37 || key !== 39) {
					return;
				}

				// See if the left or right arrow is pressed
				next = current + 1;
				if (key === 37) {
					next = current - 1;
				}

				run();
			});
		}

		// See if the user wants autoplay enabled
		if (defaults.interval && orgNumSlides > 1) {
			tick();

			// See if the user whishes to pause the autoplay on hover
			if (defaults.pauseOnHover) {
				slider.hover(function () {
					clearTimeout(timer);
				}, function () {
					tick();
				});
			}
		}

		// Enable responsive support
		if (defaults.responsive) {
			$(window).resize(function () {
				width = slider.width();

				inner.css('width', width);
				slides.css('width', width);

				if (defaults.animation !== 'fade') {
					inner.css({
						'left': -current * width,
						'width': numSlides * width
					});
				}
			});
		}

		// Enable swipe support if requested
		// Credits to http://wowmotty.blogspot.com/2011/10/adding-swipe-support.html
		if (defaults.touch && 'ontouchstart' in document.documentElement) {
			slider.bind('touchstart', function (e) {
				e.preventDefault();

				startTime = e.timeStamp;
				startX = e.originalEvent.touches[0].pageX;
			}).bind('touchmove', function (e) {
				var currentX = e.originalEvent.touches[0].pageX,
					currentDistance = 0,
					currentTime = e.timeStamp;

				e.preventDefault();

				if (startX !== 0) {
					currentDistance = Math.abs(currentX - startX);
				}

				// Only allow if movement < 1 sec and if distance is long enough
				if (startTime !== 0 && currentTime - startTime < 1000 && currentDistance > 50) {
					if (currentX < startX) { // Swiping to the left, i.e. previous slide
						next = current + 1;
					} else if (currentX > startX) { // Swiping to the right, i.e. next slide
						next = current - 1;
					}

					startTime = startX = 0;

					run();
				}
			}).bind('touchend', function () {
				startTime = startX = 0;
			});
		}

		// Fire the afterSetup callback
		defaults.afterSetup.call(slider);
	};

	$.fn.AnySlider = function (options) {
		return this.each(function () {
			var slider = $(this),
				anyslider;

			// Bail if we already have a plugin instance for this element
			if (slider.data('anyslider')) {
				return slider.data('anyslider');
			}

			// Create a new Anyslider object
			anyslider = new Anyslider(slider, options);

			// Store the AnySlider object
			slider.data('anyslider', anyslider);
		});
	};
}(jQuery));