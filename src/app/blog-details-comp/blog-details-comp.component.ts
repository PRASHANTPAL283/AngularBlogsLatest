import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataservicesService } from '../dataservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-details-comp',
  templateUrl: './blog-details-comp.component.html',
  styleUrls: ['./blog-details-comp.component.css']
})
export class BlogDetailsCompComponent {

  constructor(public router:ActivatedRoute, public service:DataservicesService){

  }
  apiUrl=environment.apiUrl;

  BlogDetails:any=null;

  ngOnInit(){
    this.router.paramMap.subscribe((param:ParamMap)=>{
      let id:any=null;
      id=param.get("id");

      this.service.getBlogById(id).subscribe({
        next:(val:any)=>{
          this.BlogDetails=val;
          console.log(this.BlogDetails);
        },
        error:(err:any)=>{
          console.log(JSON.parse(err.message));
        }
       
      })
      
     
    })
  }


}
