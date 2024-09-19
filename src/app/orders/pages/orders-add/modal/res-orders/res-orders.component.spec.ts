import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResOrdersComponent } from './res-orders.component';

describe('ResOrdersComponent', () => {
  let component: ResOrdersComponent;
  let fixture: ComponentFixture<ResOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
