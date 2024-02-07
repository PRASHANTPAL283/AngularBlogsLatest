import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user:any=sessionStorage.getItem("user");
    let loginModel=JSON.parse(user);
    console.log(loginModel)
  

    let authorizationData = 'Basic ' + btoa(loginModel.username + ':' + loginModel.password);
    const req=request.clone({
       setHeaders:{
         
         'Authorization':authorizationData
        
        

        
         
         
       }
     })
     return next.handle(req);
    
  }
}
