/**
 * jQuery AnySlider 1.1.2
 * http://jonathanwilsson.com/projects/jquery-anyslider/
 *
 * Copyright 2011 Jonathan Wilsson
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {

    $.fn.AnySlider = function (options) {

	// Internal vars. Please don't touch
        var vars = {
            currentPos: 0,
            slideWidth: 0,
            slides: $('.slide'),
            numSlides: 0
        },
        defaults = { // Default settings
            showControls: true,
	    showOnHover: false,
            keyboardNav: true,
            prevLabel: 'Previous slide',
            nextLabel: 'Next slide'
        };

        function changeSlide(caller) {
            // See where the user is going
            if (caller === 39 || caller === 'next') {
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
            $('#slide-inner').animate({marginLeft: vars.slideWidth * (-vars.currentPos)});
        }
	
        return this.each(function () {

            var $this = $(this);

            vars.slideWidth = $this.width();
            vars.numSlides = vars.slides.length; // Number of slides

            // If the user has supplied options let's merge them with the defaults
            if (options) {
                $.extend(defaults, options);
            }

            // Remove scrollbar
            $this.css('overflow', 'hidden');

            // Wrap the .slide divs
            vars.slides.wrapAll('<div id="slide-inner"></div>').css({'float': 'left', width: vars.slideWidth});

            // Set #slide-inner to the total width of all slides
            $('#slide-inner').css('width', vars.slideWidth * vars.numSlides);

            // Add the arrows
            $this.prepend('<span class="arrow" id="prev" title="' + defaults.prevLabel + '">' + defaults.prevLabel + '</span>').append('<span class="arrow" id="next" title="' + defaults.nextLabel + '">' + defaults.nextLabel + '</span>');

            // Hide controls
	    if (!defaults.showControls) {
		$('.arrow').hide();
	    }

            if (defaults.showOnHover && !defaults.showControls) {
                // Show and hide arrows on hover
                $this.hover(function () {
                    $('.arrow').show();
                }, function () {
                    $('.arrow').hide();
                });
            }

            // Add event listener for click on previous and next buttons
            $('.arrow').live('click', function (e) {
                changeSlide(e.target.id);
            });

            if (defaults.keyboardNav) {
                // Add event listener for keypress on left or right arrow
                $(document).bind('keydown', function (e) {
                    var key = e.keyCode;

                    // See if the left or right arrow is pressed
                    if (key === 37 || key === 39) {
                        changeSlide(key);
                    }
                });
            }
        });

    };

}(jQuery));