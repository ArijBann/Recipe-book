import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subs: Subscription
  constructor(private slService: ShoppingListService) { }
 ingredient:Ingredient
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subs= this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.subs.unsubscribe();
  }

  getIngredient(i: number){
    this.slService.startedIngredient.next(i)
  }
}
