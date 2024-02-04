import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionLimiter'
})
export class DescriptionLimiterPipe implements PipeTransform {

  transform(value: any): any{
    if(value.length>=20){
      value=value.substring(0,20);
      value=value+"...read more"
    }
    else{
      value=value;
    }
    return value;
  }

}
