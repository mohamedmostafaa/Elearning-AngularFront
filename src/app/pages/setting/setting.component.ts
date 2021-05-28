import { Router } from '@angular/router';
import { ELearningService } from './../../services/e-learning.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  decodedToken;
  idUser
  user

  constructor(private authSrv:AuthService,
    private learning:ELearningService,
    private router:Router) { }

  ngOnInit() {

    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }
       this.idUser=this.decodedToken._id

       this.authSrv.getUserById(this.idUser).subscribe((data)=>{
        this.user=data
         
       })
  }

  saveProfil(){
    console.log(this.user);

    this.authSrv.updateUser(this.user).subscribe((data)=>{
      console.log("ooooookkkkk ");
      this.router.navigate(['/profil/'+this.idUser])
      //location.reload();
     
      
    })

    
  }


  uploadFile(event){
    let formData = new FormData()
    let file = event.target.files
    if(file && file[0]){
     formData.append("uploads[]",file[0],file[0].name)
     this.learning.uploadFile(formData).subscribe((data)=>{
       this.user.photo=data;
   
 
     })
 
 
    }
 
 
 
 
    }
}
