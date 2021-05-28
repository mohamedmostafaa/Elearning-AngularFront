import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
import { ELearningService } from 'src/app/services/e-learning.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  decodedToken=null;
  listNotif
  imagePath='http://localhost:3000/'
  constructor(private learning:ELearningService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }
    this.getAllNotifByUserId()
  }


 

  getAllNotifByUserId(){
this.learning.getAllNotifByUserId(this.decodedToken._id).subscribe((data)=>{

  this.listNotif=data
  console.log("listNotif",data);
 
  
})


  }

    markAsSeen(course_id){
this.learning.markAsSeen(this.decodedToken._id,course_id).subscribe((data)=>{
  this.router.navigate(['/cour-detail/'+course_id])

})



    }

}
