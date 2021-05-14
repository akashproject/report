/*
  Authors : Freelancerstore
  Website : https://freelancerstore.org/
  App Name : FR multi store daily needs App
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://freelancerstore.org/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
  ],
})
export class AccountModule {}
