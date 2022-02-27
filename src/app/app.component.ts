import { Component,HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Conjugation';
  deviceType = 'desktop';
  innerHeight: string;

  constructor(
    public api: ApiService,
    public util: UtilService,
    private router: Router,
    private bnIdle: BnNgIdleService
  ) {
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {        
        if (this.util.userInfo != '') {
          localStorage.clear();
          this.util.userInfo = null;
          window.location.reload();
        } else {
        }     
      } 
    })
    
  }

}
