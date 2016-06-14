'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('recipeDir', function () {
    return {
    	restrict: 'E',
        templateUrl: 'views/listing.html',
        scope: {
            recipe: "=",
        },
        controller: function($scope, $rootScope, $state, service) {
        	//console.log($scope.recipe);

        	//$scope.recipe.checked = false;

        	$scope.check = function() {

        		service.toggleRecipe($scope.recipe);
        		
        	}
        }
    }
  });
