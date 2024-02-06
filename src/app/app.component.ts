import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
environment
environment

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code030221';

  constructor(){
    console.log(environment.production)

  }
  ngOnInit(){
    let user:any=sessionStorage.getItem("user");
    let loginModel=JSON.parse(user);
   

    if(loginModel===null || loginModel===undefined || loginModel===''){
      let data:any={username:"guest",password:"@EZAKMi90"}
      data=JSON.stringify(data);
      sessionStorage.setItem("user",data);
    }
    
  }
}
