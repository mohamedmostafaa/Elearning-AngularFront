import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  decodedToken=null;
  id
  user
  constructor(private authSRV:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.id = jwtDecode(JSON.parse(localStorage.getItem('token')))._id
      this.authSRV.getUserById(  this.id).subscribe((data)=>{
        this.user=data
         
       })
    }
  }

}
