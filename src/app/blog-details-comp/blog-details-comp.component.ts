import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataservicesService } from '../dataservices.service';
import { environment } from 'src/environments/environment';
import { CommentEntity } from '../comment-entity';
import { LikeEntity } from '../like-entity';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-details-comp',
  templateUrl: './blog-details-comp.component.html',
  styleUrls: ['./blog-details-comp.component.css']
})
export class BlogDetailsCompComponent {

  constructor(public router:ActivatedRoute, public service:DataservicesService, public fb:FormBuilder){

  }
  apiUrl=environment.apiUrl;
  CurrentUser:any;

  BlogDetails:any=null;
  peoplesLikes:any=[];

  getallPeoplesLikes(data:any){
    
    this.peoplesLikes=[];
    data.forEach((val:any)=>{
     
      let i:any=0;
     if(val.likeFlag==true){
    
      this.peoplesLikes.push(val.userModel.username)
      i=i+1;
     }
    
    })
  }

  commentModel=this.fb.group({ 
    cid:[''],

    description:['',Validators.required]

  })
  getdesc(){
    return this.commentModel.get('description');
  }
  sendDetails(){
    let desc:any=this.getdesc()?.value;

    if(this.commentModel?.invalid){
      this.commentModel.markAllAsTouched();
    }
    else{
      this.dopostComment(desc);
    }
  }
  changeValuecomment(id:any,desc1:any){

    this.commentModel.patchValue({
      cid:id,
      description:desc1
    
    })
    let desc:any=this.getdesc()?.value;
    if(this.commentModel?.invalid){
      this.commentModel.markAllAsTouched();
    }
   
    
  }
  deleteCommentById(id:any){
    this.service.deleteCommentById(id).subscribe({ 
      next:(val:any)=>{
        
      },
      error:(err:any)=>{
        alert('error occurred');
      },
      complete:()=>{
        alert("comment deleted successfully");
        this.getallComments(this.BlogDetails.blogId);
      }
    })
  }

  ngOnInit(){
    this.router.paramMap.subscribe((param:ParamMap)=>{
      let id:any=null;
      id=param.get("id");

      this.service.getBlogById(id).subscribe({
        next:(val:any)=>{
          this.BlogDetails=val;
          this.convertdate();
         
        },
        error:(err:any)=>{
          console.log(JSON.parse(err.message));
        },
        complete:()=>{
          this.getalllikes(this.BlogDetails.blogId);
          this.getallComments(this.BlogDetails.blogId);
         
        }
       
      })
      
     
    })

    let u:any=sessionStorage.getItem("user");
    u=JSON.parse(u);
    this.CurrentUser=u.username;

  }
  convertdate(){
    this.BlogDetails.date=new Date(this.BlogDetails.date);
  }
  alllikes:any=[];
  allcomments:any=[];

  getalllikes(id:any){
    this.service.getalllikes(id).subscribe({ 
      next:(val:any)=>{
        this.alllikes=val;
       
        

      },
      complete:()=>{
        
        this.getallLikesCount();
        this.getallPeoplesLikes(this.alllikes);
       
      }
    })
  }
  allLikesCount:any;

  getallLikesCount(){
    this.service.getallLikesCount(this.BlogDetails.blogId)
    .subscribe({ 
      next:(val:any)=>{
        this.allLikesCount=val.count;

      }
    })
  }

  

  getallComments(id:any){
    this.service.getallcomments(id).subscribe({ 
      next:(val:any)=>{
        this.allcomments=val;
        

      }
    })
  }

  dopostComment(desc:any){
    let cide:any=this.commentModel.get("cid")?.value;
    let postData:CommentEntity={
      cid: 0,
      description: '',
      userModel: undefined,
      blogsModel: undefined,
      date: undefined
    };
    
    let user:any=sessionStorage.getItem("user");
    user=JSON.parse(user);
    
    postData.blogsModel=this.BlogDetails;
    postData.description=desc;
    postData.userModel=user;
    postData.cid=cide
    this.service.doCommentPost(postData).subscribe({ 
      next:(val:any)=>{
       
      },
      error:(err:any)=>{
        console.log(err.message);
      },
      complete:()=>{
        alert("comment added successfully");
        this.getallComments(this.BlogDetails.blogId);
        this.commentModel.reset();

      }
    })
    
  }

  checkIfLikeOrNot():any{
    let flag:any=false;
let user:any=sessionStorage.getItem("user");
user=JSON.parse(user);
let username:any=user.username;
this.alllikes.forEach((val:any)=>{
  if(val.userModel.username===username && val.likeFlag===true){
flag=true;
  }
})
return flag;
  }

  

  

  

  dopostLike(){
    let flag:any=null;

    let likeModel:LikeEntity={
      likeId: 0,
      blogsModel: undefined,
      userModel: undefined,
      likeFlag: false
    }
    let user:any=sessionStorage.getItem("user");
    user=JSON.parse(user);
    likeModel.blogsModel=this.BlogDetails;
    likeModel.userModel=user;
    this.service.doLikePost(likeModel).subscribe({ 
      next:(val:any)=>{
        
        flag=val.likeFlag;

      },
      error:(err:any)=>{
        console.log(err.message);
      },
      complete:()=>{
        if(flag==true){
        alert("you successfully liked the blog");
      }else{
        alert("you successfully unlike a blog");
      }
        this.getalllikes(this.BlogDetails.blogId);
       
       
      }
    })


  }


}
