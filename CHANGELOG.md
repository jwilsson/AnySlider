## Changelog
### 2.1.0 (2015-11-21)
* Improved CommonJS support so tools like Browserify and webpack work.
* jQuery Plugin manifest file has been removed.
* The current slide now has the class "as-current-slide".
* Fixed an issue with vertical scrolling on mobile and tablets ([#22](https://github.com/jwilsson/AnySlider/issues/22)).
* All external resources in demos etc. are now included over https.
* Fixed some CSS issues in the demo code.

### 2.0.2 (2014-12-18)
* Another version bump for npm after bower.json update.

### 2.0.1 (2014-12-15)
* Version bump for npm after bower.json update.

### 2.0.0 (2014-08-14)
* AnySlider now features an API. See the docs for more details.
* Added support for Zepto.js.
* Increased minimum required jQuery version to 1.7.0 (was 1.5.0).
* True crossfade for slides.
* Added support for AMD.
* Changed the $.fn namespace name to `anyslider` (note casing).
* Changed `touch-action: none;` to `touch-action: pan-y;` in the default CSS.
* Removed the following options:
    * `delay`
    * `responsive` (AnySlider is now responsive by default)
* Renamed the following options:
    * `bullets` to `showBullets`
    * `rtl` to `reverse`
    * `keyboardNav` to `keyboard`

### 1.7.1 (2013-03-08)
* Fixed a bug where the keyboard navigation wouldn't work.

### 1.7.0 (2013-12-17)
* It's now possible to scroll while touching the slider.
* Added namespaces to all events.
* Removed the data-num attribute on navigation bullets.

### 1.6.2 (2013-09-09)
* Fixed various issues regarding the cloning of slides.

### 1.6.1 (2013-06-18)
* Slides will always be cloned again, only cloning when there's more than one slide caused too much trouble at this point.

### 1.6.0 (2013-06-03)
* Added touch support for Windows 8.
* In all callbacks, `this` will now refer to the slider-element instead of the AnySlider-object.
* Fixed an issue where the autoplay timer wasn't reset. Props [@VitaliiBlagodir](https://github.com/VitaliiBlagodir).
* Fixed an issue where a single slide wasn't shown.

### 1.5.2 (2012-04-27)
* Added a "delay" option to control the delay between fade slides.
* Fixed a bug where the navigation bullets weren't correctly updated when autoplaying.
* If there is only one slide in the slider, that slide won't be cloned.

### 1.5.1 (2012-18-12)
* Fixed a compatibility issue with jQuery 1.9.

### 1.5.0 (2012-11-18)
* AnySlider is now responsive!
* The option "showOnHover" has been removed. Arrows are only drawn if "showControls" is true. The ability to show/hide controls is now handled by CSS.
* The navigation bullets have been moved outside the slider element to allow for better control of the positioning.
* Other bugfixes, optimizations and improvements.

### 1.4.3 (2012-08-22)
* Fixed an issue where the slider would crash in older versions of jQuery.
* Fixed an issue where the navigation bullets weren't correctly updated.
* Added the following callbacks:
    * beforeChange which triggers before a slide changes.
    * afterChange which triggers after a slide changes.
    * afterSetup which triggers after the slider has setup completely.

### 1.4.2 (2012-07-23)
* Added fade transition.

### 1.4.1 (2012-04-21)
* Changed the arrows from &lt;span&gt;s to &lt;a&gt;s for improved accessibility.
* Added the ability to choose the starting slide.
* Some code enhancements.

### 1.4 (2012-02-02)
* Added the ability to swipe between slides.
* Increased the minimum required jQuery version to 1.5.
* Changed the following class names:
    * prev-arrow to as-prev-arrow
    * next-arrow to as-next-arrow
    * active to as-active

### 1.3.2 (2011-12-10)
* Fixed an issue where AnySlider would autoplay when there was only one slide.
* Added navigation bullets.
* Added the "rtl" option to control slide direction when autoplay is enabled.

### 1.3.1 (2011-11-01)
* Added support for custom easings via the jQuery Easing plugin.
* Added autoplay support. Check out the "interval" and "pauseOnHover" options.
* Restructured the CSS to help with the setup of AnySlider.

### 1.3 (2011-10-12)
* Rewrote most of the script.
* The slider is now "infinite" and will always scroll in the same direction.

### 1.2.2 (2011-08-29)
* Fixed an issue where the "speed" option wasn't honored.

### 1.2.1 (2011-08-28)
* AnySlider now support several sliders on one page.
* Removed the IDs from the arrow elements. Instead, they now have classes of "prev-arrow" and "next-arrow" respectivly.
* The ID "slide-inner" is now a class instead.
* Fixed an issue where animations could be "queued" and would be run several times.

### 1.2 (2011-05-10)
* Finally added a "speed" option.
* Various code improvements.

### 1.1.2 (2011-04-24)
* Enhanced the options to always show/hide arrows or just on hover.
* Minor code cleanup.

### 1.1 (2011-02-26)
* New arrows.
* Added some options:
    * Always show/hide arrows
    * Enable/disable keyboard navigation
    * Custom labels for the controls
* Fixed a minor bug were keyboard codes had to be converted into a string.
* Separated options from internal variables.

### 1.0.1 (2011-01-26)
* Rewrote bits of the code to perform better.

### 1.0 (2011-01-16)
* Initial release.
