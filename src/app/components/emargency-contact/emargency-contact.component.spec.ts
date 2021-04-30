import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmargencyContactComponent } from './emargency-contact.component';

describe('EmargencyContactComponent', () => {
  let component: EmargencyContactComponent;
  let fixture: ComponentFixture<EmargencyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmargencyContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmargencyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
