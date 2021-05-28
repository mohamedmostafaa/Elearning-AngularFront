import { ELearningService } from 'src/app/services/e-learning.service';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-saved-courses',
  templateUrl: './saved-courses.component.html',
  styleUrls: ['./saved-courses.component.css']
})
export class SavedCoursesComponent implements OnInit {
  decodedToken
  
  imagePath='http://localhost:3000/'
  tabFavoris
  constructor(private learning:ELearningService) { }
  
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }
  this.getAllFavoris()

}


  getAllFavoris(){
  this.learning.getAllFavoris().subscribe((data:any)=>{
    this.tabFavoris=data.filter(x=> x.user_id && x.user_id._id==this.decodedToken._id)
    console.log("tabFavoris",data);
    
    
  })

  }

 
  deleteOneFavoris(user_id,course_id){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'ce cour va etre supprimé definitivement !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        console.log(result.value);
        
 
    
    this.learning.deleteOneFavoris(user_id,course_id).subscribe((data)=>{
      Swal.fire(
        "Supprimer!",
        "Le cour  a été supprimé",
        "success"
      );
      this.getAllFavoris()
      ,
        
      (err) => {
        console.log(err);
      }
    })
    
  } else if (result.dismiss === Swal.DismissReason.cancel) {
         
  }
})


  }

  deleteSelectionFavoris(){
    //   let mapedTabFavoris=[];
    //   let tab = this.tabFavoris.map(x=>{ return x._id})
    // this.tabFavoris.forEach((elm) => {
    // mapedTabFavoris.push({
    //     id: elm._id,
        
    //   });

      
    //});
    //console.log("mapedTabFavoris",mapedTabFavoris);

    Swal.fire({
      title: 'Are you sure?',
      text: 'Tout cours vont etre supprimées definitivement !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        console.log(result.value);
    
    this.learning.deleteSelectionFavoris(this.decodedToken._id).subscribe((data:any)=>{
      //this.tabFavoris=data.length;

      Swal.fire(
        "Supprimer!",
        "Les cours  ont été supprimé",
        "success"
      );
      this.getAllFavoris()
      ,
        
      (err) => {
        console.log(err);
      }
    })
    
  } else if (result.dismiss === Swal.DismissReason.cancel) {
         
  }
      
    })


    

    
  }
 



}
