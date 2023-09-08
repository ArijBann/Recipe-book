import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
 
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  @ViewChild('f') shoppingForm : NgForm
  subscription:Subscription
  editMode=false
  editedItemIndex:number
  editIngredient : Ingredient
  addUpdateButton='Add'

  ngOnInit() {
  
    this.subscription=this.slService.startedIngredient.subscribe(
      (index:number)=>{

        this.editMode=true;
        this.editedItemIndex=index
        this.editIngredient=this.slService.getIngredient(index)
        this.shoppingForm.setValue(
          {
            name:this.editIngredient.name,
            amount:this.editIngredient.amount
          }
        )
        
      } 
      
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
  onAddItem(form : NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.slService.addIngredient(newIngredient);
  
    const value = form.value    
    const newIngredient = new Ingredient(value.name, value.amount);
    this.editMode ? this.slService.UpdateIngredient(this.editedItemIndex,newIngredient) : this.slService.addIngredient(newIngredient);
   
    this.editMode=false
    form.reset();
  }

  onClearForm(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClearForm()
    this.slService.DeleteIngredient(this.editedItemIndex)
  }

}
