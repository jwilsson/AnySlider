requirejs.config({
    shim: {
        jquery: {
            exports: 'Zepto'
        }
    },
    paths: {
        jquery: 'zepto.min' // We're defining Zepto as jQuery for now
    }
});

require(['jquery', '../../src/jquery.anyslider'], function($) {
    $('.slider1').anyslider({
        animation: 'fade',
        interval: 3000,
        reverse: true,
        showControls: false,
        startSlide: 2
    });

    $('.slider2').anyslider({
        easing: 'easeOutBounce',
        interval: 0,
        keyboard: false,
        speed: 1500
    });
});
