import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blog_add_url, blog_delete_url, blog_get_url } from './ContantsApi';


@Injectable({
  providedIn: 'root'
})
export class DataservicesService {

  constructor(public http:HttpClient) { }

  public postNewBlog(data:any){
    return this.http.post(blog_add_url,data);

  }

  public getallblogs(){
    return this.http.get(blog_get_url);
  }
  public getBlogById(id:any){
    let url=blog_get_url+"/"+`${id}`;
    return this.http.get(url)
  }

  public deleBlogById(id:any){
    let url=blog_delete_url+"/"+`${id}`;
    return this.http.get(url)
  }
}
