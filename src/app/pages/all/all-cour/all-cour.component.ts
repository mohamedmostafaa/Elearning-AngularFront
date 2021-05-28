import { Component, OnInit } from '@angular/core';
import { ELearningService } from 'src/app/services/e-learning.service';

@Component({
  selector: 'app-all-cour',
  templateUrl: './all-cour.component.html',
  styleUrls: ['./all-cour.component.css']
})
export class AllCourComponent implements OnInit {
  cours
  imagePath='http://localhost:3000/'
  payee:boolean
  courpayee=[]
  gratuit:boolean
  courgratuit=[]
  constructor(private learning:ELearningService,) { 
    
  }

  ngOnInit(): void {
    this.learning.getAllCours().subscribe((data :any)=>{
      this.cours=data
      console.log("courPayee",this.courpayee);

      
    
     
      
    })
    // if(this.gratuit){
    //   //this.Cgratuit(this.gratuit)
    //   this.learning.searchCoursGratuit().subscribe((data:any)=>{
    //   this.cours=data

    // })
    //  }
    //  else if(this.payee){
    //  // this.Cpayee(this.payee)
    //  this.learning.searchCoursPayee().subscribe((data:any)=>{
    //   this.cours=data
    //  })
    //  }
   
   
  }



  Cpayee(value:boolean){

    this.payee = value;
    console.log("payee",value);
       
    this.learning.searchCoursPayee().subscribe((data:any)=>{
      this.cours=data
     })
    
}
 Cgratuit(value:boolean){
  this.gratuit = value;
  console.log("gratuit",value);
  this.learning.searchCoursGratuit().subscribe((data:any)=>{
    this.cours=data

  })

}
 
}
