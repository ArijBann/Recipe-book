import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService {
   recipeChanges = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe('Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];

  recipes: Recipe[] = []; 
  constructor(private slService: ShoppingListService) {}

    setRecipes(recipes:Recipe[]){
      this.recipes=recipes;
      this.recipeChanges.next(this.recipes.slice());
    }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(i:number){
    return this.recipes[i]
  }
  getRecipeId(id:number){
    return this.recipes[id]
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getIngredients(recipe:Recipe){
    return recipe.ingredients;
  }

  setNewRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice())
  }

  updateRecipe(recipe:Recipe,index:number){
     this.recipes[index] = recipe;
     this.recipeChanges.next(this.recipes.slice())
  }
  deleteRecipe(id:number){
    this.recipes.splice(id,1) 
    this.recipeChanges.next(this.recipes.slice())
  }
}
