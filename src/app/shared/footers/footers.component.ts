/*
  Authors : Freelancerstore
  Website : https://freelancerstore.org/
  App Name : FR multi store daily needs App
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://freelancerstore.org/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilService } from "src/app/services/util.service";
import * as moment from "moment";
@Component({
  selector: "app-footers",
  templateUrl: "./footers.component.html",
  styleUrls: ["./footers.component.scss"],
})
export class FootersComponent implements OnInit {
  year: any;
  constructor(private router: Router, public util: UtilService) {
    this.year = moment().format("YYYY");
  }

  ngOnInit(): void {}

  goToCart() {
    this.router.navigate(["/cart"]);
  }

  goToHome() {
    this.router.navigate(["/home"]);
  }

  goToOrders() {
    this.router.navigate(["/orders"]);
  }

  goToAccount() {
    this.router.navigate(["/account"]);
  }

  goToShop() {
    this.router.navigate(["/shop"]);
  }

  goToPrivacy() {
    this.router.navigate(["/privacy-policy"]);
  }

  goToContact() {
    this.router.navigate(["/contact"]);
  }

  goToRefund() {
    this.router.navigate(["/refund-policy"]);
  }

  goToHelp() {
    this.router.navigate(["/help"]);
  }

  about() {
    this.router.navigate(["/about"]);
  }
}
