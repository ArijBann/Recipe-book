import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    
    constructor(private storageService:DataStorageService,private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes=this.recipeService.getRecipes();
        if (recipes.length===0){
            return this.storageService.fetchRecipes();
        }
        else {
            return recipes
        }
       
    }
}
