import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelGasolineFormComponent } from './model-gasoline-form.component';

describe('ModelGasolineFormComponent', () => {
  let component: ModelGasolineFormComponent;
  let fixture: ComponentFixture<ModelGasolineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelGasolineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelGasolineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
