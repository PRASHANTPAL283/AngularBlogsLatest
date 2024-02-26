import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { add_new_follow_api, add_new_friend, all_likes_count, all_users_api, all_users_url, blog_add_url, blog_delete_url, blog_get_url, blog_image_update, blog_image_upload, delete_comment_by_id, delete_follow_by_id_api, delete_friend_by_id_api, delete_user_url, do_like_post, do_post_comment, get_all_comments_blog_id, get_all_follows_api, get_all_friends_userId, get_all_likes_blog, get_all_messages_api, get_blogs_by_user, get_user_by_its_username_api, login_user_url, send_new_message_api, user_add_url } from './ContantsApi';
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

  public addNewFriend(data:any){
    return this.http.post(add_new_friend,data)
    .pipe(catchError(this.handleError))
  }

  public getallfriendsbyuserid(id:any){
    let url=get_all_friends_userId+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public addNewFollow(data:any){
    return this.http.post(add_new_follow_api,data)
    .pipe(catchError(this.handleError))
  }

  public getallfollowsbyuserid(id:any){
    let url=get_all_follows_api+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError))
  }

  public removeFriendById(id:any){
    let url=delete_friend_by_id_api+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError))
  }
  public removefollowbyid(id:any){
    let url=delete_follow_by_id_api+"/"+`${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getUserByItsName(name:any){
    let url=get_user_by_its_username_api+"/"+`${name}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }
  public sendNewMessage(message:any){
    return this.http.post(send_new_message_api,message)
    .pipe(catchError(this.handleError));
  }
  public getallmessages(sender:any,receiver:any){
    let url=get_all_messages_api+"/"+`${sender}`+"/"+`${receiver}`;
    return this.http.get(url).pipe(catchError(this.handleError));
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
