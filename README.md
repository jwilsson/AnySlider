# jQuery AnySlider 1.2.2
AnySlider is a jQuery plugin which allows you to create a slider for any kind of content.

http://jonathanwilsson.com/projects/jquery-anyslider/

## Features
* Slide anything you want. HTML, images, YouTube clips, you name it!
* Support for multiple sliders on one page
* Small, 786 bytes minified and gzipped

### Customizable
* Initially hide/show controls or on hover
* Keyboard navigation
* Control the animation speed
* i18n possibilities

### Options
* easing (Default swing) string A easing of your choice
* keyboardNav (Default true) true/false Allow for keyboard navigation using the left and right arrow keys
* nextLabel (Default "Next slide") string Label for the next button
* prevLabel (Default "Previous slide") string Label for the previous button
* showControls (Default true) true/false Initially hide/show controls
* showOnHover (Default false) true/false Hide/show controls on hover
* speed (Default 400) int The animation time in milliseconds

Requires at least jQuery 1.5.

## License
Free to use and abuse under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

## Acknowledgements
Orginal code by [Jacob Gube](http://sixrevisions.com/tutorials/javascript_tutorial/create-a-slick-and-accessible-slideshow-using-jquery/).

## Changelog
### 1.2.2
* Fixed an issue where the "speed" option wasn't honored

### 1.2.1
* AnySlider now support several sliders on one page
* Removed the IDs from the arrow elements. Instead, they now have classes of "prev-arrow" and "next-arrow" respectivly
* The ID "slide-inner" is now a class instead
* Fixed an issue where animations could be "queued" and would be run several times

### 1.2
* Finally added a speed option
* Various code improvements

### 1.1.2
* Enhanced the options to always show/hide arrows or just on hover
* Minor code cleanup

### 1.1
* New arrows
* Added some options:
    * Always show/hide arrows
    * Enable/disable keyboard navigation
    * Custom labels for the controls
* Fixed a minor bug were keyboard codes had to be converted into a string.
* Separated options from internal variables

### 1.0.1
* Rewrote bits of the code to perform better

### 1.0
* Initial release

## Copyright
Copyright 2011 Jonathan Wilsson