import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVehicleHomeComponent } from './product-vehicle-home.component';

describe('ProductVehicleHomeComponent', () => {
  let component: ProductVehicleHomeComponent;
  let fixture: ComponentFixture<ProductVehicleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVehicleHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVehicleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
