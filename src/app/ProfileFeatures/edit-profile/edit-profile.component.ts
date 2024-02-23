import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataservicesService } from 'src/app/dataservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  constructor(public fb:FormBuilder,public service:DataservicesService){

  }
  currentUser:any;
  username:any;
  pass:any;
  apiUrl=environment.apiUrl;

  ngOnInit(){
   
    this.getCurrentUserbyUsername();
   


  }
  defaultImageUrl:any="/prodImage/downloadfile/402";
  defaultImageId:any=0;
  UpdateUser(){
    if(this.formdata.get("file")===''|| this.formdata.get("file")===undefined || this.formdata.get("file")===null){
      this.registerModel.patchValue({
        imageId:this.defaultImageId,
        imageUrl:this.defaultImageUrl
      })
      this.service.addNewUser(this.registerModel.value).subscribe({ 
        next:(val:any)=>{
          console.log(val)
          this.currentUser=val;
        },
        error:(err:any)=>{
          alert('error occurred in updating user'+err.message);
        },
        complete:()=>{
          alert('user updated success');
          this.resetfile();
          this.registerModel.patchValue({ 
            userId:this.currentUser.userId,
            username:this.currentUser.username,
            email:this.currentUser.email,
            password:this.pass,
            imageId:this.currentUser.imageId,
            imageUrl:this.currentUser.imageUrl,
            userRolesList:this.currentUser.userRolesList,
            phoneNumber:this.currentUser.phoneNumber

          })
        }
      })
    }
    else{

      this.service.addImage(this.formdata).subscribe({ 
        next:(val:any)=>{
          this.registerModel.patchValue({ 
            imageId:val.ImageId,
        imageUrl:val.downloadURL
          })
        },
        error:(err:any)=>{
          alert('error occurred in uploading image')
        },
        complete:()=>{
          this.service.addNewUser(this.registerModel.value).subscribe({ 
            next:(val:any)=>{
              console.log(val)
              this.currentUser=val;
            },
            error:(err:any)=>{
              alert('error occurred in updating user'+err.message);
            },
            complete:()=>{
              alert('user updated success');
              this.resetfile();
              this.registerModel.patchValue({ 
                userId:this.currentUser.userId,
                username:this.currentUser.username,
                email:this.currentUser.email,
                password:this.pass,
                imageId:this.currentUser.imageId,
                imageUrl:this.currentUser.imageUrl,
                userRolesList:this.currentUser.userRolesList,
                phoneNumber:this.currentUser.phoneNumber,
              

    
              })
            }
          })

        }
      })

    }

  }

  registerModel=this.fb.group({ 
    userId:[''],
    username:[''],
    email:[''],
    phoneNumber:[''],
    userRolesList:[[{}]],
    password:[''],
    imageId:[''],
    imageUrl:['']
  })

  formdata:FormData=new FormData();
  @ViewChild("file") selectedFile:ElementRef|any;

  choosefile(event:any){
    console.log(event.target.files[0])
    this.showPreview(event);
    this.formdata.set("file",event.target.files[0]);

  }

  resetfile(){

    this.selectedFile.nativeElement.value='';
    this.imagePreviewUrl='';
    this.formdata.set("file",'');


  }

  getCurrentUserbyUsername(){
    let user:any=sessionStorage.getItem("user");
    user=JSON.parse(user);
    this.username=user.username;
    this.pass=user.password;
    this.service.getUserByItsName(this.username).subscribe({ 
      next:(val:any)=>{
        this.currentUser=val;
        console.log(val)
      },
      complete:()=>{
        this.imagePreviewUrl=this.apiUrl+this.currentUser.imageUrl;
       this.registerModel.patchValue({ 
        userId:this.currentUser.userId,
        username:this.currentUser.username,
        email:this.currentUser.email,
        userRolesList:this.currentUser.userRolesList,
        password:this.pass,
        phoneNumber:this.currentUser.phoneNumber,
        imageId:this.currentUser.imageId,
        imageUrl:this.currentUser.imageUrl

       })
      }
    })
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

}
