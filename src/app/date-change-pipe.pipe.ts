import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateChangePipe'
})
export class DateChangePipePipe implements PipeTransform {

  transform(value: any): any {

  let date:any=new Date(value);
 
date=date.toString().substring(0,25)
  return date;
  }

}
