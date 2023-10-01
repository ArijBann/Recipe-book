import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private storageService: DataStorageService){}
  collapsed=true
 
  // sollution without routing idSol=rout1 
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  onSaveData(){
    this.storageService.StoreRecipes()
  }

  onFetchData(){
    this.storageService.fetchRecipes().subscribe()
  }
}
