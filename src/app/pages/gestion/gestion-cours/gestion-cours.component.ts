import { ELearningService } from './../../../services/e-learning.service';
import { Cours } from './../../../models/cours';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as jwtDecode from 'jwt-decode'
import { TranslateService } from '@ngx-translate/core';
import { DefaultGlobalConfig } from 'ngx-toastr';
@Component({
  selector: 'app-gestion-cours',
  templateUrl: './gestion-cours.component.html',
  styleUrls: ['./gestion-cours.component.css']
})
export class GestionCoursComponent implements OnInit {
myCources:Cours[];


teacher_id

p
c
categories
  constructor(private learning:ELearningService,  public translate:TranslateService) { }

  ngOnInit(): void {

   this.teacher_id= jwtDecode(JSON.parse(localStorage.getItem('token')))._id
   this.getCoursByTeacherId()

//this.getParticipantByUserId()
// this.learning.getContentByCourId(this.p.course_id).subscribe((data)=>{

//   this.c=data 
//   console.log("c",this.c);
  
// })

this.learning.getAllCategory().subscribe((data) => {
  this.categories = data
  console.log("categ",data);
  
})
  }

removeMyCours(id){


  this.learning.deleteCours(id).subscribe((data)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        
        this.getCoursByTeacherId();
      }
  
    else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  })


}

getCoursByTeacherId(){

  this.learning.getCoursByTeacherId(this.teacher_id).subscribe((data:any)=>{
    this.myCources=data;
    console.log("my",data);
    
  })
}

// getParticipantByUserId(){
//   this.learning.getParticipantByUserId(this.teacher_id).subscribe((data)=>{

//     this.p=data
//     console.log("p",this.p);
    
//   })
// }



}
