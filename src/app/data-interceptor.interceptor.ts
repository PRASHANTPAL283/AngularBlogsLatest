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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let user:any=sessionStorage.getItem("userDetails");
    let loginModel=JSON.parse(user);

    let authorizationData = 'Basic ' + btoa(loginModel.username + ':' + loginModel.password);
    const req=request.clone({
       setHeaders:{
         
         "Authorization":authorizationData
       }
     })
     return next.handle(req);
    
  }
}
