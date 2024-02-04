import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blog_add_url, blog_delete_url, blog_get_url, blog_image_upload } from './ContantsApi';
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
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
