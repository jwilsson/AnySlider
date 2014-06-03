requirejs.config({
    shim: {
        'jquery.easing.1.3': ['jquery']
    },
    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min'
    }
});

require(['jquery', 'jquery.easing.1.3', '../../src/jquery.anyslider'], function($) {
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
