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

import { FootersComponent } from "./footers.component";

describe("FootersComponent", () => {
  let component: FootersComponent;
  let fixture: ComponentFixture<FootersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FootersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
