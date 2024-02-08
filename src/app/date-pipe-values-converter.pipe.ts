import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipeValuesConverter'
})
export class DatePipeValuesConverterPipe implements PipeTransform {

  transform(value:any): any {
    let returnVal:any=null;
    let date=new Date(value);
     let datenew=new Date();
    let minutes:any=null;
    let hours:any=null;
    let days:any=null;
    let seconds:any=null;
    let diff:any=datenew.getTime()-date.getTime();
    days=Math.round(diff/(1000 * 3600 * 24));
    diff=diff%(1000 * 3600 * 24);
    hours=Math.round(diff/(1000*3600));
    diff=diff%(1000*3600);
    minutes=Math.round(diff/60000);
    diff=diff%60000;
    seconds=Math.round(diff/1000);

    if(days>=2){
      returnVal=days+" days ago"
    }
    else if (days==1){
      returnVal=days+" day ago"
    }
    
    else if(hours>=1 && days<1){
      returnVal=hours+" hours ago"
    }
    else if(hours==1 && days<1){
      returnVal=hours+" hour ago"
    }
    else if(minutes>=1 && hours<1 && days<1){
      returnVal=minutes+ " minutes ago"
    }
    else if(minutes==1 && hours<1 && days<1){
      returnVal=minutes +" minute ago"
    }
    else{
      returnVal=seconds+ " seconds ago";
    }

    return returnVal;
    
    
  }

}
