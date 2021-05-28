import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PFE';
  constructor(translate: TranslateService,private router:Router) {
    //par defo en 
    
    translate.setDefaultLang('en');

    
    translate.use('en');

    
     if(!localStorage.getItem('token')){
     router.navigate(['/login'])
     }
}
}
