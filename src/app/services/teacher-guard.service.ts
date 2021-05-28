import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwtDecode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate{
  decodedToken=null;
  constructor() { 
    if(localStorage.getItem('token')){
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
    }
  }
 
  canActivate() {
    if(this.decodedToken.role=='enseignant') {
      
      return true;
    }
    return false ;
  }
  
}
