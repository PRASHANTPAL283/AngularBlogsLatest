import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { all_likes_count, all_users_api, all_users_url, blog_add_url, blog_delete_url, blog_get_url, blog_image_update, blog_image_upload, delete_comment_by_id, delete_user_url, do_like_post, do_post_comment, get_all_comments_blog_id, get_all_likes_blog, get_blogs_by_user, login_user_url, user_add_url } from './ContantsApi';
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
  public doLikePost(value:any){
    return this.http.post(do_like_post,value).pipe(catchError(this.handleError));
  }

  public getalllikes(id:any){
    let url=get_all_likes_blog+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public doCommentPost(data:any){
    return this.http.post(do_post_comment,data).pipe(catchError(this.handleError));
  }

  public getallcomments(id:any){
    let url=get_all_comments_blog_id+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getallLikesCount(id:any){
    let url=all_likes_count+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public deleteCommentById(id:any){
    let url=delete_comment_by_id+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getallusers(){
    return this.http.get(all_users_api)
    .pipe(catchError(this.handleError))
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
