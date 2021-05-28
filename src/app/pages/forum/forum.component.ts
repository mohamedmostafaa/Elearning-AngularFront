import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ELearningService } from './../../services/e-learning.service';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
declare var $:any;
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  listQuestion
  decodedToken;
  newQuestion=''
  showRep
  showEdit
  imagePath="http://localhost:3000/"
  allUsers
  allLikes
  user
  constructor( private learning:ELearningService,
    private authSrv:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.getAllQuestion()
    this.getAllLikes()
    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }
    this.getAllUsers()
   
  
      

       this.authSrv.getUserById( this.decodedToken._id).subscribe((data)=>{
        this.user=data
         
       })
    
  }

  getAllQuestion(){

    this.learning.getAllQuestion().subscribe((data)=>{
      this.listQuestion=data;
      console.log("listQ: ", this.listQuestion);
    },
      (err)=>{
     console.log("error:",err);
        
      })
     
  
      
  }
  createQuestion(){
  let body ={
    user_id:this.decodedToken._id,
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
      reponse:reponse,}
    this.learning.createReponse(body).subscribe((data)=>{
    $('#viderRep').val('');
      this.getAllQuestion();
      console.log('okkkkk');
      this.showRep=undefined
    
    })
  }
  Hide(id) {
    var x = document.getElementById("viderRep"+id);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  

  showReply(i){
    this.showRep=i;
  }

 DeleteCom(id){

  this.learning.deleteCom(id).subscribe((data)=>{  
    this.getAllQuestion()
  this.router.navigate(['/forum'])
  })

 }
 DeleteRep(id){

  this.learning.deleteRep(id).subscribe((data)=>{  
    this.getAllQuestion()
 
  })

 }
 EditCom(id,val){

  this.learning.EditCom(id,val).subscribe((data)=>{
    this.getAllQuestion()
    
  })
  this.showEdit=undefined


 }
 showCom(index){
   this.showEdit=index
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


createLike(user_id,question_id,reponse_id){

  if(!this.allLikes.find(x=>x.user_id?._id==user_id && 
    (x.question_id && x.question_id._id==question_id
      ||x.reponse_id && x.reponse_id._id==reponse_id)
    
    )){
    let body={
      user_id: this.decodedToken._id,
      question_id:question_id ,
      reponse_id:reponse_id
      }
  
    this.learning.createLike(body).subscribe((data)=>{
  this.getAllLikes()
    })
  }
  else {
    this.deleteOneLike(user_id,question_id,reponse_id)
  }

 
}
deleteOneLike(user_id,question_id,reponse_id){
this.learning.deleteOneLike(user_id,question_id,reponse_id).subscribe((data)=>{
console.log("dataDDD",data);
this.getAllLikes()

})
}

getAllLikes(){
  this.learning.getAllLikes().subscribe((data)=>{
    this.allLikes=data
console.log("allLikes",data);


  })
}

getLikesQ(question_id){
if(this.allLikes){
let z=this.allLikes.filter(x=> x.question_id && x.question_id._id==question_id).length
  if(z>0)
  return z

}


}
styleColorQ(question_id){
  
  if(this.allLikes && this.allLikes.find(x=>
    x.user_id?._id == this.decodedToken._id 
   && x.question_id && x.question_id._id==question_id)) {
     return 'red'
   }
 
 
 
 }

getLikesR(reponse_id){
if(this.allLikes)
  return this.allLikes.filter(x=> x.reponse_id && x.reponse_id._id==reponse_id).length
  

}
styleColor(reponse_id){
  
 if(this.allLikes && this.allLikes.find(x=>x.user_id?._id == this.decodedToken._id
  && x.reponse_id && x.reponse_id._id==reponse_id)) {
    return 'red'
  }



}




showReplyEdit

showEditRep(id){

this.showReplyEdit=id;


}

EditRep(id,val){
  this.learning.EditRep(id,val).subscribe((data)=>{
    this.showReplyEdit=undefined
    this.ngOnInit()
  })


}

}
