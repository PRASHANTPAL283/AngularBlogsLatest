import { Component } from '@angular/core';
import { DataservicesService } from 'src/app/dataservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-peoples',
  templateUrl: './all-peoples.component.html',
  styleUrls: ['./all-peoples.component.css']
})
export class AllPeoplesComponent {

   apiUrl=environment.apiUrl;

  constructor(public service:DataservicesService){

  }
  ngOnInit(){
    this.getallusers();
  }

  allusers:any=[];
  getallusers(){
    this.service.getallusers().subscribe({ 
      next:(val:any)=>{
        this.allusers=val;
        console.log(this.allusers)
      }
    })
    
  }

}
