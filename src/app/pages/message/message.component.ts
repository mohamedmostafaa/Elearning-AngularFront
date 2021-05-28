import { AuthService } from './../../services/auth.service';
import { SockService } from './../../services/sock.service';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  decodedToken //bech njib bih role ,esq ensig ou user
  imagePath = 'http://localhost:3000/'
  tab //2*1 : jib l user :ken ensig y7eb ye7ki jiblou l user si nn l3akes
  selectedUser//hetha li ana bech na7ki m3eh 

  descU1U2 //fiha desc bini w bin icha5es le3mltlou click
  msg

  tabDrdes = []
  tabUserOnline:any[]
  constructor(private sockSrv: SockService, private authSrv: AuthService) { }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))
      console.log(this.decodedToken);
    }
    this.getAllUser()

    //socket partie 2--synchronistaion ! //msg min socket
    this.sockSrv.receive().subscribe((data) => {
      let d = data;
      console.log("data", data);
     
      console.log(d.send_id);

      if (this.selectedUser && this.selectedUser._id == data.send_id) {

        this.descU1U2.push(data)
        console.log("got it")
      }
this.getAllUser()
      

    })
    
    this.useronline()
  }


  getAllUser() {

    this.authSrv.getAllUser().subscribe((data: any) => {
      console.log("dataMsg", data);


      if (this.decodedToken.role == 'enseignant') {

        this.tab = data.filter(x => x.role == 'user')
        console.log("tab", this.tab);
        this.getUsersSock()

      } else {
        this.tab = data.filter(x => x.role == 'enseignant')
        console.log("tab", this.tab);
        this.getUsersSock()
      }


    })




  }



  //bech te5ter l3eb libech tchouf desc binetkom
  openMsg(u,index?) {
    this.useronline()
    //ta5eth l user li inti 5tertou w m3adih mil html bil function click w bihou kif 
    //te3mel open tnejem tjib l info liteb3in l yuser
    this.selectedUser = u
    console.log("selectedUser", this.selectedUser);
    //tawa njib descssion bini w binou : 
    //(binou,bini) lihoma (user1,user2)fil partoe back,tertib mayhemch 5ater 3amlin OR
    this.sockSrv.getAllSocks(this.selectedUser._id, this.decodedToken._id)
      .subscribe
      ((data) => {
        this.descU1U2 = data
        console.log("descU1U2", data);

      })
      if(index >= 0){
        this.tabDrdes[index].isSeen=true
        this.tabDrdes[index].nbrmsg=0
        this.sockSrv.markAsSeenSock(this.decodedToken._id,this.selectedUser._id)
        .subscribe((data)=>{

        })
      }

  }

  sendmsg() {
    if (this.msg != '') {
      let body = {
        send_id: this.decodedToken._id,
        rec_id: this.selectedUser._id,
        msg: this.msg
      }

      this.sockSrv.createSock(body).subscribe((data) => {
        this.descU1U2.push(data) //zid l msg jdid lil descU1U2

        this.msg = ''

      })
    }

  }



  getUsersSock() {
console.log("sockkk");

    this.sockSrv.getUsersSock(this.decodedToken._id).subscribe((data: any[]) => {
      console.log("dataUserSock", data);

      data.map((elem) => {

        let rec_send_id

        if (this.decodedToken._id == elem.send_id._id) {
          rec_send_id = elem.rec_id
        } else {
          rec_send_id = elem.send_id
        }

        let y = this.tabDrdes.find(x => x.user_id._id == rec_send_id._id)
        if (y) {
          if (new Date(elem.createdOn) > new Date(y.createdOn)) {
            let i = this.tabDrdes.findIndex(x => x.user_id._id == rec_send_id._id)

            this.tabDrdes[i].createdOn = new Date(elem.createdOn)
            this.tabDrdes[i].msg = elem.msg

if(this.decodedToken._id==elem.rec_id._id){
  this.tabDrdes[i].isSeen = elem.isSeen
  if(!elem.isSeen){

    this.tabDrdes[i].nbrmsg = this.tabDrdes[i].nbrmsg + 1
  }
}
         
          }


        } else {
          this.tabDrdes.push({ 
            user_id: rec_send_id,
            msg:elem.msg,
            createdOn: new Date(elem.createdOn),
            isSeen:this.decodedToken._id==elem.rec_id._id ? elem.isSeen : true,
             nbrmsg:this.decodedToken._id==elem.rec_id._id && !elem.isSeen?1:0})
        }

     


      })
      this.tabDrdes = this.tabDrdes.sort((a, b) => b.createdOn > a.createdOn ? 0 : -1)
      console.log("tabDrdesSorted", this.tabDrdes);
//indexof te5dem ken 3al chaine de caractere...
      let id_userli7kitm3ahomCaractrer =this.tabDrdes.map(x=>{
        return  x.user_id._id
      }
      
      )
      
      this.tab = this.tab.filter(x => id_userli7kitm3ahomCaractrer.indexOf(x._id) == -1)

    })
  }
  useronline(){
    this.sockSrv.useronline().subscribe((data:any[])=>{
    this.tabUserOnline=data
    console.log( "tabUserOnline",this.tabUserOnline);
    

    })

  }

  isOnline(id){
if(this.tabUserOnline.find(x=>x._id==id)){
  return true
}
else {
  return false
}

  }
}
