'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    'ftp-deploy': {
      build: {
        auth: {
          host: '',
          port: ,
          authKey: 'key1'
        },
        src: 'test/app',
        dest: '/users/chosungmin/test/',
        exclusions: ['**/.DS_Store', '**/Thumbs.db', '**/*.psd', 'html', 'html_au', 'i18n', 'sass', 'src', 'test', '**/.*', '**/*.json', '**/CNAME', '**/*.md','bower_components', '**/spr_*/**/*'],
        forceVerbose : false,
        forceUpload : false,
        syncMode : true
      }
    },
    simplemocha: {
      test: {
        src: './test/test.js'
      }
    },
    clean: {
      test: ['test/tmp']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-simple-mocha');

  var mockServer;
  grunt.registerTask('pre', function () {
    var Server = require('ftp-test-server');

    mockServer = new Server();

    mockServer.init({
      user: 'test',
      pass: 'test',
      port: 3334
    });

    mockServer.on('stdout', process.stdout.write.bind(process.stdout));
    mockServer.on('stderr', process.stderr.write.bind(process.stderr));

    setTimeout(this.async(), 500);
  });

  grunt.registerTask('post', function () {
    mockServer.stop();
  });

  grunt.registerTask('default', [
    'clean',
    'pre',
    'ftp-deploy',
    'simplemocha',
    'post',
    'clean'
  ]);
};
