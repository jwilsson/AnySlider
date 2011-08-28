/**
 * jQuery AnySlider 1.2.1
 * http://jonathanwilsson.com/projects/jquery-anyslider/
 *
 * Copyright 2011 Jonathan Wilsson
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	var Anyslider = function (elem, options) {	
		var $elem = $(elem),
			$arrows,
			vars = { // Internal vars. Please don't touch
				animating: false,
				currentPos: 0,
				numSlides: 0,
				slides: $elem.find(".slide"),
				slideWidth: $elem.width()
			},
			defaults = { // Default settings
				keyboardNav: true,
				nextLabel: "Next slide",
				prevLabel: "Previous slide",
				showControls: true,
				showOnHover: false,
				speed: 400
			};
	
		function changeSlide(caller) {
			// See where the user is going
			if (caller === 39 || caller === "next-arrow") {
			    vars.currentPos += 1; // Next slide
			} else {
			    vars.currentPos -= 1; // Previous slide
			}
	    
			// See if slide range has been exceeded
			if (vars.currentPos < 0) {
			    vars.currentPos = vars.numSlides - 1;
			} else if (vars.currentPos >= vars.numSlides) {
			    vars.currentPos = 0;
			}
	    
			// Animate the divs
			if (!vars.animating) {
				vars.animating = true;
				
				$elem.find(".slide-inner").animate({marginLeft: vars.slideWidth * (-vars.currentPos)}, vars.speed, function () {
					vars.animating = false;	
				});
			}
			
		}
		    
		// If the user has supplied options let's merge them with the defaults
		if (options) {
			$.extend(defaults, options);
		}
		    
		// Number of slides
		vars.numSlides = vars.slides.length;
		
		// Wrap the .slide divs
		vars.slides.wrapAll('<div class="slide-inner"></div>').css({"float": "left", width: vars.slideWidth});
		
		// Remove scrollbar, add the arrows and set .slide-inner to the total width of all slides
		$elem.css("overflow", "hidden")
			.prepend('<span class="prev-arrow" title="' + defaults.prevLabel + '">' + defaults.prevLabel + '</span>')
			.append('<span class="next-arrow" title="' + defaults.nextLabel + '">' + defaults.nextLabel + '</span>')
			.find(".slide-inner").css("width", vars.slideWidth * vars.numSlides);
			
		$arrows = $elem.find(".prev-arrow, .next-arrow");
			
		// Hide controls
		if (!defaults.showControls) {
			$arrows.hide();
		}

		if (defaults.showOnHover && !defaults.showControls) {
			// Show and hide arrows on hover
			$elem.bind("mouseover", function () {
				$arrows.show();
			}).bind("mouseout", function () {
				$arrows.hide();
			});
		}
		
		// Add event listener for click on previous and next buttons
		$arrows.live("click", function (e) {
			changeSlide(e.target.className);
		});
		
		if (defaults.keyboardNav) {
			// Add event listener for keypress on left or right arrow
			$(document).bind("keydown", function (e) {
				var key = e.keyCode;
		
				// See if the left or right arrow is pressed
				if (key === 37 || key === 39) {
					changeSlide(key);
				}
			});
		}
	};
    
	$.fn.AnySlider = function (options) {

		return this.each(function () {
			var $elem = $(this),
				anyslider;
		    
			// Bail if we already have a plugin insatnce for this element
			if ($elem.data("anyslider")) {
				return $elem.data("anyslider");
			}
		    
			// Create a new Anyslider object
			anyslider = new Anyslider(this, options);
		    
			// Store the AnySlider object
			$elem.data("anyslider", anyslider);
		});
	};

}(jQuery));