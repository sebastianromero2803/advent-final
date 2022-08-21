import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMovementComponent } from './request-movement.component';

describe('RequestMovementComponent', () => {
  let component: RequestMovementComponent;
  let fixture: ComponentFixture<RequestMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
