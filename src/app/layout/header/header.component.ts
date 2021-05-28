import { ELearningService } from 'src/app/services/e-learning.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;
import * as jwtDecode from 'jwt-decode'
import { SockService } from 'src/app/services/sock.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  decodedToken=null;
  listNotif
  isAdmin=false;
  imagePath='http://localhost:3000/'
  idUser
  user
  constructor(private authSRV:AuthService,private route:ActivatedRoute,
    private router:Router,private learning:ELearningService,
    private Sock:SockService
    ) { }

  ngOnInit(): void {
  $('.ui.dropdown')
  .dropdown();

  if(localStorage.getItem('token')){
    this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    console.log(   this.decodedToken);
    
  }

  //hethi st7a9itha bech n3adi beha l id la akther la a9al 
  this.Sock.AfterrefrechLayout(this.decodedToken._id)

  this.getAllNotif()




  if(localStorage.getItem('token')){
    this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
  }
     this.idUser=this.decodedToken._id

     this.authSRV.getUserById(this.idUser).subscribe((data)=>{
      this.user=data
       
     })
}



signOut(){
  this.authSRV.logout()
  this.router.navigate(['/login'])
}



getAllNotif(){
	this.learning.getAllNotifByUserId(this.decodedToken._id).subscribe((data)=>{

		this.listNotif=data
		console.log("listNotif",data);
		
	},(error)=>{
    console.log("error",error);
    
  })
}


async search(query){
  console.log("route",this.router.url);
    
   await this.router.navigate(['/search/'+query])
  if(this.router.url.indexOf('/search')==0){
  location.reload()
  

  }


}


  }

 


