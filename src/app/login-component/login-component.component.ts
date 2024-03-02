import { Component, EventEmitter, Output } from '@angular/core';
import { DataservicesService } from '../dataservices.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageServicesService } from '../message-services.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  constructor(public service:DataservicesService, public fb:FormBuilder, public router:Router, public msg:MessageServicesService,private toastr: ToastrService){

  }
  ngOnInit(){

  }
  @Output()event:any=new EventEmitter<any>();

  sendthedate(data:any){
    this.event.emit(data);
  }
  getSubscribedToNotifications(id:any){
    this.msg.subscribetonotification(id).subscribe((greetings:any)=>{
      greetings=JSON.parse(greetings);
      let sender:any=greetings.sender;
      this.toastr.success("You Have Received New Message From "+greetings.sender+":"+"\n"+greetings.description)
      
    })

  }

  loginModel=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  getName(){
    return this.loginModel.get('username');
  }
  getPass(){
    return this.loginModel.get('password');
  }

 
  myuser:any=null;

  doLogin(){
    if(!this.loginModel?.valid){
      this.loginModel.markAllAsTouched();
    }
    else{
     this.service.doLoginUser(this.loginModel?.value).subscribe({ 
        next:(val:any)=>{
          let result:any={username:val.username,password:this.getPass()?.value,userId:val.userId}
          console.log(result)
          this.myuser=result
          result=JSON.stringify(result);
          sessionStorage.setItem("user",result);
        },
        error:(err:any)=>{
          let t:any=(JSON.parse(err.message).message)
          
          this.toastr.warning(t)
        },
        complete:()=>{
          this.toastr.success("you have logged in successfully")
          this.getSubscribedToNotifications(this.myuser.userId)
          

          this.loginModel.reset();
          this.router.navigate(['blogs'])

        }
      })
    }
  }

  

}
