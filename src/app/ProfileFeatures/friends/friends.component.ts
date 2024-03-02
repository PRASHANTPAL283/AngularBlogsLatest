import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataservicesService } from 'src/app/dataservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {

  constructor(public service:DataservicesService, public toast:ToastrService){

  }
  ngOnInit(){
    this.currentUser=sessionStorage.getItem("user");
    this.currentUser=JSON.parse(this.currentUser);
    this.getUserId();
   
   }
  currentUser:any;
  allfriends:any=[];
  allusers:any=[];
  apiUrl=environment.apiUrl;

  generateErrorMessage(val:any){
    let t:any=(JSON.parse(val.message));
    this.toast.error(t);
  }

  getUserId():any{
    let id:any=null;

    this.service.getallusers().subscribe({ 
      next:(val:any)=>{
        this.allusers=val;
        console.log(val)
        val.forEach((val:any)=>{
          if(val.username===this.currentUser.username){
            id=val.userId;
            console.log(id)
          }
        })
      },
      complete:()=>{
        this.getallfriendsbyuserid(id); }
    })

  }

  getallfriendsbyuserid(id:any){
    this.service.getallfriendsbyuserid(id).subscribe({ 
      next:(val:any)=>{
        this.allfriends=val;
        },
      complete:()=>{

      }
    })
  }

  unfriendRequest(id:any){
    this.service.removeFriendById(id).subscribe({ 
      next:(val:any)=>{
        console.log(val)
      },
      error:(err:any)=>{
        this.generateErrorMessage(err)
      },
      complete:()=>{
        this.toast.success('unfriend success')
        this.getUserId();

      }
    })
  }
  


}
