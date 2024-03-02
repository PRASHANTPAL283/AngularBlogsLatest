import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataservicesService } from 'src/app/dataservices.service';
import { MessageModel } from 'src/app/message-model';
import { MessageServicesService } from 'src/app/message-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.LastSeenUpdate.status="offline";
    this.LastSeenUpdate.userId=this.myid;
    this.service.lastseenupdateStatus(this.LastSeenUpdate);
    
  }
  
  ngOnInit(){
   
    let myuser:any=sessionStorage.getItem("user");
    myuser=JSON.parse(myuser);
    this.myuser=myuser;
    this.myid=myuser.userId;
   
    setTimeout(()=>{
      this.LastSeenUpdate.status="online";
      this.LastSeenUpdate.userId=this.myid;
      this.service.lastseenupdateStatus(this.LastSeenUpdate);
    },200)

    setTimeout(()=>{
      this.getallusers();
    },250)

    setTimeout(()=>{
      this.service.subscribetolastseenupadte().subscribe((greetings:any)=>{
        console.log("the data is="+JSON.parse(greetings))
       let p:any=JSON.parse(greetings);
       console.log("the my username is="+p.username)
       this.allusers.forEach((val:any)=>{
        if(val.username===p.username){
          val.status=p.status
        }
       })
       
      })

    },600)
    
    
   }
  constructor(public service:MessageServicesService, public dataservice:DataservicesService, public toast:ToastrService){

  }
  apiUrl=environment.apiUrl;
  message:any;
  chatroomid:any;
  
  allmessages:any=[];
  allusers:any=[];
  chatUserselected:any;
  myid:any;
  myuser:any;
  @ViewChild("message") mess:ElementRef|any;

  selectChatUser(user:any){
    if(user.username!==this.chatUserselected?.username){
      this.chatUserselected=user;
      this.chatroomid=user.userId+this.myid;
     this.getallmessagefrodb();
     
    setTimeout(()=>{
          this.service.subscribeToGreetings(this.chatroomid).subscribe((greetings:any)=>{
            console.log("the data is="+JSON.parse(greetings))
           this.allmessages.push(JSON.parse(greetings))
           
          })
        },1000)
    }
    else{

    }

   

   
    
   }
   sendthemessage(){
    console.log(this.mess.nativeElement.value)
  let message:MessageModel={
     messageId: undefined,
     description: undefined,
     sender: undefined,
     receiver: undefined,
     date: undefined
   }
   let receivedMessage:any=null;
   message.sender=this.myuser.username;
   message.receiver=this.chatUserselected.username;
   message.description=this.mess.nativeElement.value;
   this.dataservice.sendNewMessage(message).subscribe({
    next:(val:any)=>{

      receivedMessage=val;

    },
    error:(err:any)=>{
      this.toast.warning('error occurred during process');
    },
    complete:()=>{
      this.mess.nativeElement.value=''
      this.service.sendHelloMessage(this.chatroomid,receivedMessage);
      this.service.sendNotification(this.chatUserselected.userId,receivedMessage);
      
     
    }
   })
   }

 
  public sendMessage(){
   
  }

  getmessages(){
    
   

   
  }
  LastSeenUpdate:{userId:any,status:any}={userId:'',status:''};

  getallmessagefrodb(){
    let result:any=[]
    this.dataservice.getallmessages(this.myuser.username,this.chatUserselected.username)
    .subscribe({
      next:(val:any)=>{
        result=val;
       
      },
      complete:()=>{
        this.dataservice.getallmessages(this.chatUserselected.username,this.myuser.username).subscribe({
          next:(val:any)=>{
            result=result.concat(val);
          },
          complete:()=>{
            console.log(result);
            this.allmessages=result;
            this.allmessages=this.allmessages.sort((a:any, b:any) => new Date(a.date).getTime()-new Date(b?.date).getTime());
            this.allmessages=this.allmessages.map((val:any)=>{
              val.date=new Date(val.date)
              return val;
            })
          }
        })
      }
    })

    
  }
public getallusers(){
  let user:any=sessionStorage.getItem("user");
  user=JSON.parse(user);
  console.log(user.userId)
  this.dataservice.getallusers().subscribe({ 
    next:(val:any)=>{
      this.allusers=val;
      val.forEach((data:any)=>{
        if(data.username===this.myuser.username){
          this.myuser=data;
        }
      })
      
    },
    error:(err:any)=>{
      this.toast.warning("error occurred in getting users");
    },
    complete:()=>{
      this.allusers=this.allusers.filter((val:any)=>{
        return val.userId!==user.userId && val.userId!==1;
      })

      this.selectChatUser(this.allusers[0])
      

     
      
    }
  })
}

  ngOnDestroy(){
    console.log("called ng destroy")
    this.LastSeenUpdate.status="offline";
    this.LastSeenUpdate.userId=this.myid;
    this.service.lastseenupdateStatus(this.LastSeenUpdate);
   
  }

}
