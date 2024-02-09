import { Component } from '@angular/core';
import { DataservicesService } from '../dataservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component {

  constructor(public service:DataservicesService, public router:Router){

  }
  ngOnInit(){
    this.getallBlogsByUser();

  }
  updateBlog(data:any){
    data=JSON.stringify(data)
    this.router.navigate(['createBlogs',data]);

  }
  deleteBlogById(id:any){
    let f:any=null;
    this.service.deleBlogById(id).subscribe({ 
      next:(val:any)=>{
        f=val.subject;

      },
      error:(err:any)=>{
        alert("error occurred")
      },
      complete:()=>{
        alert("data deleted successfull");
        this.getallBlogsByUser();
      }
    })
  }
  allblogs:any=[];

  getallBlogsByUser(){
    this.service.getBlogsByUser().subscribe({ 
      next:(val:any)=>{
        this.allblogs=val;

      },
      error:(err:any)=>{
        alert("error occurred while fetching blogs")
      }
    })
  }

}
