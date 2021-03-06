define([
  'config',
  'angularAMD',
  'require',
  'ui-router'
], function (config, angularAMD, require) {

  'use strict';
  
  var pages = config.pages,
    controllerName,
    i = 0,
    len = pages.length,
    page;

  var app = angular.module(config.appName, ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        
        // register routes
        for (i; i < len; i += 1) {

          page = pages[i];
          controllerName = page.name.charAt(0).toUpperCase() + page.name.substring(1) + 'Ctrl';
          $stateProvider
            .state(page.name, {
              url: '/' + page.name,
              views: {
                'main': angularAMD.route({
                  templateUrl: 'views/' + page.name + '.html',
                  controller: controllerName
                }),
                'menu': angularAMD.route({
                  templateUrl: 'views/menu.html',
                  controller: 'MenuCtrl'
                })
              }
            });
        }

        $urlRouterProvider.otherwise('/home');
      }
    ]);
  app.constant('pages', pages);
  app.constant('$utils', {
    log: function () {
      if (console) {
        if (console.log) {
          var i = 0, len = arguments.length;
          for (i; i < len; i += 1) {
            console.log(arguments[i]);
          }
        }
      } 
    }
  });
  app.service('Site', ['$utils', function Site($utils) {
      var selected = 'home';
      return {
        getPages: function () {
          return pages;
        },
        setActive: function (page) {
          $utils.log('Active page', page);
          selected = page;
        },
        getActive: function () {
          return selected;
        }
      };
    }
  ]);
  angularAMD.bootstrap(app);
  return app;
});