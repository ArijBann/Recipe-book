import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { StartComponent } from './start/start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './authentication/auth/auth.component';


const appRoutes :Routes=[
  {path:'',redirectTo:'/recipes',pathMatch:'full'},
  {path:'recipes',component:RecipesComponent, children:[
    {path:'',component:StartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent, resolve:[RecipeResolverService]},
    {path:':id/edit',component:RecipeEditComponent, resolve:[RecipeResolverService]},
  ]},
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'auth',component:AuthComponent}
 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports:[RouterModule],
})
export class AppRoutingModule { }
