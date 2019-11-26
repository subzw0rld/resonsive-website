// const sass = require('node-sass');
const grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.initConfig({
  sass: {                              // Task
    dist: {                            // Target
      options: {                       // Target options
        style: 'expanded'
      },
      files: {                         // Dictionary of files
        './assets/css/main.css': './scss/main.scss',       // 'destination': 'source'
        './assets/css/techblog.css': './scss/techblog.scss',
        './assets/css/travelblog.css': './scss/travelblog.scss',
        './assets/css/about.css': './scss/pages/about.scss',
        './assets/css/contact.css': './scss/pages/contact.scss',
        './assets/css/home.css': './scss/pages/home.scss',
        './assets/css/blog.css': './scss/pages/blog.scss'
      }
    }
  },
  watch: {
    scripts: {
      files: '**/*.scss',
      tasks: ['sass'],
      options: {
        interrupt: true,
        livereload: true
      },
    }
  },
  connect: {
    server: {
      options: {
        port: 4200,
        hostname: '*',
        livereload: true
      }
    }
  }
});

grunt.registerTask('default', ['watch']);