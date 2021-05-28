import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  

  constructor(private http: HttpClient,private config:ConfigService) { }

  login(user) {
    this.isAuthenticated = true;
    return this.http.post(this.config.baseURL + '/login', user)
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.clear()
  }
  register(user){
    return this.http.post(this.config.baseURL+ '/signup',user)
  }

  updateUser(body){

    return this.http.put(this.config.baseURL+'/updateUser',body)
  }
  
  getUserById(id){

    return this.http.get(this.config.baseURL+'/getUserById/'+id)
  }
  getAllUser(){
    return this.http.get(this.config.baseURL+'/getAllUser')
  }
  getAllEnseignant(){
    return this.http.get(this.config.baseURL+'/getAllEnseignant') 
  }
  get3Enseignant(){
    return this.http.get(this.config.baseURL+'/get3Enseignant') 
  }
  
  uploadFile(file:FormData){
   
    
        return  this.http.post(this.config.baseURL+'/upload',file)
      }


  
    createSubscribe(body){

      return this.http.post(this.config.baseURL +'/createSubscribe',body)
    }
    createUnSubscribe(teacher_id,student_id){
      return this.http.delete(this.config.baseURL +'/createUnSubscribe/'+teacher_id+'/'+student_id )
    }
    getTeacherSub(teacher_id){
      return this.http.get(this.config.baseURL+'/getTeacherSub/'+teacher_id)
    }
    getStudentSub(student_id){
      return this.http.get(this.config.baseURL+'/getStudentSub/'+student_id)
    }

    searchUser(query){
      return this.http.get(this.config.baseURL+'/searchUser/'+query)

    }


    feedBack(body){
      return this.http.post(this.config.baseURL +'/feedBack',body)

    }
   
  }
