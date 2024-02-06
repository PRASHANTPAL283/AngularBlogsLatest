
import { environment } from "src/environments/environment"


export const blog_add_url=environment.apiUrl+"/addBlogs";
export const blog_get_url=environment.apiUrl+"/allblogs";
export const blog_delete_url=environment.apiUrl+"/deleteBlogById"
export const blog_image_upload=environment.apiUrl+"/addNewFile"
export const blog_image_update=environment.apiUrl+"/updateFile"
export const user_add_url=environment.apiUrl+"/addUser"
export const all_users_url=environment.apiUrl+"/allusers"
export const delete_user_url=environment.apiUrl+"/deleteUserById"
export const login_user_url=environment.apiUrl+"/doLogin";

