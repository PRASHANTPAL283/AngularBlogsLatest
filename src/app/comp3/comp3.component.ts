import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataservicesService } from '../dataservices.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component {
constructor(private fb:FormBuilder, public service:DataservicesService){
}
formData:FormData=new FormData();

@ViewChild('myfile')myfile:any|ElementRef;

chooseFile(event:any){
  console.log(event.target.files[0]);
  this.formData.set("file",event.target.files[0]);
  console.log(this.formData)


}
resetfile(){
  this.myfile.nativeElement.value="";
  this.formData.set("file",'');
 }
submitData(){
  if(this.formData.get("file")===''|| this.formData.get("file")===undefined || this.formData.get("file")===null){
    this.service.postNewBlog(this.BlogsModel?.value).subscribe({ 
      next:(val:any)=>{
        console.log(val)
        
      },
      error:(err:any)=>{
        console.log(JSON.parse(err.message))
      },
      complete:()=>{
        alert("blog posted successfully");
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
      console.log(err.message)
    },
    complete:()=>{
      console.log("file added successfully");
      this.service.postNewBlog(this.BlogsModel?.value).subscribe({ 
        next:(val:any)=>{
          console.log(val)
          
        },
        error:(err:any)=>{
          alert(err.message);
        },
        complete:()=>{
          alert("blog posted successfully");
          this.BlogsModel.reset();
          this.resetfile();
        }
      })
    }
  })
}
  
}


BlogsModel=this.fb.group({
  subject:['',Validators.required],
  description:['',Validators.required],
  imageUrl:[''],
  imageId:['']

})
ngOnInit(){

}

}
