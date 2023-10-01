import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map,tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {

    constructor(private http:HttpClient,private recipeService :RecipeService){}

    StoreRecipes(){
       let recipes= this.recipeService.getRecipes();
       this.http.put('https://recipe-shopping-list-df741-default-rtdb.firebaseio.com/recipes.json',
       recipes).subscribe(
        data=>{
            console.log(data);
        }
       )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-shopping-list-df741-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(
            recipes=>{
                return recipes.map(recipe=>{
                    return{
                        ...recipe,
                        ingredients:recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }),
            tap(recipe=>{
                this.recipeService.setRecipes(recipe)
            }
        ))
    }
}