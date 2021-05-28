import { ELearningService } from './../../../services/e-learning.service';
import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-categories',
  templateUrl: './gestion-categories.component.html',
  styleUrls: ['./gestion-categories.component.css']
})
export class GestionCategoriesComponent implements OnInit {
categories

  constructor(private learning:ELearningService) { }

  ngOnInit(): void {
   this.learning.getAllCategory().subscribe((data)=>{
    this.categories=data
    console.log("this.categories",this.categories);
    });

 
  }
  save(){

  }
  delete(){

  }
  selection(){
    
  }

}
