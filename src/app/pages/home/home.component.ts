import { AuthService } from './../../services/auth.service';
import { ELearningService } from './../../services/e-learning.service';
import { Component, OnInit } from '@angular/core';
 declare var $ : any;
 import * as jwtDecode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cours
 imagePath='http://localhost:3000/'
 decodedToken=null;
user
nbrCours
teacher_id

allEnseignant
favorisCours

tabFav=[]
content
idscour
  constructor(private learning:ELearningService,
    private authSRV:AuthService,
     private toastr: ToastrService) { 

     }


  
  ngOnInit(): void {
  this.reparationJs()
    //pour afficher ken ensignant 
  //   this.authSRV.getAllUser().subscribe((data:any)=>{
  //   console.log("allUsers",data);
  //   this.allEnseignant=
    
  //   data.filter(x=>x.role=='enseignant')
  //   console.log("allEnseignant",this.allEnseignant);
    
  // })

  this.authSRV.get3Enseignant().subscribe((data)=>{
    this.allEnseignant=data
  })

  this.learning.getTroisCours().subscribe((data:any)=>{
    this.cours=data
    console.log("courshome",data);
    
    // this.idscour=data.map( x=>{return x._id } )
    // console.log("couuuuur",this.cours);
    // this.getContentByCourId(this.idscour[2])
  })


  if(localStorage.getItem('token')){
    this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
  console.log(this.decodedToken);
 
  
  }
if( this.decodedToken.role=='enseignant')
{
  this.teacher_id= jwtDecode(JSON.parse(localStorage.getItem('token')))._id
  this.authSRV.getUserById(this.teacher_id).subscribe((data)=>{
    this.user=data
    console.log("user",this.user);
    
  })

  this.learning.getCoursByTeacherId(this.teacher_id).subscribe((data:any)=>{
  this.nbrCours=data.length;})
}else {
  this.authSRV.getUserById(this.decodedToken._id).subscribe((data)=>{
    this.user=data
    console.log("user",this.user);
  })
}


  




  
  }


  createFavoris(cour_id){
    let body={
     
      user_id:this.decodedToken._id,
      course_id:cour_id
    }
    this.learning.createFavoris(body).subscribe((data:any)=>{
    
      console.log("favoris",data);
      
      this.favorisCours=data
      if(data.msg){
        this.toastr.warning(` ${data.msg}`,'',
        {
          timeOut: 3500,progressBar:true,progressAnimation:'increasing',
          positionClass:'toast-top-right'
        }
        )
      }else {
        this.toastr.success(`  au liste de Favouris :`,'cour ajouté avec succes',
        {
          timeOut: 3500,progressBar:true,progressAnimation:'increasing',
          positionClass:'toast-top-right'
        }
        )
      }
     
    
      ///this.router.navigate(['/saved'])
    })
    


  }





  // getContentByCourId(x){
  //   this.learning.getContentByCourId(x).subscribe((data)=>{
  //     this.content=data
  //     console.log("content",this.content);
      
  //   })
    
  //   }


reparationJs(){
  $('.live_stream').owlCarousel({
    items:10,
    loop:false,
    margin:10,
    nav:true,
    dots:false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive:{
      0:{
        items:2
      },
      600:{
        items:3
      },
      1000:{
        items:3
      },
      1200:{
        items:5
      },
      1400:{
        items:6
      }
    }
  })
  
  // Featured Courses home
  $('.featured_courses').owlCarousel({
    items:10,
    loop:false,
    margin:20,
    nav:true,
    dots:false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:1
      },
      1200:{
        items:2
      },
      1400:{
        items:3
      }
    }
  })
  
  // Featured Courses home
  $('.top_instrutors').owlCarousel({
    items:10,
    loop:false,
    margin:20,
    nav:true,
    dots:false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:1
      },
      1200:{
        items:2
      },
      1400:{
        items:3
      }
    }
  })
  
  // Student Says
  $('.Student_says').owlCarousel({
    items:10,
    loop:false,
    margin:30,
    nav:true,
    dots:false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:2
      },
      1200:{
        items:3
      },
      1400:{
        items:3
      }
    }
  })
  
  // features Careers
  $('.feature_careers').owlCarousel({
    items:4,
    loop:false,
    margin:20,
    nav:true,
    dots:false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive:{
      0:{
        items:1
      },
      600:{
        items:1
      },
      1000:{
        items:1
      },
      1200:{
        items:1
      },
      1400:{
        items:1
      }
    }
  })
}





}
