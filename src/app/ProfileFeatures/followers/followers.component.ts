import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataservicesService } from 'src/app/dataservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {
  constructor(public service:DataservicesService, public toast:ToastrService){

  }
  generateErrorMessage(val:any){
    let t:any=(JSON.parse(val.message));
    this.toast.error(t);
  }
  currentUser:any;
  userId1:any;
  allfollows:any=[];
  apiUrl=environment.apiUrl;
  ngOnInit(){
    this.currentUser=sessionStorage.getItem("user");
    this.currentUser=JSON.parse(this.currentUser);
    this.getUserId();

    
  }

  getallfollows(id:any){
    this.service.getallfollowsbyuserid(id).subscribe({ 
      next:(val:any)=>{
        this.allfollows=val;

      }
    })
    
  }
  getUserId(){
    let id:any=null;
    this.service.getUserByItsName(this.currentUser.username).subscribe({ 
      next:(val:any)=>{
        id=val.userId;
        this.userId1=id;
      },
      complete:()=>{
        this.getallfollows(id);

      }

    })
  }

  unfollowById(id:any){
    this.service.removefollowbyid(id).subscribe({ 
      next:(val:any)=>{
        console.log(val)
      },
      error:(err:any)=>{
        this.generateErrorMessage(err)
      },
      complete:()=>{
        this.toast.success('unfollowed user success');
        this.getallfollows(this.userId1);
      }
    })
  }

}
