import { Component } from '@angular/core';
import { DataservicesService } from '../dataservices.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component {

  constructor(public service:DataservicesService, public router:Router, public toast:ToastrService){

  }
  ngOnInit(){
    this.getallBlogsByUser();

  }
  updateBlog(data:any){
    data=JSON.stringify(data)
    this.router.navigate(['createBlogs',data]);

  }
  generateErrorMessage(val:any){
    let t:any=(JSON.parse(val.message));
    this.toast.error(t);
  }
  deleteBlogById(id:any){
    let f:any=null;
    this.service.deleBlogById(id).subscribe({ 
      next:(val:any)=>{
        f=val.subject;

      },
      error:(err:any)=>{
        this.generateErrorMessage(err)
      },
      complete:()=>{
        this.toast.success("data deleted successfull");
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
        this.generateErrorMessage(err)
      }
    })
  }

}
