import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageServicesService } from './message-services.service';
import { DataservicesService } from './dataservices.service';
environment
environment

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code030221';

  constructor(public service:MessageServicesService, public se:DataservicesService){
    console.log(environment.production)
    this.service.connect();
    let user:any=sessionStorage.getItem("user");
    let loginModel=JSON.parse(user);
    if(loginModel===null || loginModel===undefined || loginModel===''){
      let data:any={username:"guest",password:"@EZAKMi90"}
      data=JSON.stringify(data);
      sessionStorage.setItem("user",data);
    }
   

  }
  showmessage:any=false;
  message:any=null;
  datare:any=null;
  ngOnInit(){
    this.se.getTheNotificationModel().subscribe({
      next:(val:any)=>{
       
        this.datare=val;
       
      },
      complete:()=>{
        if(this.datare.sender===undefined|| this.datare.sender===null|| this.datare.sender===''){

        }
        else{
          
             
          this.showmessage=true
          this.message="you have received new message from "+this.datare.sender
      
          setTimeout(()=>{
            this.showmessage=false;
          },4000)
          
        }
      }

    
    })

  

    
   

  
    
  }

  public connecttochatSocket(){
    this.service.connect();
}

showMessageMethod(val:any){
  console.log("the value get="+val.sender)
  if(val.sender===undefined|| val.sender===null|| val.sender===''){

  }
  else{
    
       
    this.showmessage=true
    this.message="you have received new message from "+val.sender

    setTimeout(()=>{
      this.showmessage=false;
    },4000)
    
  }
}
}
