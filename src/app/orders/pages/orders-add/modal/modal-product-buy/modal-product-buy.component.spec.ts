import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductBuyComponent } from './modal-product-buy.component';

describe('ModalProductBuyComponent', () => {
  let component: ModalProductBuyComponent;
  let fixture: ComponentFixture<ModalProductBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProductBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProductBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
