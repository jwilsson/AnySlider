// jQuery AnySlider 1.4 | Copyright 2012 Jonathan Wilsson
(function ($) {
	var Anyslider = function (elem, options) {
		var $slider = $(elem),
			$slides = $slider.children(),
			numSlides = $slides.length,
			width = $slider.width(),
			next = 0,
			slidePos = 1,
			$inner,
			$arrows,
			timer,
			startTime,
			startX,
			defaults = {
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
				touch: true
			};

		// The main animation function
		function run() {
			$inner.stop().animate({"left": -next * width}, defaults.speed, defaults.easing, function () {
				if (next === 0) {
					slidePos = numSlides - 2;
					$inner.css("left", -slidePos * width);
				} else if (next === numSlides - 1) {
					slidePos = 1;
					$inner.css("left", -width);
				} else {
					slidePos = next;
				}
				
				if(defaults.bullets) {
					$slider.find(".as-nav a").removeClass("as-active").filter("[data-num=" + slidePos + "]").addClass("as-active");
				}
			});
		}

		// Set the autoplay timer
		function tick() {
			timer = setTimeout(function () {
				if(defaults.rtl) {
					next = slidePos - 1;
				} else {
					next = slidePos + 1;	
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
		$slides.eq(0).clone().addClass("clone").appendTo($slider);
		$slides.eq(numSlides - 1).clone().addClass("clone").prependTo($slider);

		$slides = $slider.children();
		numSlides = $slides.length;

		$slider.css("overflow", "hidden");

		$slides.wrapAll('<div class="as-slide-inner"></div>').css({
			"display": "inline",
			"float": "left",
			"position": "relative",
			"width": width
		});

		$inner = $slider.children(".as-slide-inner").css({
			"float": "left",
			"left": -width,
			"position": "relative",
			"width": numSlides * width
		});

		// Add the arrows
		$slider.prepend('<span class="as-prev-arrow" title="' + defaults.prevLabel + '">' + defaults.prevLabel + '</span>')
			.append('<span class="as-next-arrow" title="' + defaults.nextLabel + '">' + defaults.nextLabel + '</span>');

		$arrows = $slider.find(".as-prev-arrow, .as-next-arrow");

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
		$slider.delegate(".as-prev-arrow, .as-next-arrow", "click", function (e) {
			if (e.target.className === "as-prev-arrow") {
				next = slidePos - 1;
			} else {
				next = slidePos + 1;
			}
			
			run();
		});
		
		// Add navigation bullets if requested
		if (defaults.bullets) {
			var i, temp = numSlides - 2, active = "", out = '<div class="as-nav">';
			
			for(i = 1; i <= temp; i++) {
				active = "";
				if(i === slidePos) {
					active = 'class="as-active"';
				}
				
				out += '<a href="#"' + active + 'data-num="' + i + '">' + i + '</a> ';
			}
			
			out += '</div>';
			
			$slider.append(out).find(".as-nav a").live("click", function (e) {
				e.preventDefault();
				
				next = Number($slider.find(".as-nav a").removeClass("as-active").filter(this).addClass("as-active").text());
				
				run();
			});
		}
		
		// Enable keyboard navigation
		if (defaults.keyboardNav) {
			$(document).bind("keydown", function (e) {
				var key = e.keyCode;

				// See if the left or right arrow is pressed
				if (key === 37) {
					next = slidePos - 1;
				} else if (key === 39) {
					next = slidePos + 1;
				} else {
					return;
				}
				
				run();
			});
		}
		
		// See if the user wants autoplay enabled
		if (defaults.interval && (numSlides - 2) > 1) {
			tick();

			// See if the user whishes to pause the autoplay on hover
			if (defaults.pauseOnHover) {
				$slider.bind("mouseover", function () {
					clearTimeout(timer);
				}).bind("mouseout", function () {
					tick();
				});
			}
		}
		
		// Enable swipe support if requested
		// Credits to http://wowmotty.blogspot.com/2011/10/adding-swipe-support.html
		if (defaults.touch && "ontouchstart" in document.documentElement) {
			$slider.bind("touchstart", function (e) {
				e.preventDefault();
				
				startTime = e.timeStamp;
				startX = e.originalEvent.touches[0].pageX;
			}).bind("touchmove", function (e) {
				var currentX = e.originalEvent.touches[0].pageX,
					currentDistance = (startX === 0) ? 0 : Math.abs(currentX - startX),
					currentTime = e.timeStamp; // Only allow if movement < 1 sec
				
				e.preventDefault();
				
				if (startTime !== 0 && currentTime - startTime < 1000 && currentDistance > 50) {
					if (currentX < startX) { // Swiping to the left, i.e. previous slide
					    next = slidePos + 1;
					}
					
					if (currentX > startX) { // Swiping to the right, i.e. next slide
					    next = slidePos - 1;
					}
					
					startTime = 0;
					startX = 0;
					
					run();
				}
			}).bind("touchend", function () {
				startTime = startX = 0;
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