import Swal from 'sweetalert2';
import { ELearningService } from './../../../services/e-learning.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-qcm',
  templateUrl: './add-qcm.component.html',
  styleUrls: ['./add-qcm.component.css']
})
export class AddQcmComponent implements OnInit {
     title
     course_id
  constructor(private learning:ELearningService,
    private route:ActivatedRoute,
    private router:Router) { }

  reponses : any[] = []
  ngOnInit(): void {
    this.reponses.push({reponse : '' , isValid : false})
    this.reponses.push({reponse : '' , isValid : false})
    this.reponses.push({reponse : '' , isValid : false})
    this.reponses.push({reponse : '' , isValid : false})


    this.course_id=this.route.snapshot.params['id']
  }

  saveQcm()
{
  if(this.reponses.find((s)=>s.isValid==true)){
    let body={
      title:this.title,
    course_id :this.course_id,
    reponseqcm:this.reponses
    }
    this.learning.createQcm(body).subscribe((data)=>{
      console.log(data);
      
    })

  }
  else {
    Swal.fire('valid response required','','error')
  }

this.router.navigate(['/certification-test/'+ this.course_id])
}}
