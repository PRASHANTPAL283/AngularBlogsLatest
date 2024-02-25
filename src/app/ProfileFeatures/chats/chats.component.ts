import { Component } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  ngOnInit(){
    console.log("user enters the component");
  }
  ngOnDestroy(){
    console.log("user exit the component");
  }

}
