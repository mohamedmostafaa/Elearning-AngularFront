import Swal from 'sweetalert2';
import { ELearningService } from './../../services/e-learning.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode'
@Component({
  selector: 'app-certification-test',
  templateUrl: './certification-test.component.html',
  styleUrls: ['./certification-test.component.css']
})
export class CertificationTestComponent implements OnInit {
  // @ViewChild('timer')
  // timer: ElementRef;

  id;
  qcm
  score=0;

  tabRep=[]
  decodedToken;
  constructor( private route:ActivatedRoute,
    private learning:ELearningService,
private router:Router    ) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }
    this.learning.hasPassedQcm(this.id,this.decodedToken._id).subscribe((data:any)=>{
      console.log("data",data);
      
      if(data){
        
        this.router.navigate(['/certifRep',data.score,this.id])
        
      }
    })
    this.learning.getQcmByCourseId(this.id).subscribe((data)=>{
      this.qcm=data
     
    })
   



    
    document.getElementById('timer').innerHTML =60 + ":" + 0;
    startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  let timeArray:any = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
  }



  Rep(val,id,reponce){
    console.log(val);

    let item={
      question_id:id,
      reponce:val==reponce.isValid
    }
    if(this.tabRep.find( (s) => s.question_id==id)){

      let tabRepMap= this.tabRep.map((elem)=> {
        return elem.question_id
      })
      this.tabRep[tabRepMap.indexOf(id)]=item
    }
    else{
      this.tabRep.push(item)
    }
    console.log("tabRep",this.tabRep);
   
    


  }
  saveQCM(){
  this.score =0 ;
 this.tabRep.map((elem)=>{
   if(elem.reponce==true)
   this.score++;
 })


 let body={
user_id:this.decodedToken._id,
course_id:this.id,
score: this.score +'/'+this.qcm.length

 }
 this.learning.startQcm(body).subscribe((data)=>{
   Swal.fire('qcmDone','you got'+body.score , 'success')
   this.router.navigate(['/cour-detail',this.id])
 })
  }

}
