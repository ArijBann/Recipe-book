import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingListService {
  
  ingredientsChanged = new Subject<Ingredient[]>();
  startedIngredient=new Subject<number>();
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number):Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  UpdateIngredient(i:number,ingredient:Ingredient){
    this.ingredients[i]=ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  DeleteIngredient(i:number){
    this.ingredients.splice(i,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
