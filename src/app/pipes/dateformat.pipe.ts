import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   // if (dob) {
  //   //   const [year, month, day] = dob.split('-');
  //   //   const obj = { year: parseInt(year), month: parseInt(month), day: 
  //   //     parseInt(day.split(' ')[0].trim()) };
  //   //    return obj;
  //   //   }
  //   return dob;
  //   return null;
  // }

}
