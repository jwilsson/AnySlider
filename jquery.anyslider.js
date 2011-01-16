/**
 * jQuery AnySlider 1.0
 * http://www.jonathanwilsson.com/
 *
 * Copyright 2010 Jonathan Wilsson
 * Orginal code by Jacob Gube
 * http://sixrevisions.com/tutorials/javascript_tutorial/create-a-slick-and-accessible-slideshow-using-jquery/
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	// Variables
	var vars = {
		current_pos : 0,
		slide_width : 0,
		slides : $('.slide'),
		num_slides : 0
	},

	AnySlider = function (elem) {
		var $slider = $(elem); // The slider element

		vars.slide_width = $slider.width();
		vars.num_slides = vars.slides.length; // Number of slides

		// Remove scrollbar
		$slider.css('overflow', 'hidden');

		// Wrap the .slide divs
		vars.slides.wrapAll('<div id="slide-inner"></div>').css({'float' : 'left', 'width' : vars.slide_width});

		// Set #slide-inner to the total width of all slides
		$('#slide-inner').css('width', vars.slide_width * vars.num_slides);

		// Add the arrows
		$slider.prepend('<span class="arrow" id="prev" title="Previous slide">Previous</span>').append('<span class="arrow" id="next" title="Next slide">Next</span>');

		// Hide left arrow control on first load
		$('.arrow').hide();

		// Show and hide arrows on hover
		$slider.hover(function () {
			$('.arrow').show();
		},
		function () {
			$('.arrow').hide();
		});
	};

	function change_slide(caller) {
		// See where the user is going
		if (caller === '39' || caller === 'next') {
			vars.current_pos += 1; // Next slide
		} else {
			vars.current_pos -= 1; // Previous slide
		}

		// See if slide range has been exceeded
		if (vars.current_pos < 0) {
			vars.current_pos = vars.num_slides - 1;
		} else if (vars.current_pos >= vars.num_slides) {
			vars.current_pos = 0;
		}

		// Animate the divs
		$('#slide-inner').animate({'marginLeft' : vars.slide_width * (-vars.current_pos)});

		return true;
	}

	// Add event listener for click on previous and next buttons
	$('.arrow').live('click', function (e) {
		change_slide(e.target.id);
	});

	// Add event listener for keypress on left or right arrow
	$(document).bind('keydown', function (e) {
		var key = String(e.keyCode);

		// See if the left or right arrow is pressed
		if (key === '37' || key === '39') {
			change_slide(key);
		}
	});

	$.fn.AnySlider = function () {
		return this.each(function () {
			new AnySlider(this);
		});
	};
}(jQuery));