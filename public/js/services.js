'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  factory("service", function($http, $rootScope, $window) {
    var ingredientToRecipe = {};

    function syncSelectedRecipeNameAndIngredients () {
      if (!($rootScope.selectedRecipeNames instanceof Array)) {
        $rootScope.selectedRecipeNames = [];
      }
      var tempI = [];
      var tempR = [];
      for (var r of $rootScope.allRecipe) {
        if (r.checked) {
          tempI = tempI.concat(r.ingredients);
          tempR.push(r.name);
        }
        //console.log(r);
      }
      tempI = (_.uniq(tempI)).sort();
      $rootScope.selectedIngredients = tempI;
      $rootScope.selectedRecipeNames = tempR;

      // console.log($rootScope);
      // console.log(JSON.stringify($rootScope.selectedRecipeNames));
      $window.localStorage.selectedRecipeNames = JSON.stringify($rootScope.selectedRecipeNames);
    }



  	return {

  		toggleRecipe: function(recipe) {
  			recipe.checked = !recipe.checked;

        syncSelectedRecipeNameAndIngredients();

  		},

  		getRecipesForIngredients: function(ingredients) {
  			var recipeNames = [];
  			for (var i in ingredients) {
  				if (ingredients[i]) {
  					recipeNames = recipeNames.concat(ingredientToRecipe[i]);
  				}
  			}
  			recipeNames = _.uniq(recipeNames);
  			// console.log(recipeNames);
  			
  			var recipes = [];
  			for (var i of recipeNames) {
  				recipes.push(_.find($rootScope.allRecipe, {"name":i}))
  			}
  			// console.log(recipes);
  			return recipes;
  		},

  		getAllPossibleIngredients: function(recipes) {
  			var arr = [];
  			for(var i of recipes) {
  				arr = arr.concat(i.ingredients);
  			}
  			var arr = (_.uniq(arr)).sort();

  			var obj = {}
  			for (var i in arr) {
  				obj[arr[i]] = true;
  			}
  			$rootScope.allPossibleIngredients = obj;

  			return obj;
  		},

      init: function() {

        $rootScope.allRecipe = [
            {
                "name": "Risotto",
                "type": "Italian",
                "cook_time": 60,
                "ingredients": ["Rice", "Chicken Stock", "Parmesan Cheese", "White Wine", "Butter", "Salt", "Pepper", "Peas"]
            },
            {
                "name": "Enchiladas",
                "type": "Mexican",
                "cook_time": 50,
                "ingredients": ["Tomato Sauce", "Tomato", "Corn Tortillas", "Cheddar Cheese", "Onion", "Olives", "Salt", "Chicken"]
            },
            {
                "name": "Hummus",
                "type": "Middle Eastern",
                "cook_time": 10,
                "ingredients": ["Garlic", "Chickpeas", "Salt", "Tahini", "Hot Sauce"]
            },
            {
                "name": "Pancakes",
                "type": "Breakfast",
                "cook_time": 25,
                "ingredients": ["Milk", "Flour", "Sugar", "Butter", "Baking Powder", "Baking Soda", "Egg", "Salt"]
            },
            {
                "name": "Borscht",
                "type": "Russian",
                "cook_time": 75,
                "ingredients": ["Water", "Potato", "Beets", "Butter", "Onion", "Salt", "Celery", "Carrot", "Cabbage", "Pepper", "Vinegar", "Tomato"]
            },
            {
                "name": "Pierogi",
                "type": "Polish",
                "cook_time": 105,
                "ingredients": ["Butter", "Onion", "Salt", "Pepper", "Potato", "Egg", "Flour", "Baking Powder"]
            },
            {
                "name": "Pupusa",
                "type": "Salvadoran",
                "cook_time": 40,
                "ingredients": ["Masa", "Water", "Queso Fresco"]
            },
            {
                "name": "Fried Rice",
                "type": "Chinese",
                "cook_time": 28,
                "ingredients": ["Onion", "Oil", "Rice", "Egg", "Soy Sauce", "Sesame Oil", "Chicken", "Carrot", "Peas"]
            }
        ];

        // this.ingredientToRecipe
        // private HashMap of Ingredient to recipe name
        ingredientToRecipe = {};
        for (var r of $rootScope.allRecipe) {
          for (var i of r["ingredients"]) {
            if (!(i in ingredientToRecipe)) {
              ingredientToRecipe[i] = [];
            }
            ingredientToRecipe[i].push(r.name);
          }
        }

        if ($window.localStorage.selectedRecipeNames === undefined) {
          $rootScope.selectedRecipeNames = [];
        } else {
          $rootScope.selectedRecipeNames = JSON.parse($window.localStorage.selectedRecipeNames);
        }
        if (!($rootScope.selectedRecipeNames instanceof Array)){
          $rootScope.selectedRecipeNames = [];
        }
        for (var rName of $rootScope.selectedRecipeNames) {
          var r = _.find($rootScope.allRecipe, {name: rName});
          r.checked = true;
        }

        syncSelectedRecipeNameAndIngredients();

      },
      

  	}
  });









