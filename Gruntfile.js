module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mkdir: {
           target: {
             options: {
                create: ["release"]
             },
          },
        },

        copy: {
           release: {
             files: [
                {
                   expand: true, flatten: false,
                   src: [
                      "*.html",
                      "assets/**/*",
                   ],
                   dest: "release"
                },
             ],
          },
        },

        clean: {
          release: {
             src: ['release']
          },
          stylesheets: {
             src: ['release/**/*.css']
          },
          scripts: {
             src: ['release/**/*.js']
          },
        },

        uglify: {
            main: {
                src: 'assets/js/creative.js',
                dest: 'release/assets/js/<%= pkg.name %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "release/assets/css/<%= pkg.name %>.css": "assets/less/*less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "release/assets/css/<%= pkg.name %>.min.css": "assets/less/*less"
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            //' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['css/*css', 'css/*min.css', 'js/*min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['assets/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'usebanner']);
    grunt.registerTask('release', ['clean:release', 'mkdir','copy:release', 'uglify', 'less', 'usebanner'])

};
