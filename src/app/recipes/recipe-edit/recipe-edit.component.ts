import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  id: number
  editMode=false

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params) =>{
        this.id= +params['id'];
        this.editMode= params['id'] !=null
      }
    )
  }

}
