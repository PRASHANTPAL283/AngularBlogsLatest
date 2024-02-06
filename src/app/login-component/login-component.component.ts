import { Component } from '@angular/core';
import { DataservicesService } from '../dataservices.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  constructor(public service:DataservicesService, public fb:FormBuilder){

  }
  ngOnInit(){

  }

  loginModel=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  getName(){
    return this.loginModel.get('username');
  }
  getPass(){
    return this.loginModel.get('password');
  }

  doLogin(){
    if(!this.loginModel?.valid){
      this.loginModel.markAllAsTouched();
    }
    else{
      alert("clearred")
    }
  }

}
