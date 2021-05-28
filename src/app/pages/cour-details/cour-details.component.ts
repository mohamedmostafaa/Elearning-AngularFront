import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ELearningService } from './../../services/e-learning.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;
@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})
export class CourDetailsComponent implements OnInit {
id;
cour;
participant
isParticpant=false
decodedToken;
show_modal=false

listQuestion
newQuestion=''
nbrRaiting=0;

content=[]
imagePath='http://localhost:3000/'

views=0;
allUsers
allCours

payoutForm:FormGroup

favorisCours

isSubscribe: boolean
Tsub
  constructor(private learning : ELearningService,private route:ActivatedRoute,
    private toastr: ToastrService,private fb :FormBuilder,private router:Router,
    private authSrv:AuthService) { }

  ngOnInit(): void {
    
   
    
  
this.id=this.route.snapshot.params['id']
this.learning.getCoursById(this.id).subscribe((data)=>{
this.cour=data
console.log("cour",this.cour);

this.getAllUsers();
//this.getAllCours()
}) 

if(localStorage.getItem('token')){
  this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
}
//

//

this.learning.getAllParticipantByCourseId(this.id).subscribe((data)=>{
  this.participant=data;
  if(this.participant.find((p)=>p.user_id==this.decodedToken._id)){
    this.isParticpant=true;
  }
  

  // if(this.participant.filter((p)=>p.user_id==this.decodedToken._id).length>0){
  //   this.isParticpant=true;
  // }
  
})

this.payoutForm=this.fb.group({
  cartType:['',Validators.required],
  cartNumber:['',Validators.required]
})

this.getAllQuestion()
this.getContentByCourId()


//..........

this.learning.getIp().subscribe((data:any)=>{
if(data.ip){
  let body={
    user_id:this.decodedToken._id,
    course_id:this.id,
    ip_adress:data.ip  }
  this.learning.createVisite(body).subscribe((data)=>{
  
  })

}

})


this.learning.getVisiteByCoursId(this.id).subscribe((data:any)=>{
  this.views=data.length;
})



}

getAllQuestion(){

  this.learning.getQuestionByCourseId(this.id).subscribe((data)=>{
    this.listQuestion=data;
    console.log("listQ: ", this.listQuestion);
   
    
    
  })
}
createQuestion(){
let body ={
  user_id:this.decodedToken._id,
  course_id:this.id,
  question:this.newQuestion
}
this.learning.createQuestion(body).subscribe((data)=>{
  this.newQuestion='',
  this.getAllQuestion();
  console.log('okkkkk');
  

})

}
createReponse(question_id,reponse){
  let body ={
    user_id:this.decodedToken._id,
    question_id:question_id,
    reponse:reponse,
    isValid:false
  }
  this.learning.createReponse(body).subscribe((data)=>{
  $('#viderRep').val('');
    this.getAllQuestion();
    console.log('okkkkk');
    
  
  })
}
 
  

Raiting(nbr){
this.nbrRaiting=nbr;


}
Hide(id) {
  var x = document.getElementById("viderRep"+id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


createParticipant()
{
  let body={
    user_id:this.decodedToken._id,
    course_id:this.id
  }
  this.learning.createParticipant(body).subscribe((data)=>{

    this.toastr.success('added');
    this.isParticpant=true;
  })
}


payOut(){

  let body={
    user_id:this.decodedToken._id,
    course_id:this.id,
    cartType:this.payoutForm.value.cartType,
    cartNumber:this.payoutForm.value.cartNumber
    
  }
  this.learning.createParticipant(body).subscribe((data)=>{

    this.toastr.success('payout');
    this.isParticpant=true;
      this.hideModal()
  })

}
showModal()
{
this.show_modal=true
}
hideModal(){
  this.show_modal=false
  $('#exampleModal').modal('hide');
}

getContentByCourId(){
this.learning.getContentByCourId(this.id).subscribe((data:any)=>{
  this.content=data
  console.log("content",this.content);
  
})

}

somLecture() {
  let s=0;
this.content.map((cont)=>{
s+=cont.lectureContent.length
})
return s;
}

somDuration(){
let sd=0;
this.content.map((cont)=>{
sd+=cont.duration
})
return sd;
}



isValidRep(id){

  this.learning.markAsValid(id).subscribe((data)=>{
this.getAllQuestion();
    
  })
}





getAllUsers(){
  return this.authSrv.getAllUser().subscribe((data)=>{

    this.allUsers=data;

  })
}
getUser(id){
  if(this.allUsers)
  return this.allUsers.find((s)=>s._id==id)
  
  }

  


  createFavoris(){
    let body={
     
      user_id:this.decodedToken._id,
      course_id:this.id
    }
    this.learning.createFavoris(body).subscribe((data)=>{
     
      
      this.favorisCours=data
      console.log("favorisCours",data);
      //this.router.navigate(['/saved'])
      this.toastr.success('ajouté aux favoris');

    })
    


  }



  video
  mm(l){
   this.video = this.imagePath+ l.file?.path
  }

  createSubscribe() {

    let body = {
      student_id: this.decodedToken._id,
      teacher_id: this.cour.teacher_id._id
    }
    this.authSrv.createSubscribe(body).subscribe((data) => {
      this.getTeacherSub() 

    })
  }
  createUnSubscribe() {
    this.authSrv.createUnSubscribe(this.cour.teacher_id._id, this.decodedToken._id).subscribe((data) => {
      this.isSubscribe = false
      this.getTeacherSub() 
    })
  }

  getTeacherSub() {
    this.authSrv.getTeacherSub(this.cour.teacher_id._id).subscribe((data) => {
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
}
