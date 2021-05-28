import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SockService {

private socket ;


  constructor(private http:HttpClient,private config:ConfigService) {

    this.socket=io(config.baseURL)

   }

 
   receive(){
     return Observable.create((obs)=>{
      this.socket.on('lijeyminSERV',(objetreseive)=>{
        console.log("objetreseive",objetreseive);
        
        obs.next(objetreseive)
      })
      
     })
   }


   AfterrefrechLayout(id){
    this.socket.emit('refrecllayout',id)
      }
  


  sendMsg(body){
    this.socket.emit('msg',body)
 
    }
  createSock(body){
  this.sendMsg(body)

    return this.http.post(this.config.baseURL +'/createSock',body)
  }
  getAllSocks(u1,u2){

    
    return this.http.get(this.config.baseURL+'/getAllSocks/'+u1+'/'+u2)
  }
 
  //ana m3a chkoun 7kit w chkoun 7ki m3aya 
  getUsersSock(u1){
       
    return this.http.get(this.config.baseURL+'/getUsersSock/'+u1)
  }
 
  markAsSeenSock(u1,u2){
    return this.http.put(this.config.baseURL+'/markAsSeenSock/'+u1+'/'+u2,{})

  }
  useronline(){

    return this.http.get(this.config.baseURL+'/useronline')
  }
}

   

