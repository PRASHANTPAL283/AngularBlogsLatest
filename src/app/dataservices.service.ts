import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { all_users_url, blog_add_url, blog_delete_url, blog_get_url, blog_image_update, blog_image_upload, delete_user_url, get_blogs_by_user, login_user_url, user_add_url } from './ContantsApi';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataservicesService {

  constructor(public http:HttpClient) { }

  public postNewBlog(data:any){
    return this.http.post(blog_add_url,data)
    .pipe(catchError(this.handleError));

  }

  public getallblogs(){
    return this.http.get(blog_get_url)
    .pipe(catchError(this.handleError));
  }
  public getBlogById(id:any){
    let url=blog_get_url+"/"+`${id}`;
    return this.http.get(url) .pipe(catchError(this.handleError));
  }

  public deleBlogById(id:any){
    let url=blog_delete_url+"/"+`${id}`;
    return this.http.get(url) .pipe(catchError(this.handleError));
  }

  public addImage(data:any){
    
    
    return this.http.post(blog_image_upload,data).pipe(catchError(this.handleError));
  }
  public updateImage(data:any, id:any){
    let url=blog_image_update+"/"+`${id}`;
    return this.http.post(url,data).pipe(catchError(this.handleError));
  }

  public getBlogsByUser(){
    return this.http.get(get_blogs_by_user).pipe(catchError(this.handleError));
  }

  public addNewUser(data:any){
    return this.http.post(user_add_url,data).pipe(catchError(this.handleError))
  }
  public getUserById(id:any){
    let url=all_users_url+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError))
  }

  public deleteUserById(id:any){
    let url=delete_user_url+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError))
  }

  public doLoginUser(data:any){
    return this.http.post(login_user_url,data)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(JSON.stringify(error.error)));
  }
}
