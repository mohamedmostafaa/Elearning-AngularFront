import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ELearningService } from '../services/e-learning.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//declaration des variables sont toujours au dessus de constructeur
formEtudiant:FormGroup
formEnseignant:FormGroup


//on definit les services
  constructor(private formbuilder:FormBuilder,private authService:AuthService,
    private router:Router, private learning:ELearningService
    ) {
  
   }

  ngOnInit(): void {

this.formEtudiant=this.formbuilder.group(
{
  firstname:['',Validators.required],
  lastname:["",Validators.required],
  email:["",Validators.email],
  password:["",Validators.required],
  c_password:["",Validators.required],
  photo:{},
  docVerif:{}
 
 
 
}
)
this.formEnseignant=this.formbuilder.group(
  {
    firstname:"",
    lastname:"",
    email:["",Validators.email],
    password:["",Validators.required],
    c_password:"",
   
    category:"",
    photo:{},
    docVerif:{}
   
  }
  )
 


}

//au dessous de ngOnEnit on declare les evenement () 
signUpEtudiant(){
  let student:User = this.formEtudiant.value;
  student.role = 'user'

  console.log('user',this.formEtudiant.value);
 
    this.authService
      .register(student)
      .subscribe(data =>
        {
          console.log(data);
             this.router.navigate(['/login'])
          
        });

}
signUpEnseignant(){
  let enseignant:User = this.formEnseignant.value;
  enseignant.role = 'enseignant'
  console.log('Enseignant',this.formEnseignant.value);
  
  this.authService.register(enseignant).subscribe(data =>
      { 
        console.log(data);
        this.router.navigate(['/login'])
        
      });

}


uploadFile(event,type){
  let formData = new FormData()
  let file = event.target.files
  console.log("file",file);
  
  if(file && file[0]){
   formData.append("uploads[]",file[0],file[0].name)
   console.log("file",file[0]);
   this.authService.uploadFile(formData).subscribe((data:any)=>{
  console.log("data",data);
  if(type=='photoEtudiant'){
    this.formEtudiant.get('photo').setValue(data)

  }else if(type=='photoEnseignant'){
    this.formEnseignant.get('photo').setValue(data)
  }
  else if(type=='cin'){
    this.formEnseignant.get('docVerif').setValue(data)
  }
  else if(type=='carteEtudiant'){
    this.formEtudiant.get('docVerif').setValue(data)
  }
   
   
 
   console.log("photo",data);
   
  })
}
}



}