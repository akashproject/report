import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../services/util.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
	images = [700, 800].map((n) => `https://picsum.photos/id/${n}/900/500`);
	constructor(private router: Router,public util: UtilService,config: NgbCarouselConfig) {
		config.interval = 5000;
		config.keyboard = true;
		config.pauseOnHover = true;	  
	}

  ngOnInit(): void {
    localStorage.clear();
    this.util.userInfo = null;
  }

}
