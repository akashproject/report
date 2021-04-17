/*
  Authors : Freelancerstore
  Website : https://freelancerstore.org/
  App Name : FR multi store daily needs App
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://freelancerstore.org/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MobileHeaderComponent } from "./mobile-header.component";

describe("MobileHeaderComponent", () => {
  let component: MobileHeaderComponent;
  let fixture: ComponentFixture<MobileHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
