import { Component } from '@angular/core';
import { DataservicesService } from '../dataservices.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component {
  apiUrl=environment.apiUrl;

  constructor(public service:DataservicesService,public router:Router){

  }
  allblogs:any=[]

  getallblogs(){
    this.service.getallblogs().subscribe({
      next:(val:any)=>{
        this.allblogs=val;
        console.log(this.allblogs)

      }
    })
  }
  ngOnInit(){
    this.getallblogs();


  }

  gotoBlogs(id:any){
    console.log(id);
    this.router.navigate(['details',id]);
  }
  

}
