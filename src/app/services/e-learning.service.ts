import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class ELearningService {

  constructor(private http: HttpClient,private config:ConfigService) { }
 
  createCours(cour){

    return this.http.post(this.config.baseURL+'/createCours',cour)
  }
  updateCours(cour){

    return this.http.put(this.config.baseURL+'/updateCours',cour)
  }
  deleteCours(id){

    return this.http.delete(this.config.baseURL+'/deleteCours/'+id)
  }
  deleteSelectionCours(ids){
    return this.http.delete(this.config.baseURL+'/deleteCours',ids)
  }
  getAllCours(){
    return this.http.get(this.config.baseURL+'/getAllCours')
  }
  getTroisCours(){
    return this.http.get(this.config.baseURL+'/getTroisCours')
  }
  getCoursById(id){
    return this.http.get(this.config.baseURL+'/getCoursById/'+id)
  }
  getCoursByType(id){
    return this.http.get(this.config.baseURL+'/getCoursByType/'+id)
  }
  getCoursByCategory(id){
    return this.http.get(this.config.baseURL+'/getCoursByCategory/'+id)
  }
  searchCours(cours_name_search){
    return this.http.get(this.config.baseURL+'/searchCours/'+cours_name_search)
  }

  getAllCategory(){
    return this.http.get(this.config.baseURL+'/getAllCategory')
  }

  getAllCoursType(){
    return this.http.get(this.config.baseURL+'/getAllCoursType')
  }

  getAllFiliere(){
    return this.http.get(this.config.baseURL+'/getAllFiliere')
  }
  getAllSpeciality(){
    return this.http.get(this.config.baseURL+'/getAllSpeciality')
  }



  createParticipant(participant){
    return this.http.post(this.config.baseURL+'/createParticipant',participant)

  }
  updateParticipate(participant){
    return this.http.put(this.config.baseURL+'/updateParticipate',participant)

  }
  deleteParticipant(participant,course_id,user_id){
    return this.http.delete(this.config.baseURL+'/deleteParticipant/'+course_id+'/'+user_id)

  }
  getAllParticipantByCourseId(course_id){
    return this.http.get(this.config.baseURL+'/getAllParticipantByCourseId/'+course_id)

  }
  getParticipantByUserId(user_id){
    return this.http.get(this.config.baseURL+'/getParticipantByUserId/'+user_id)

  }


  createQuestion(question){
    return this.http.post(this.config.baseURL+'/createQuestion/',question)
  }
  createReponse(reponse){
    return this.http.post(this.config.baseURL+'/createReponse',reponse)
  }
  getQuestionByCourseId(course_id){
    return this.http.get(this.config.baseURL+'/getQuestionByCourseId/'+course_id)
  }
  vote(user_id,reponse_id){
    return this.http.put(this.config.baseURL+'/vote/' + user_id + '/' + reponse_id , {})
  }
  markAsValid(reponse_id){
    return this.http.put(this.config.baseURL+'/markAsValid/'+reponse_id,{})
  }

  uploadFile(file:FormData){
console.log("ffffff",file);

    return  this.http.post(this.config.baseURL+'/upload',file)
  }


  getContentByCourId(course_id){

    
    return  this.http.get(this.config.baseURL+'/getContentByCourId/'+course_id)
  }


  getCoursByTeacherId(teacher_id){
    return  this.http.get(this.config.baseURL+'/getCoursByTeacherId/'+teacher_id)
  }

 
  ///qcm
  getQcmByCourseId(course_id){
    return  this.http.get(this.config.baseURL+'/getQcmByCourseId/'+course_id)
  }
  startQcm(body){
    return  this.http.post(this.config.baseURL+'/startQcm',body)
  }
  hasPassedQcm(cours_id,user_id){
    return  this.http.get(this.config.baseURL+'/hasPassedQcm/'+cours_id+'/'+user_id)

  }
  createQcm(body){
    return  this.http.post(this.config.baseURL+'/createQcm',body)
  }



  getAllQuestion(){
    return this.http.get(this.config.baseURL+'/getAllQuestion')
  }




  deleteCom(id){
    return this.http.delete(this.config.baseURL+'/deleteCom/'+id)
  }
  deleteRep(id){
    return this.http.delete(this.config.baseURL+'/deleteRep/'+id)
  }
  EditCom(id,val){
let body={
_id:id,
question:val
   }
   return  this.http.put(this.config.baseURL+'/EditCom',body)


  }


  EditRep(id,val){
    let body={
    _id:id,
    reponse:val
       }
       return  this.http.put(this.config.baseURL+'/EditRep',body)
    
    
      }

  deleteContent(id){
    return this.http.delete(this.config.baseURL+'/deleteContent/'+id)
  }
  


  getVisiteByCoursId(id){
    return  this.http.get(this.config.baseURL+'/getVisiteByCoursId/'+id )


  }
  createVisite(body){

    return  this.http.post(this.config.baseURL+'/createVisite',body)
  }





  getIp(){
    return this.http.get('https://api.myip.com/')
  }






  getAllNotifByUserId(user_id){
    return  this.http.get(this.config.baseURL+'/getAllNotifByUserId/'+user_id )
  }
  markAsSeen(user_id,course_id){
    return  this.http.put(this.config.baseURL+'/markAsSeen/'+user_id+'/'+course_id,{} )
  }
 



    createFavoris(body){
      return  this.http.post(this.config.baseURL+'/createFavoris/',body)

    }
    deleteOneFavoris(user_id,course_id){
      return this.http.delete(
        this.config.baseURL+'/deleteOneFavoris/'+user_id+'/'+course_id)

    }
    deleteSelectionFavoris(user_id){
      return this.http.delete(this.config.baseURL+'/deleteSelectionFavoris/'+user_id)

      
    }
    getAllFavoris(){
      return this.http.get(this.config.baseURL+'/getAllFavoris')

    }

  

    createLike(body){
      return  this.http.post(this.config.baseURL+'/createLike',body)

    }
    deleteOneLike(user_id,question_id,reponse_id){
      return  this.http.delete(this.config.baseURL+'/deleteOneLike/'+user_id+'/'+question_id+'/'+reponse_id)

    }
    getAllLikes(){
      return this.http.get(this.config.baseURL+'/getAllLikes')

    }



    //serach cour gratuit cours payee
   searchCoursGratuit(){
    return this.http.get(this.config.baseURL+'/searchCoursGratuit')
   }
    searchCoursPayee(){
      return this.http.get(this.config.baseURL+'/searchCoursPayee')
    }
}
