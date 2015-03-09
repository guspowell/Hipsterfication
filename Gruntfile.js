module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'spec/*/**.js', './public/javascripts/*']
    },

    execute: {
      target: {
        src: ['./spec/*']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('default', ['jshint', 'execute']);

};
