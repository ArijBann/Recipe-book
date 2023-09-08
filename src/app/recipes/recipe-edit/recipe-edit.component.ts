import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route : ActivatedRoute,private recipeService:RecipeService,private router : Router) { }

  id: number
  editMode=false
  submitForm : FormGroup
 

  ngOnInit(): void {
    
    this.route.params
    .subscribe(
      (params:Params) =>{
        this.id= +params['id'];
        this.editMode= params['id'] !=null;
        this.initForm()
      }
      
    )
  }

  get controls() {
    return (this.submitForm.get('ingredients') as FormArray).controls;
  }

  private initForm(){
    
    let recipeName=""
    let recipeImage = ""
    let recipeDescription =""
    let recipeIngredients= new FormArray([]) 

    if (this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description
      recipeImage = recipe.imagePath
      
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
              new FormGroup ({
                'name': new FormControl(ingredient.name,Validators.required),
                'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
          )
        }
      }
    }
    



    this.submitForm= new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imageUrl' : new FormControl(recipeImage,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients,
    })
  }

  AddIngredient(){
    const ingredient = new FormGroup({
      'name': new FormControl(null,Validators.required),
       'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.submitForm.get('ingredients')).push(ingredient) 
  }

  onSubmitForm(){
    const newRecipe=new Recipe(this.submitForm.value.name,
                          this.submitForm.value.description,
                          this.submitForm.value.imageUrl,
                          this.submitForm.value.ingredients);
    if(!this.editMode){
     this.cancel()
      this.recipeService.setNewRecipe(newRecipe)

    }
    else {
      this.cancel()
      this.recipeService.updateRecipe(newRecipe,this.id)

    }
    console.log(this.submitForm)
  }

  cancel(){
    this.router.navigate(['recipes'])
  }

  deleteIngredient(index:number){
    (<FormArray>this.submitForm.get('ingredients')).removeAt(index) 
  }
}
