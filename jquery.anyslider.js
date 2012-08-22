// jQuery AnySlider 1.4.3 | Copyright 2012 Jonathan Wilsson
(function ($) {
	var Anyslider = function (elem, options) {
		var $slider = $(elem),
			$slides = $slider.children(),
			orgNumSlides = $slides.length,
			numSlides = $slides.length,
			width = $slider.width(),
			next = 0,
			current = 1,
			$inner,
			$arrows,
			timer,
			defaults = {
				afterChange: function () {},
				afterSetup: function () {},
				animation: "slide",
				beforeChange: function () {},
				bullets: true,
				easing: "swing",
				interval: 5000,
				keyboardNav: true,
				nextLabel: "Next slide",
				pauseOnHover: true,
				prevLabel: "Previous slide",
				rtl: false,
				showControls: true,
				showOnHover: false,
				speed: 400,
				startSlide: 1,
				touch: true
			};

		// The main animation function
		function run() {
			if ($slides.is(":animated")) {
				return;
			}

			defaults.beforeChange.call($slider);

			if (defaults.animation === "fade") {
				$slides.fadeOut().eq(next).delay(300).fadeIn(defaults.speed, function () {
					current = next;

					if (next === 0) {
						current = orgNumSlides;
					} else if (next === numSlides - 1) {
						current = 1;
					}

					if (defaults.bullets) { // @todo Temporary fix until 1.5
						$slider.find(".as-nav a").removeClass("as-active").filter("[data-num=" + current + "]").addClass("as-active");
					}

					defaults.afterChange.call($slider);
				});
			} else {
				$inner.animate({"left": -next * width}, defaults.speed, defaults.easing, function () {
					current = next;

					if (next === 0) {
						current = orgNumSlides;
						$inner.css("left", -current * width);
					} else if (next === numSlides - 1) {
						current = 1;
						$inner.css("left", -width);
					}

					if (defaults.bullets) { // @todo Temporary fix until 1.5
						$slider.find(".as-nav a").removeClass("as-active").filter("[data-num=" + current + "]").addClass("as-active");
					}

					defaults.afterChange.call($slider);
				});
			}
		}

		// Set the autoplay timer
		function tick() {
			timer = setTimeout(function () {
				next = (defaults.rtl ? current - 1 : current + 1);

				run();

				tick();
			}, defaults.interval);
		}

		// If the user has supplied options let's merge them with the defaults
		if (options) {
			$.extend(defaults, options);
		}

		// Setup the slides
		$slides.eq(0).clone().addClass("clone").appendTo($slider);
		$slides.eq(numSlides - 1).clone().addClass("clone").prependTo($slider);

		$slides = $slider.children();
		numSlides = $slides.length;

		// Set the starting slide
		if (defaults.startSlide < orgNumSlides) {
			current = defaults.startSlide;
		}

		// CSS setup
		$slides.wrapAll('<div class="as-slide-inner"></div>').css("width", width);
		$inner = $slider.css("overflow", "hidden").find(".as-slide-inner");

		if (defaults.animation === "fade") {
			$slides.css({
				"display": "none",
				"left": 0,
				"position": "absolute",
				"top": 0
			}).eq(current).show();

			$inner.css("width", width);
		} else {
			$slides.css({
				"float": "left",
				"position": "relative"
			});

			$inner.css({
				"left": -current * width,
				"width": numSlides * width
			});
		}

		$inner.css({
			"float": "left",
			"position": "relative"
		});

		// Add the arrows
		$slider.prepend('<a href="#" class="as-prev-arrow" title="' + defaults.prevLabel + '">' + defaults.prevLabel + '</a>')
			.append('<a href="#" class="as-next-arrow" title="' + defaults.nextLabel + '">' + defaults.nextLabel + '</a>');

		$arrows = $slider.find(".as-prev-arrow, .as-next-arrow");

		// Hide controls
		if (!defaults.showControls) {
			$arrows.hide();
		}

		// Show and hide arrows on hover
		if (defaults.showOnHover && !defaults.showControls) {
			$slider.mouseenter(function () {
				$arrows.show();
			}).mouseleave(function () {
				$arrows.hide();
			});
		}

		// Add event listener for click on previous and next buttons
		$slider.delegate($arrows.selector, "click", function (e) {
			e.preventDefault();

			if ($(e.target).parent().is(".as-nav")) { // Fix for delegate() firing twice
				return false;
			}

			next = (e.target.className === "as-prev-arrow" ? current - 1 : current + 1);

			run();
		});

		// Add navigation bullets if requested
		if (defaults.bullets) {
			var i, active, out = '<div class="as-nav">';

			for (i = 1; i <= orgNumSlides; i++) {
				active = (i === current ? 'class="as-active"' : "");

				out += '<a href="#"' + active + 'data-num="' + i + '">' + i + '</a> ';
			}

			out += '</div>';

			$slider.append(out).delegate(".as-nav a", "click", function (e) {
				e.preventDefault();

				next = $slider.find(".as-nav a").removeClass("as-active").filter(this).addClass("as-active").data("num");

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
				next = (key === 37 ? current - 1 : current + 1);

				run();
			});
		}

		// See if the user wants autoplay enabled
		if (defaults.interval && orgNumSlides > 1) {
			tick();

			// See if the user whishes to pause the autoplay on hover
			if (defaults.pauseOnHover) {
				$slider.mouseenter(function () {
					clearTimeout(timer);
				}).mouseleave(function () {
					tick();
				});
			}
		}

		// Enable swipe support if requested
		// Credits to http://wowmotty.blogspot.com/2011/10/adding-swipe-support.html
		if (defaults.touch && "ontouchstart" in document.documentElement) {
			var startTime, startX;

			$slider.bind("touchstart", function (e) {
				e.preventDefault();

				startTime = e.timeStamp;
				startX = e.originalEvent.touches[0].pageX;
			}).bind("touchmove", function (e) {
				var currentX = e.originalEvent.touches[0].pageX,
					currentDistance = (startX === 0) ? 0 : Math.abs(currentX - startX),
					currentTime = e.timeStamp;

				e.preventDefault();

				// Only allow if movement < 1 sec and distance is long enough
				if (startTime !== 0 && currentTime - startTime < 1000 && currentDistance > 50) {
					if (currentX < startX) { // Swiping to the left, i.e. previous slide
						next = current + 1;
					} else if (currentX > startX) { // Swiping to the right, i.e. next slide
						next = current - 1;
					}

					startTime = startX = 0;

					run();
				}
			}).bind("touchend", function () {
				startTime = startX = 0;
			});
		}

		// Fire the afterSetup callback
		defaults.afterSetup.call($slider);
	};

	$.fn.AnySlider = function (options) {
		return this.each(function () {
			var $slider = $(this), anyslider;

			// Bail if we already have a plugin instance for this element
			if ($slider.data("anyslider")) {
				return $slider.data("anyslider");
			}

			// Create a new Anyslider object
			anyslider = new Anyslider(this, options);

			// Store the AnySlider object
			$slider.data("anyslider", anyslider);
		});
	};
}(jQuery));