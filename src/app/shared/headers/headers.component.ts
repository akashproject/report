import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { ApiService } from '../../services/api.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit {
  cities: any[] = [];
  cityName: any = '';
  dummy = Array(5);
  id: any;
  clicked: boolean;
  terms: any = '';
  products: any[] = [];
  lngId: any;
  dummyLang = Array(5);
  langs: any[] = [];
  active: boolean = false;
  constructor(
    private router: Router,
    public util: UtilService,
    public api: ApiService
  ) {}

  ngOnInit(): void {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHome(val) {
    this.router.navigate(['home']);
  }

  getAccount() {
    if (this.util.userInfo != '') {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.util.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  help() {
    this.router.navigate(['help']);
  }

  faq() {
    this.router.navigate(['faq']);
  }

  login() {
    console.log('login');
    this.router.navigate(['login']);
  }

  myaccount() {
    this.router.navigate(['/account']);
  }

  home() {
    this.router.navigate(['']);
  }

  goChat() {
    this.router.navigate(['chats']);
  }
  open_menu() {
    this.active = true;
  }
  close_menu() {
    this.active = false;
  }
}
