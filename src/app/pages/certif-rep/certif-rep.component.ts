import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ELearningService } from 'src/app/services/e-learning.service';

import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-certif-rep',
  templateUrl: './certif-rep.component.html',
  styleUrls: ['./certif-rep.component.css']
})
export class CertifRepComponent implements OnInit {
  score
  idcour
  qcm
  cour
  constructor(private route:ActivatedRoute,
    private learning:ELearningService) { }

  ngOnInit(): void {

    this.idcour=this.route.snapshot.params['idcour'];
    this.score=this.route.snapshot.params['score'];
  
    this.learning.getQcmByCourseId(this.idcour).subscribe((data)=>{
      this.qcm=data
     
    })
  this.learning.getCoursById(this.idcour).subscribe((data)=>{
    this.cour=data
  })
  }


  ExportToPDF() {
    let qcm_id = document.getElementById('qcm');
    html2canvas(qcm_id).then((canvas)=>{
      console.log("canvas",canvas);
      
    let imgData=canvas.toDataURL('image/png')
    var doc =new jsPDF();
  
    var imageHight=canvas.height*208/canvas.width

    // doc.setFontSize(40);
    // doc.text("your testQCM ", 70, 90);
   doc.addImage(imgData,15,20,208,imageHight)
   doc.save("Qcm.pdf")

    })
  }

}
