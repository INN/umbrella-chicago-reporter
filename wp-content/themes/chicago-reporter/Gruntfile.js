module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // Find what the current theme's directory is, relative to the WordPress root
    var path = process.cwd().replace(/^[\s\S]+\/wp-content/, "\/wp-content");

    var CSS_LESS_FILES = {
        'css/chicagoreporter.css': 'less/chicagoreporter.less',
        'css/photo-header.css': 'less/photo-header.less',
        'homepages/assets/css/cr_homepage.css': 'homepages/assets/less/cr_homepage.less',
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ['less', '../largo-dev/less/inc'],
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapBasepath: path,
                },
                files: CSS_LESS_FILES
            },
        },

        watch: {
            less: {
                files: [
                    'less/**/*.less',
                    'homepages/assets/less/**/*.less'
                ],
                tasks: [
                    'less:development',
                    'cssmin'
                ]
            }
        },
        
        cssmin: {
            target: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                },
                {
                    expand: true,
                    cwd: 'homepages/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'homepages/assets/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
}
