import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeBookShopingList';

  hiddenShopping = true;
  changeHidden(state : string){
    if (state == 'recipe') this.hiddenShopping = true;
    else this.hiddenShopping = false ;
  }
}
