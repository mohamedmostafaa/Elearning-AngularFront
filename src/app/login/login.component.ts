import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup

  errMsgConfirm
  errMsgEmail
  errMsgPwd
  submitted:boolean
  rember:boolean
  constructor(private formBuilder: FormBuilder,
     private router: Router,private authSrv:AuthService) {
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(1), Validators.required]],
        checkbox: ''
      })


      if(localStorage.getItem('email')){
        this.formLogin.get('email').setValue(localStorage.getItem('email'))
       
      }


   

  }
  login() {
    this.submitted = true;
    this.errMsgEmail=undefined;
    this.errMsgPwd=undefined;
    this.errMsgConfirm=undefined;

    if(this.rember){
      localStorage.setItem('email',this.formLogin.get('email').value)
     
      
    }

    if (this.formLogin.valid) {
    this.authSrv.login(this.formLogin.value).subscribe(
    (data)=>{
    console.log(data);
   
    localStorage.setItem('token', JSON.stringify(data))
    this.router.navigate(['/home'])
  },
  
  dataError=>{
    console.log(dataError);
    
 this.errMsgEmail=dataError.error.errEmail;
 this.errMsgPwd=dataError.error.errPwd;
this.errMsgConfirm=dataError.error.errConfirm
}
)

    } else
      this.formLogin.reset()


  }
  
  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }
}
