
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
export const get_blogs_by_user=environment.apiUrl+"/getBlogsByUser";
export const get_all_comments_blog_id=environment.apiUrl+"/allcomments";
export const do_post_comment=environment.apiUrl+"/doComment";
export const do_like_post=environment.apiUrl+"/doLike";
export const get_all_likes_blog=environment.apiUrl+"/getLikes";
export const all_likes_count=environment.apiUrl+"/getallLikesCount";
export const delete_comment_by_id=environment.apiUrl+"/deleteCommentById";
export const all_users_api=environment.apiUrl+"/allusers";
export const add_new_friend=environment.apiUrl+"/addFriend";
export const get_all_friends_userId=environment.apiUrl+"/allfriends";
export const add_new_follow_api=environment.apiUrl+"/addFollow";
export const get_all_follows_api=environment.apiUrl+"/allfollows";
export const delete_friend_by_id_api=environment.apiUrl+"/deleteFriendbyId";
export const delete_follow_by_id_api=environment.apiUrl+"/deleteFollowById";
export const get_user_by_its_username_api=environment.apiUrl+"/getUserbyUsername";
export const send_new_message_api=environment.apiUrl+"/sendNewMessage";
export const get_all_messages_api=environment.apiUrl+"/getallmessages";


