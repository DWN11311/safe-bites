import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, limit: number =30 ,ellipsis:string ='...'): string {
   
if(!value || value.length <=limit) return value;

   let trancated = value.substring(0,limit)
   let lastSpace =trancated.lastIndexOf(' ');
   if(lastSpace > 0){
    trancated = trancated.substring(0,lastSpace)
   }
   
   
   
    return trancated + ellipsis;
  }

}
