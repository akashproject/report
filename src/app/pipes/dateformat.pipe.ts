import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: any): any {
    var d = value;
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    var str = da+'/' + mo + '/' + ye;
    return str;
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
