module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js',
              '**/*.js',
              '!node_modules/**/*.js'],
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js',
                '**/*.js',
                '!node_modules/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jshint']);
};
