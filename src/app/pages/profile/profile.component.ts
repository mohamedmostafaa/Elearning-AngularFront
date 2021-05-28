import { ELearningService } from './../../services/e-learning.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_id
  user
  imagePath = 'http://localhost:3000/'
  nbrCours
  cour
  content
  decodedToken = null;

  Tsub
  isSubscribe: boolean
  constructor(private route: ActivatedRoute, private authSrv: AuthService,
    private learning: ELearningService) { 
      this.user_id = route.snapshot.params['user_id']

    }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }

    this.authSrv.getUserById(this.user_id).subscribe((data) => {
console.log("d",data);

      this.user = data;
      console.log("uuuu", this.user);

      if (this.user.role == 'enseignant') {
        this.getTeacherSub();

      } else {
        this.getStudentSub()
      }
      console.log("ooo", this.user);

    })
    this.learning.getCoursByTeacherId(this.user_id).subscribe((data: any) => {
      this.nbrCours = data.length;
      this.cour = data;
      console.log("cour", this.cour);

    })




  }

  createSubscribe() {

    let body = {
      student_id: this.decodedToken._id,
      teacher_id: this.user_id
    }
    this.authSrv.createSubscribe(body).subscribe((data) => {
      this.getTeacherSub()

    })
  }
  createUnSubscribe() {
    this.authSrv.createUnSubscribe(this.user_id, this.decodedToken._id).subscribe((data) => {
      this.getTeacherSub()

    })
  }
  getTeacherSub() {
    this.authSrv.getTeacherSub(this.user_id).subscribe((data) => {
      //chkoun le3bed li3amlilou sub 
      this.Tsub = data
      console.log("Tsab", data);

      if (this.Tsub.find(x => x.student_id._id == this.decodedToken._id)) {
        this.isSubscribe = true
      } else {
        this.isSubscribe = false
      }
    })
  }
  getStudentSub() {
    this.authSrv.getStudentSub(this.user_id).subscribe((data) => {

      this.Tsub = data
    })
  }

  openProfil(item) {
    if (this.user.role == 'enseignant') {
      this.user_id =item.student_id._id

    } else {
      this.user_id =item.teacher_id._id
    }
this.ngOnInit();
  }


}
