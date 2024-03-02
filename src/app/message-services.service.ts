import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs' 

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {
  private stompClient:any;
  constructor() { }

  public connect():void{
    const socket=new WebSocket(environment.websocketapi);
    this.stompClient=Stomp.over(socket);
    this.stompClient.connect({},()=>{
      console.log('connected to websocket');
    });
  }

  public sendHelloMessage(id:any,val:any){
    let url="/app/hello"+"/"+`${id}`
    val=JSON.stringify(val);
    this.stompClient.send(url,{},val);
  }

  public lastseenupdateStatus(val:any){
    let url="/app/user/heartbeat";
    val=JSON.stringify(val);
    this.stompClient.send(url,{},val);
  }

  public subscribeToGreetings(id:any): Observable<any> {
    return new Observable<any>((observer) => {
      let url="/topic/greetings"+"/"+`${id}`;
      this.stompClient.subscribe(url, (greeting: any) => {
        observer.next((greeting.body));
      });
    });
  }

  public subscribetolastseenupadte():Observable<any>{
    return new Observable<any>((observer:any)=>{
      let url="/topic/users";
      this.stompClient.subscribe(url,(greetings:any)=>{
        observer.next(greetings.body);
      })
    })
  }
  public sendNotification(id:any,data:any){
    let url="/app/sendNotification"+"/"+`${id}`;
    data=JSON.stringify(data);
    this.stompClient.send(url,{},data);

  }

  public subscribetonotification(id:any):Observable<any>{
    return new Observable<any>((observer:any)=>{
      let url="/topic/getNotified"+"/"+`${id}`;
      this.stompClient.subscribe(url,(greetings:any)=>{
        observer.next(greetings.body)
      })
    })
  }

  public disconnect(){
    let user:any=sessionStorage.getItem("user");
   user=JSON.parse(user);
  let LastSeenUpdate:{userId:any,status:any}={userId:'',status:''};
  LastSeenUpdate.status='offline';
  LastSeenUpdate.userId=user.userId;
  this.lastseenupdateStatus(LastSeenUpdate);
setTimeout(()=>{
  this.stompClient.close();
},1000)
    
  }
}
