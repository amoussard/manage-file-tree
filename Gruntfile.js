module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    uglify: {
      dist: {
        files: {
          'dist/manage-file-tree.min.js': [
            'src/Tree/Node.js',
            'src/Tree/Tree.js',
            'src/Visitors/Visitor.js',
            'src/Visitors/*.js',
            'src/manage-file-tree.js'
          ]
        }
      }
    },

    /** Watch for files modification **/
    watch: {
      livereload: {
        files: [
          'src/**/*.js'
        ],
        options: {
          livereload: true
        }
      }
    },

    /** Create servers **/
    connect: {
      dev: {
        options: {
          hostname: 'dev.managefiletree.local',
          port: 9000,
          base: 'public/',
          livereload: true
        }
      },
      dist: {
        options: {
          hostname: 'dist.managefiletree.local',
          port: 9001,
          base: 'dist/',
          keepalive: true
        }
      }
    },

    jasmine: {
      dev: {
        src: [
          'src/Tree/Node.js',
          'src/Tree/Tree.js',
          'src/Visitors/Visitor.js',
          'src/Visitors/*.js',
          'src/manage-file-tree.js'
        ],
        options: {
          specs: 'test/spec/*Spec.js',
          outfile: 'build/TestsResult.html',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'build/coverage/coverage.json',
            report: {
              type: 'html',
              options: {
                dir: 'build/coverage'
              }
            },
            thresholds: {
              lines: 100,
              statements: 100,
              branches: 100,
              functions: 100
            }
          }
        }
      },
      dist: {
        src: [
          'src/Tree/Node.js',
          'src/Tree/Tree.js',
          'src/Visitors/Visitor.js',
          'src/Visitors/*.js',
          'src/manage-file-tree.js'
        ],
        options: {
          specs: 'test/spec/*Spec.js',
          outfile: 'build/TestsResult.html',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'build/coverage/coverage.json',
            report: 'build/coverage',
            thresholds: {
              lines: 75,
              statements: 75,
              branches: 75,
              functions: 90
            }
          }
        }
      }
    }

  });

  grunt.registerTask('publish', [
    'jshint',
    'jasmine:dist',
    'uglify'
  ]);
  grunt.registerTask('test', [
    'jshint',
    'jasmine:dev'
  ]);
  grunt.registerTask('default', [
    'test'
  ]);

};
