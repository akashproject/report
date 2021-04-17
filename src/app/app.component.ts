import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
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
  windowWidth: number;
  constructor(public api: ApiService, public util: UtilService) {
    console.log(this.util.deviceType);
  }
}
