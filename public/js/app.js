'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.router'
]).
config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

  

  $urlRouterProvider.otherwise('/');

  $stateProvider.state("listings-home", {
    url: "/",
    views: {
      "content": {
        "templateUrl": "views/main.html",
        "controller": "AppCtrl"
      }
    }
  })

  $locationProvider.html5Mode(true);
})
.run(function($rootScope, $window, service){

  service.init();

  // console.log('at run');
  // console.log($rootScope.selectedRecipeNames);

});
