import { AuthService } from './../../services/auth.service';
import { ELearningService } from 'src/app/services/e-learning.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
query
courSearch
userSearch
imagePath='http://localhost:3000/'
  constructor(private route:ActivatedRoute,private learning:ELearningService,
    private authSrv:AuthService) { }

 

  ngOnInit(): void {
    this.query=this.route.snapshot.params['query']
    this.learning.searchCours(this.query).subscribe((data)=>{
      this.courSearch=data
      console.log("courSearch",data);
    })
   
    this.authSrv.searchUser(this.query).subscribe((data)=>{
      this.userSearch=data
      console.log("userSearch",data);
    })
  }

}
