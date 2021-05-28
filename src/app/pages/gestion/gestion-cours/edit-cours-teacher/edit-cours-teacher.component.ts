import { AuthService } from './../../../../services/auth.service';
import { ELearningService } from './../../../../services/e-learning.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-edit-cours-teacher',
  templateUrl: './edit-cours-teacher.component.html',
  styleUrls: ['./edit-cours-teacher.component.css']
})
export class EditCoursTeacherComponent implements OnInit {
  imagePath='http://localhost:3000/'
  courTeacher_id
  courT
  t
  subtitle
p

img_cover
img_cover_name
video_cover_name
path_img
path_video
newLectureContent:any={}
newCoursContent :any={}
categories;
filieres;
coursTypes;
specialities;
coursContent
coursForm:FormGroup
constructor(private route:ActivatedRoute,private learning:ELearningService,  public translate:TranslateService,
    private authSrv:AuthService ,private fb:FormBuilder) { }

  ngOnInit() {
    $('#add-course-tab').steps({
     
    });
this.getData() 

    this.coursForm=this.fb.group({
      course_name:['',Validators.required],
      subtitle:['',Validators.required],
      description:'',
      type_id:[''],
      category_id:[''],
      filiere_id :[''],
      speciality_id :[''],
       price:[''],
      cover :{},
      content:{},
      coursContent:'',
      title:'',
      volume:'',
      duration:'',
      description2:'',
      title2:''
    
    
    })
    

    this.courTeacher_id=this.route.snapshot.params['id'];
    this.learning.getCoursById(this.courTeacher_id).subscribe((data:any)=>{

      this.courT=data;
      this.subtitle=data.subtitle
      this.p=data.price
      console.log("s",this.subtitle);
      console.log("p",this.p);
      this.t=data.course_name
      console.log("courT",this.courT);
      
     
      
    })

  }


  getData() {
    this.learning.getAllCategory().subscribe((data) => {
      this.categories = data
    })
    this.learning.getAllCoursType().subscribe((data) => {
      this.coursTypes = data
    })
    this.learning.getAllSpeciality().subscribe((data) => {
      this.specialities = data
    })
    this.learning.getAllFiliere().subscribe((data) => {
      this.filieres = data
    })
  }


  uploadFile(event,type){
    let formData = new FormData()
    let file = event.target.files
    if(file && file[0]){
     formData.append("uploads[]",file[0],file[0].name)
     this.learning.uploadFile(formData).subscribe((data:any)=>{
    if(type=='coverFile'){
 
 
     this.coursForm.get('cover').setValue(data)
     console.log("data",data);
     
     this. img_cover_name=data.originalFilename
     this.path_img=data.path
 
   
    }else if(type=='videoFile'){
 
     this.coursForm.get('content').setValue(data)
     this. video_cover_name=data.originalFilename
     this.path_video=data.path
 
    }else{
      
   this.newLectureContent.file=data
    }
 
     })
 
 
    }
 
 
 
 
    }
 



  signePrice(element){
    console.log(element);
if(element <0)
this.coursForm.get('price').setValue(0)
  }


  titleLength_120(){
    return 120- this.coursForm.value.subtitle.length
    
    }
  
  titleLength_60(){
  return 60- this.coursForm.value.course_name.length
  
  }

  addCours(){
  


}
deleteContent(c){

}
editContent(){
  
}
saveLecture()
{



}
saveContent(){

}
}