import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProductHomeComponent } from './provider-product-home.component';

describe('ProviderProductHomeComponent', () => {
  let component: ProviderProductHomeComponent;
  let fixture: ComponentFixture<ProviderProductHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderProductHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderProductHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
