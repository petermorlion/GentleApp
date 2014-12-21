module.exports = function(grunt) {
  grunt.initConfig({
    jasmine : {
      // Your project's source files
      src : ['www/js/controllers/**/*.js'],
      options: {
        // Your Jasmine spec files
        specs : 'test/**/*Spec.js',
      }
      // Your spec helper files
      //helpers : 'specs/helpers/*.js'
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', 'jasmine');
};