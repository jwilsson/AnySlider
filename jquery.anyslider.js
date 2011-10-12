// jQuery AnySlider 1.3 | Copyright 2011 Jonathan Wilsson
(function ($) {
	"use strict";
	var Anyslider = function (elem, options) {
		var $slider = $(elem),
			$slides = $slider.children(),
			numSlides = $slides.length,
			width = $slider.width(),
			next = 0,
			slidePos = 1,
			$inner,
			$arrows,
			defaults = {
				keyboardNav: true,
				nextLabel: "Next slide",
				prevLabel: "Previous slide",
				showControls: true,
				showOnHover: false,
				speed: 400
			};

		// The main animation function
		function run(direction) {
			if (direction === "prev") {
				next = slidePos - 1;
			} else {
				next = slidePos + 1;
			}

			$inner.stop().animate({"left": -next * width}, defaults.speed, function () {
				if (next === 0) {
					slidePos = numSlides - 2;
					$inner.css("left", -slidePos * width);
				} else if (next === numSlides - 1) {
					slidePos = 1;
					$inner.css("left", -width);
				} else {
					slidePos = next;
				}
			});
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

		$slider.css("overflow", "hidden");

		$slides.wrapAll('<div class="slide-inner"></div>').css({
			"display": "inline",
			"float": "left",
			"position": "relative",
			"width": width
		});

		$inner = $slider.children(".slide-inner").css({
			"float": "left",
			"left": -width,
			"position": "relative",
			"width": numSlides * width
		});

		// Add the arrows
		$slider.prepend('<span class="prev-arrow" title="' + defaults.prevLabel + '">' + defaults.prevLabel + '</span>')
			.append('<span class="next-arrow" title="' + defaults.nextLabel + '">' + defaults.nextLabel + '</span>');

		$arrows = $slider.find(".prev-arrow, .next-arrow");

		// Hide controls
		if (!defaults.showControls) {
			$arrows.hide();
		}

		// Show and hide arrows on hover
		if (defaults.showOnHover && !defaults.showControls) {
			$slider.bind("mouseover", function () {
				$arrows.show();
			}).bind("mouseout", function () {
				$arrows.hide();
			});
		}

		// Add event listener for click on previous and next buttons
		$arrows.live("click", function (e) {
			if (e.target.className === "prev-arrow") {
				run("prev");
			} else {
				run("next");
			}
		});

		// Enable keyboard navigation
		if (defaults.keyboardNav) {
			$(document).bind("keydown", function (e) {
				var key = e.keyCode;

				// See if the left or right arrow is pressed
				if (key === 37) {
					run("prev");
				} else if (key === 39) {
					run("next");
				}
			});
		}
	};

	$.fn.AnySlider = function (options) {

		return this.each(function () {
			var $slider = $(this),
				anyslider;

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