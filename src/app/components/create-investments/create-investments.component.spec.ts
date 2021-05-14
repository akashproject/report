import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvestmentsComponent } from './create-investments.component';

describe('CreateInvestmentsComponent', () => {
  let component: CreateInvestmentsComponent;
  let fixture: ComponentFixture<CreateInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
