'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $rootScope, $http, service) {

    $scope.recipeList = $rootScope.allRecipe;
    
    $scope.allIngredients = service.getAllPossibleIngredients($scope.allRecipe);

    //console.log($scope.allIngredients);

    $scope.filterChange = function(){
      console.log('filterChange');
      console.log($scope.allIngredients);
      $scope.recipeList = service.getRecipesForIngredients($scope.allIngredients);
    }

    $scope.selectAllIngredients = function(bool) {
      for (var i in $scope.allIngredients) {
        if (bool) {
          $scope.allIngredients[i] = true;
        } else {
          $scope.allIngredients[i] = false;
        }
      }
      $scope.recipeList = service.getRecipesForIngredients($scope.allIngredients);
    }

  });
