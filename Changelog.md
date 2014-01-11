## Changelog
### 1.7.0
* It's now possible to scroll while touching the slider.
* Added namespaces to all events.
* Removed the data-num attribute on navigation bullets.

### 1.6.2
* Fixed various issues regarding the cloning of slides.

### 1.6.1
* Slides will always be cloned again, only cloning when there's more than one slide caused too much trouble at this point.

### 1.6.0
* Added touch support for Windows 8.
* In all callbacks, `this` will now refer to the slider-element instead of the AnySlider-object.
* Fixed an issue where the autoplay timer wasn't reset. Props [@VitaliiBlagodir](https://github.com/VitaliiBlagodir).
* Fixed an issue where a single slide wasn't shown.

### 1.5.2
* Added a "delay" option to control the delay between fade slides.
* Fixed a bug where the navigation bullets weren't correctly updated when autoplaying.
* If there is only one slide in the slider, that slide won't be cloned.

### 1.5.1
* Fixed a compatibility issue with jQuery 1.9.

### 1.5.0
* AnySlider is now responsive!
* The option "showOnHover" has been removed. Arrows are only drawn if "showControls" is true. The ability to show/hide controls is now handled by CSS.
* The navigation bullets have been moved outside the slider element to allow for better control of the positioning.
* Other bugfixes, optimizations and improvements.

### 1.4.3
* Fixed an issue where the slider would crash in older versions of jQuery.
* Fixed an issue where the navigation bullets weren't correctly updated.
* Added the following callbacks:
	* beforeChange which triggers before a slide changes.
	* afterChange which triggers after a slide changes.
	* afterSetup which triggers after the slider has setup completely.

### 1.4.2
* Added fade transition.

### 1.4.1
* Changed the arrows from &lt;span&gt;s to &lt;a&gt;s for improved accessibility.
* Added the ability to choose the starting slide.
* Some code enhancements.

### 1.4
* Added the ability to swipe between slides.
* Increased the minimum required jQuery version to 1.5.
* Changed the following class names:
    * prev-arrow to as-prev-arrow
    * next-arrow to as-next-arrow
    * active to as-active

### 1.3.2
* Fixed an issue where AnySlider would autoplay when there was only one slide.
* Added navigation bullets.
* Added the "rtl" option to control slide direction when autoplay is enabled.

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
