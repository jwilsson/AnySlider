# jQuery AnySlider 1.3.1
AnySlider is a jQuery plugin which allows you to create a slider for any kind of content.

http://jonathanwilsson.com/projects/jquery-anyslider/

## Features
* Slide anything you want. HTML, images, YouTube clips, you name it!
* Slide using any element! Mix &lt;div&gt;s, &lt;span&gt;s and &lt;section&gt;s (or any other element too of course). AnySlider doesn't care.
* Support for multiple sliders on one page.
* Small, 855 bytes minified and gzipped.

### Customizable
* Continuous autoplay
* Custom easings
* i18n possibilities
* Initially hide/show controls or on hover
* Keyboard navigation

### Options
* easing (Default "swing") string Name of a custom easing. For example via the jQuery Easing plugin.
* interval (Default 5000) integer Number of milliseconds to pause on each slide. Setting this option to 0 will disable autoplay.
* keyboardNav (Default true) boolean Allow for keyboard navigation using the left and right arrow keys.
* nextLabel (Default "Next slide") string Label for the next button.
* pauseOnHover (Default true) boolean Whether to pause the autoplay on hover.
* prevLabel (Default "Previous slide") string Label for the previous button.
* showControls (Default true) boolean Initially hide/show controls.
* showOnHover (Default false) boolean Hide/show controls on hover.
* speed (Default 400) int The animation time in milliseconds. Setting this option to 0 will disable animation.

Minimum required jQuery version is 1.4.

## License
Free to use and abuse under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

## Changelog
### 1.3.1
* Added support for custom easings via the jQuery Easing plugin.
* Added autoplay support. Check out the "interval" and "pauseOnHover" options.
* Restructured the CSS to help with the setup of AnySlider.

### 1.3
* Rewrote most of the script.
* The slider is now "infinite" and will always scroll in the same direction.

### 1.2.2
* Fixed an issue where the "speed" option wasn't honored.

### 1.2.1
* AnySlider now support several sliders on one page.
* Removed the IDs from the arrow elements. Instead, they now have classes of "prev-arrow" and "next-arrow" respectivly.
* The ID "slide-inner" is now a class instead.
* Fixed an issue where animations could be "queued" and would be run several times.

### 1.2
* Finally added a "speed" option.
* Various code improvements.

### 1.1.2
* Enhanced the options to always show/hide arrows or just on hover.
* Minor code cleanup.

### 1.1
* New arrows.
* Added some options:
    * Always show/hide arrows
    * Enable/disable keyboard navigation
    * Custom labels for the controls
* Fixed a minor bug were keyboard codes had to be converted into a string.
* Separated options from internal variables.

### 1.0.1
* Rewrote bits of the code to perform better.

### 1.0
* Initial release.

## Copyright
Copyright 2011 Jonathan Wilsson