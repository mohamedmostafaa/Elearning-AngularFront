import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  feedBack:FormGroup
  decodedToken=null;
  constructor(private fb :FormBuilder,private authService:AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {

    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
      console.log(   this.decodedToken);
      
    }
    this.feedBack=this.fb.group({
   email:[this.decodedToken.email,Validators.required],//3areft brou7ik lil admin fi ts mch lazem taffichih
   subject:["",Validators.required],
   context:""
    })
   
  }
  sendFeedBack(){

console.log("hello");

this.authService.feedBack(this.feedBack.value).subscribe((data)=>{
  console.log("data",data);
  this.toastr.success('feedback envoyé');
  


})



  }

  uploadFile(event){
    let formData = new FormData()
    let file = event.target.files
    console.log("file",file);
    
    if(file && file[0]){
     formData.append("uploads[]",file[0],file[0].name)
     console.log("file",file[0]);
     this.authService.uploadFile(formData).subscribe((data:any)=>{
    console.log("data",data);
   
      this.feedBack.get('capture').setValue(data)

       console.log("capture",data);
     
    })
  }
  }

}
