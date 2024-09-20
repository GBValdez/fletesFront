import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResDetaillComponent } from './modal-res-detaill.component';

describe('ModalResDetaillComponent', () => {
  let component: ModalResDetaillComponent;
  let fixture: ComponentFixture<ModalResDetaillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResDetaillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResDetaillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
