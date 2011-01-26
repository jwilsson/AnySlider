/**
 * jQuery AnySlider 1.0.1
 * http://jonathanwilsson.com/
 *
 * Copyright 2010 Jonathan Wilsson
 * Orginal code by Jacob Gube
 * http://sixrevisions.com/tutorials/javascript_tutorial/create-a-slick-and-accessible-slideshow-using-jquery/
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {

	$.fn.AnySlider = function (options) {

		var defaults = {
			current_pos : 0,
			slide_width : 0,
			slides : $('.slide'),
			num_slides : 0
		};

		function change_slide(caller) {
			// See where the user is going
			if (caller === '39' || caller === 'next') {
				defaults.current_pos += 1; // Next slide
			} else {
				defaults.current_pos -= 1; // Previous slide
			}

			// See if slide range has been exceeded
			if (defaults.current_pos < 0) {
				defaults.current_pos = defaults.num_slides - 1;
			} else if (defaults.current_pos >= defaults.num_slides) {
				defaults.current_pos = 0;
			}

			// Animate the divs
			$('#slide-inner').animate({'marginLeft' : defaults.slide_width * (-defaults.current_pos)});
		}

		return this.each(function () {

			var $this = $(this);

			defaults.slide_width = $this.width();
			defaults.num_slides = defaults.slides.length; // Number of slides

			// Remove scrollbar
			$this.css('overflow', 'hidden');

			// Wrap the .slide divs
			defaults.slides.wrapAll('<div id="slide-inner"></div>').css({'float' : 'left', 'width' : defaults.slide_width});

			// Set #slide-inner to the total width of all slides
			$('#slide-inner').css('width', defaults.slide_width * defaults.num_slides);

			// Add the arrows
			$this.prepend('<span class="arrow" id="prev" title="Previous slide">Previous</span>').append('<span class="arrow" id="next" title="Next slide">Next</span>');

			// Hide arrows control on first load
			$('.arrow').hide();

			// Show and hide arrows on hover
			$this.hover(function () {
				$('.arrow').show();
			}, function () {
				$('.arrow').hide();
			});

			// Add event listener for click on previous and next buttons
			$('.arrow').live('click', function () {
				change_slide($(this).attr('id'));
			});

			// Add event listener for keypress on left or right arrow
			$(document).bind('keydown', function (e) {
				var key = String(e.keyCode); // Fails unless it's converted to a string

				// See if the left or right arrow is pressed
				if (key === '37' || key === '39') {
					change_slide(key);
				}
			});

		});

	};

}(jQuery));