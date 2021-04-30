/*
  Authors : Freelancerstore
  Website : https://freelancerstore.org/
  App Name : FR multi store daily needs App
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://freelancerstore.org/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  loader: any;
  isLoading = false;
  details: any;
  private address = new Subject<any>();
  private coupon = new Subject<any>();
  private review = new Subject<any>();
  orders: any;
  private changeLocation = new Subject<any>();
  private loggedIn = new Subject<any>();
  private profile = new Subject<any>();
  private newOrder = new Subject<any>();
  public appPage: any[] = [];
  public appClosed: boolean;
  public appClosedMessage: any = '';
  public havepopup: boolean;
  public popupMessage: any;
  public translations: any[] = [];
  public direction: any;
  public currecny: any;
  public cside: any;
  public selectedCity = new Subject<any>();
  public cartBtn = new Subject<any>();
  public popupRX = new Subject<any>();
  public city: any;
  public stripe: any;
  public stripeCode: any;

  public paypal: any;
  public paypalCode: any;

  public razor: any;
  public razorCode: any;
  public deviceType: any = 'desktop';

  public dummyProducts: any[] = [];
  public favIds: any[] = [];
  public haveFav: boolean;

  public general: any;

  public twillo: any;
  public logo: any;
  public delivery: any;
  public isEmailVerified: any;
  // public creds = {
  //   sid: '',
  //   token: '',
  //   from: ''
  // }
  public userInfo = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : '';

  constructor(public router: Router, private toasterService: ToasterService) {}

  publishAddress(data: any) {
    this.address.next(data);
  }

  publishNewOrder() {
    this.newOrder.next();
  }

  publishPopup() {
    this.popupRX.next();
  }

  getPopup(): Subject<any> {
    return this.popupRX;
  }

  publishCartBtn() {
    this.cartBtn.next();
  }

  subscribeCartBtn(): Subject<any> {
    return this.cartBtn;
  }

  toast(type, title, msg) {
    this.toasterService.pop(type, title, msg);
  }

  subscribeOrder(): Subject<any> {
    return this.newOrder;
  }

  publishReview(data: any) {
    this.review.next(data);
  }

  publishProfile(data: any) {
    this.profile.next(data);
  }

  observProfile(): Subject<any> {
    return this.profile;
  }

  getReviewObservable(): Subject<any> {
    return this.review;
  }

  publishLocation(data) {
    this.changeLocation.next(data);
  }
  subscribeLocation(): Subject<any> {
    return this.changeLocation;
  }

  setFav(id) {
    this.favIds.push(id);
  }

  removeFav(id) {
    this.favIds = this.favIds.filter((x) => x !== id);
  }

  publishLoggedIn(data) {
    this.loggedIn.next(data);
  }
  subscribeLoggedIn(): Subject<any> {
    return this.loggedIn;
  }

  publishCity(data) {
    this.selectedCity.next(data);
  }

  subscribeCity(): Subject<any> {
    return this.selectedCity;
  }

  getObservable(): Subject<any> {
    return this.address;
  }

  publishCoupon(data: any) {
    this.coupon.next(data);
  }
  getCouponObservable(): Subject<any> {
    return this.coupon;
  }

  setOrders(data) {
    this.orders = null;
    this.orders = data;
  }

  getKeys(key): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        resolve(localStorage.getItem(key));
      } catch (error) {
        reject(error);
      }
    });
  }

  clearKeys(key) {
    localStorage.removeItem(key);
  }

  setKeys(key, value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        resolve(localStorage.setItem(key, value));
      } catch (error) {
        reject(error);
      }
    });
  }

  gerOrder() {
    return this.orders;
  }

  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  start() {
    //this.ngxService.start();
  }

  stop() {
    //this.ngxService.stop();
  }

  getString(str) {
    if (this.translations[str]) {
      return this.translations[str];
    }
    return str;
  }
}
