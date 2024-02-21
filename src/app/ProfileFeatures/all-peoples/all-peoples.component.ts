import { Component } from '@angular/core';
import { DataservicesService } from 'src/app/dataservices.service';
import { FollowModel } from 'src/app/follow-model';
import { FriendEntity } from 'src/app/friend-entity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-peoples',
  templateUrl: './all-peoples.component.html',
  styleUrls: ['./all-peoples.component.css']
})
export class AllPeoplesComponent {

   apiUrl=environment.apiUrl;

  constructor(public service:DataservicesService){

  }
  currentUser:any;
  alluserdata:any=[];
  allfriends:any=[];
  ngOnInit(){
    this.currentUser=sessionStorage.getItem("user");
    this.currentUser=JSON.parse(this.currentUser);
    this.getallusers();
    
  }

  allusers:any=[];
  getallusers(){
    this.service.getallusers().subscribe({ 
      next:(val:any)=>{
        this.allusers=val;
        this.alluserdata=val;
        console.log(this.allusers)
      },
      complete:()=>{
        this.allusers=this.allusers.filter((val:any)=>{
          return val.username!=this.currentUser.username && val.username!=="guest"
        })

        this.getallfriends();
        this.getallfollows();
      }
    })
    
  }
  allfollows:any=[];

  getallfriends(){
    this.service.getallfriendsbyuserid(this.getuserId())
    .subscribe({ 
      next:(val:any)=>{
        this.allfriends=val;
        console.log(val)
      },
      
    })
  }

  getallfollows(){
    this.service.getallfollowsbyuserid(this.getuserId())
    .subscribe({ 
      next:(val:any)=>{
        this.allfollows=val;
        console.log(val)
      }
    })
    
  }

 
  getuserId():any{
    let userId:any=null;
    let user:any=sessionStorage.getItem("user");
    user=JSON.parse(user);
    this.alluserdata.forEach((val:any)=>{
      if(val.username===user.username){
        userId=val.userId;
      }
    })

    return userId;

    

  
  }
  addFollow(data:any){
    let value:FollowModel={
      followId: 0,
      followadded: undefined,
      myuserid: 0
    }
    value.followadded=data;
    value.myuserid=this.getuserId();

    return this.service.addNewFollow(value).subscribe({ 
      next:(val:any)=>{
        console.log(val)
      },
      error:(err:any)=>{
        alert(err.message)
      },
      complete:()=>{
        alert('follow added successfully');
        this.getallfollows();
      }
    })
    

  }

  addFriend(data:any){
    let value:FriendEntity={
      friendId: 0,
      friendadded: undefined,
      myuserId: undefined
    }

    value.friendadded=data;
    value.myuserId=this.getuserId();
    console.log(value);
    return this.service.addNewFriend(value)
    .subscribe({
      next:(val:any)=>{
        console.log(val);
      },
      error:(err:any)=>{
        alert("error occurred during process "+err.message);
      },
      complete:()=>{
        alert("friend added successfully");
        this.getallfriends();
      }
    })


  }

  validateFriendalreadyadded(id:any){
    let flag:any=true;
    this.allfriends.forEach((val:any)=>{
      if(val.friendadded.userId===id){
        flag=false;
      }
      })
    return flag;
  }
  validateiffollowsalready(id:any){
    let flag:any=true;
    this.allfollows.forEach((val:any)=>{
      if(val.followadded.userId==id){
        flag=false;
      }
    })
    return flag;
  }

  }
