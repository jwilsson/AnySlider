module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                src: 'src/jquery.anyslider.js',
                dest: 'dist/jquery.anyslider.js'
            }
        },

        jscs: {
            src: 'src/jquery.anyslider.js'
        },

        jshint: {
            dist: {
                src: ['src/jquery.anyslider.js'],
                options: grunt.file.readJSON('.jshintrc')
            }
        },

        uglify: {
            options: {
                banner: '/*! jQuery AnySlider <%= pkg.version %> | Copyright <%= grunt.template.today("yyyy") %> Jonathan Wilsson and contributors. */\n'
            },
            build: {
                src: 'src/jquery.anyslider.js',
                dest: 'dist/jquery.anyslider.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'copy', 'uglify']);
};
