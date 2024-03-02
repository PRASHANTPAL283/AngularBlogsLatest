import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataservicesService } from '../dataservices.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component {
constructor(private fb:FormBuilder, public service:DataservicesService, public router:ActivatedRoute, public toast:ToastrService){
}
formData:FormData=new FormData();


@ViewChild('myfile')myfile:any|ElementRef;
updateBlogModel:any=null;

chooseFile(event:any){
  console.log(event.target.files[0]);
  this.formData.set("file",event.target.files[0]);
  this.showPreview(event);
  console.log(this.formData)


}
resetfile(){
  this.myfile.nativeElement.value="";
  this.formData.set("file",'');
  this.imagePreviewUrl='';
 }
 adjustData(){
  if(this.updateBlogModel===null){
    this.submitData();
  }
  else{
    this.updateBlog()
  }
 }


submitData(){
  if(this.formData.get("file")===''|| this.formData.get("file")===undefined || this.formData.get("file")===null){
    this.service.postNewBlog(this.BlogsModel?.value).subscribe({ 
      next:(val:any)=>{
        console.log(val)
        
      },
      error:(err:any)=>{
        this.generateErrorMessage(err)
      },
      complete:()=>{
        this.toast.success("blog posted successfully");
        this.BlogsModel.reset();
        this.resetfile();
      }
    })}
  else{
  this.service.addImage(this.formData)
  .subscribe({
    next:(val:any)=>{
      this.BlogsModel.patchValue({
        imageId:val.ImageId,
        imageUrl:val.downloadURL
      })
    },
    error:(err:any)=>{
      this.generateErrorMessage(err)
    },
    complete:()=>{
      console.log("file added successfully");
      this.service.postNewBlog(this.BlogsModel?.value).subscribe({ 
        next:(val:any)=>{
          console.log(val)
          
        },
        error:(err:any)=>{
          this.generateErrorMessage(err)
        },
        complete:()=>{
          this.toast.success("blog posted successfully");
          this.BlogsModel.reset();
          this.resetfile();
        }
      })
    }
  })
}
  
}
imagePreviewUrl:any;

  showPreview(event:any) {
    const file:any = event.target.files[0];
    
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


BlogsModel=this.fb.group({
  blogId:[''],
  subject:['',Validators.required],
  description:['',Validators.required],
  imageUrl:[''],
  imageId:[''],
  date:['']

})

updateBlog(){
  if(this.formData.get("file")===''|| this.formData.get("file")===undefined || this.formData.get("file")===null){
    this.service.postNewBlog(this.BlogsModel?.value).subscribe({ 
      next:(val:any)=>{
        console.log(val)
        
      },
      error:(err:any)=>{
        this.generateErrorMessage(err)
      },
      complete:()=>{
        this.toast.success("blog posted successfully");
        this.BlogsModel.reset();
        this.resetfile();
      }
    })}
  else{
  this.service.updateImage(this.formData,this.updateBlogModel.imageId)
  .subscribe({
    next:(val:any)=>{
      this.BlogsModel.patchValue({
        imageId:val.ImageId,
        imageUrl:val.downloadURL
      })
    },
    error:(err:any)=>{
      this.generateErrorMessage(err)
    },
    complete:()=>{
      console.log("file added successfully");
      this.service.postNewBlog(this.BlogsModel?.value).subscribe({ 
        next:(val:any)=>{
          console.log(val)
          
        },
        error:(err:any)=>{
          this.generateErrorMessage(err)
        },
        complete:()=>{
          this.toast.success("blog updated successfully");
          this.BlogsModel.reset();
          this.resetfile();
        }
      })
    }
  })
}
  

  
  
}
ngOnInit(){
this.updateBlogModel=null;

 this.router.paramMap.subscribe((params:ParamMap)=>{
  let updateBlog:any=params.get('data');
  updateBlog=JSON.parse(updateBlog)
  this.updateBlogModel=updateBlog;
  this.BlogsModel.patchValue({ 
    blogId:this.updateBlogModel.blogId,
    subject:this.updateBlogModel.subject,
    description:this.updateBlogModel.description,
    imageId:this.updateBlogModel.imageId,
    imageUrl:this.updateBlogModel.imageUrl,
    date:this.updateBlogModel.date
  })
 })
 this.imagePreviewUrl=environment.apiUrl+this.updateBlogModel.imageUrl;
    
  }

  generateErrorMessage(val:any){
    let t:any=(JSON.parse(val.message));
    this.toast.error(t);
  }
  

}


