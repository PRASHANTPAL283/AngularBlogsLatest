import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataservicesService } from '../dataservices.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {

  constructor(public fb:FormBuilder,public router:Router,public service:DataservicesService){

  }

  message:any;
  ngOnInit(){

  }
  registerModel=this.fb.group({ 
    username:[''],
    email:[''],
    phoneNumber:[''],
    userRolesList:[[{}]],
    password:[''],
    password2:['']
  })

  addUser(){
    let pass1=this.registerModel.get('password')?.value;
    let pass2=this.registerModel.get('password2')?.value;
    if(pass1===pass2){
      console.log(this.registerModel?.value)
      let roles=[{
        'roleId':1,
        'roleName':"user"
      }]
      this.registerModel.patchValue({
        userRolesList:roles
      })

      this.service.addNewUser(this.registerModel?.value).subscribe({ 
        next:(val:any)=>{
          
          console.log(val);
        },
        error:(err:any)=>{
          this.message=err.message;
          this.myFunction2();
        },
        complete:()=>{
          this.message="Register Susccessfully";
          this.myFunction();
          this.registerModel.reset();
          this.router.navigate(['login'])
        }
      })

    }
    else{
      this.message="password are not matching ";
      this.myFunction2();
      this.registerModel.reset();
    }
  }
  @ViewChild('snackBar')snackBar:any|ElementRef;


  myFunction(){
  this.snackBar.nativeElement.className="show"
  this.snackBar.nativeElement.style.backgroundColor="green";
    this.snackBar.nativeElement.style.color="white"
  console.log(this.snackBar.nativeElement.className)
  
    setTimeout(() =>{  this.snackBar.nativeElement.className = ""; }, 4000);
  }

  myFunction2(){
    this.snackBar.nativeElement.className="show"
    this.snackBar.nativeElement.style.backgroundColor="red";
    this.snackBar.nativeElement.style.color="white"
  console.log(this.snackBar.nativeElement.className)
  
    setTimeout(() =>{  this.snackBar.nativeElement.className = ""; }, 4000);
  }

  checkDate(){
    let date=new Date("2024-02-07 20:00:41.417");
     let datenew=new Date();
    let minutes:any=null;
    let hours:any=null;
    let days:any=null;
    let seconds:any=null;
    let months:any=null;
    let years:any=null;
    console.log(datenew.getTime()-date.getTime())
    let diff:any=datenew.getTime()-date.getTime();
    days=Math.round(diff/(1000 * 3600 * 24));
    console.log(days);
    diff=diff%(1000 * 3600 * 24);
    hours=Math.round(diff/(1000*3600));
    console.log(hours);
    diff=diff%(1000*3600);
    minutes=Math.round(diff/60000);
    console.log(minutes);
    diff=diff%60000;
    seconds=Math.round(diff/1000);
    console.log(seconds)
    



    
  }
    
  }


  


