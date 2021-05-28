import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  allEnseignant=[]
  imagePath='http://localhost:3000/'

  filterAllEnseignant=[]
  constructor(private authSRV:AuthService) { }

  ngOnInit(): void {
    this.authSRV.getAllUser().subscribe((data:any)=>{
  this.filterAllEnseignant=this.allEnseignant=data.filter(x=>x.role=='enseignant')
    })
}


filter(query:string){

this.filterAllEnseignant= (query) ? this.allEnseignant.filter(
(enseignant)=>
enseignant.firstname.toLowerCase().includes(query.toLowerCase())):
this.allEnseignant
    
}

}