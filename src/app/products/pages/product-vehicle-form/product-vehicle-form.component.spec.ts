import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVehicleFormComponent } from './product-vehicle-form.component';

describe('ProductVehicleFormComponent', () => {
  let component: ProductVehicleFormComponent;
  let fixture: ComponentFixture<ProductVehicleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVehicleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
