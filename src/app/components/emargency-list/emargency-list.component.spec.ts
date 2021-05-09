import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmargencyListComponent } from './emargency-list.component';

describe('EmargencyListComponent', () => {
  let component: EmargencyListComponent;
  let fixture: ComponentFixture<EmargencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmargencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmargencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
