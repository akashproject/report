import { Component,HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rp';
  deviceType = 'desktop';
  innerHeight: string;

  constructor(public api: ApiService, public util: UtilService,private router: Router) {
    console.log(this.util.deviceType);
    
  }
  
  // Keep me Signed in
  // public doUnload(): void {
  //   this.doBeforeUnload();
  // }

  // // Keep me Signed in
  // public doBeforeUnload(): void {
  //   localStorage.clear();
  //   this.util.userInfo = null;
  //   this.router.navigate(['/']).then(() => {
  //     window.location.reload();
  //   });
  // }

  // @HostListener('window:beforeunload', ['$event'])
  //  onWindowClose(event: any): void {
  //   // Do something
  //   alert();
  //    event.preventDefault();
  //    event.returnValue = false;

  // }
}
