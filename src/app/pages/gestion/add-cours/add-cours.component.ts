import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ELearningService } from './../../../services/e-learning.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as jwtDecode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  categories;
  filieres;
  coursTypes;
  specialities;
  imagePath='http://localhost:3000/'

  coursForm:FormGroup

  coursContent:any[]=[]
  newCoursContent :any={}
  newLectureContent:any={}
  img_cover
  img_cover_name
  video_cover_name
  path_img
  path_video

  constructor(private learning: ELearningService,
    public translate:TranslateService,
    private fb:FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    $('#add-course-tab').steps({
     
    });
    this.getData();


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

  addCours(){
    //test option=""
  let cours=this.coursForm.value;
  if(cours.category_id=="") cours.category_id=undefined
  if(cours.type_id=="") cours.type_id=undefined
  if(cours.speciality_id=="") cours.speciality_id=undefined
  if(cours.filiere_id=="") cours.filiere_id=undefined

  cours.coursContent=this.coursContent

  cours.teacher_id= jwtDecode(JSON.parse(localStorage.getItem('token')))._id
  this.learning.createCours(cours).subscribe((data)=>{
    console.log("courrrrr",cours);
    
    this.toastr.success('saved');

  })


}













titleLength_120(){
  return 120- this.coursForm.value.subtitle.length
  
  }

titleLength_60(){
return 60- this.coursForm.value.course_name.length

}
  signePrice(element){
    console.log(element);
if(element <0)
this.coursForm.get('price').setValue(0)
  }



  saveLecture()
  {

  if(!this.newCoursContent.lectureContent){
    this.newCoursContent.lectureContent=[]
    }
    if(!this.newCoursContent.volume){
      this.newCoursContent.volume=0
      }
      if(!this.newCoursContent.duration){
        this.newCoursContent.duration=0
    }

      this.newCoursContent.volume +=this.newLectureContent.volume
      this.newCoursContent.duration+=this.newLectureContent.duration;
 
this.newCoursContent.lectureContent.push(this.newLectureContent);
console.log("hhh",this.newCoursContent);
this.newLectureContent={}

   }

   saveContent(){
     this.coursContent.push(this.newCoursContent)
     this.newCoursContent={}
console.log("hhh2",this.coursContent);


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


getcourse_name(){

  return this.coursForm.get('ourse_name')
}




deleteContent(c){
  
    let index=   this.coursContent.indexOf(c)
    if(index!==-1){
      this.coursContent.splice(index,1)
    }
   
    console.log("contentBeforeDelete",this.coursContent);


}
editContent(){
  
}
}
