import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component {
constructor(private fb:FormBuilder){
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
}
submitData(){
  console.log(this.BlogsModel?.value);
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
