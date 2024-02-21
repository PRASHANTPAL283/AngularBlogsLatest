import { Component } from '@angular/core';
import { DataservicesService } from 'src/app/dataservices.service';
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
  ngOnInit(){
    this.getallusers();
  }

  allusers:any=[];
  getallusers(){
    this.service.getallusers().subscribe({ 
      next:(val:any)=>{
        this.allusers=val;
        console.log(this.allusers)
      },
      complete:()=>{
        this.allusers=this.allusers.filter((val:any)=>{
          return val.userId!=this.getuserId() && val.username!=="guest"
        })
      }
    })
    
  }

  getuserId():any{
    let userId:any=null;
    let user:any=sessionStorage.getItem("user");
    user=JSON.parse(user);
    this.allusers.forEach((val:any)=>{
      if(val.username===user.username){
        userId=val.userId;
      }
    })

    return userId;

    

  
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
        alert("error occurred during process");
      },
      complete:()=>{
        alert("friend added successfully");
      }
    })


  }

  



}
