import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import {
  prodVehicleDto,
  prodVehicleDtoCreate,
} from '@product/interface/productVehicle.interface';
import { ProductVehicleService } from '@product/services/product-vehicle.service';
import {
  catalogueInterface,
  formModalDto,
  infoModalDto,
} from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';
import { CatalogueService } from '@utils/modules/catalogues/services/catalogue.service';

@Component({
  selector: 'app-product-vehicle-form',
  standalone: true,
  imports: [
    FormCmsComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    OnlyNumberInputDirective,
  ],
  templateUrl: './product-vehicle-form.component.html',
  styleUrl: './product-vehicle-form.component.scss',
})
export class ProductVehicleFormComponent {
  public dataInfo!: formModalDto;
  form!: FormGroup;
  typeVehicles: catalogueInterface[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: infoModalDto<prodVehicleDto>,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<ProductVehicleFormComponent>,
    private svc: ProductVehicleService,
    private routerAct: ActivatedRoute,
    private catalogueSvc: CatalogueService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      typeVehicleId: [
        { value: null, disabled: this.data.data != undefined },
        Validators.required,
      ],
      quantity: [null, [Validators.required, Validators.min(0.001)]],
    });

    this.catalogueSvc.get('TDV', 0, 10, { all: true }).subscribe((res) => {
      this.typeVehicles = res.items;

      this.dataInfo = {
        title: 'compatibilidad de vehículos',
        form: this.form,
        data: this.data.data,
        dialogRef: this.matDialog,
        post: this.svc.post.bind(this.svc),
        put: this.svc.put.bind(this.svc),
        map: (data: prodVehicleDtoCreate) => {
          if (this.data.data) {
            data.typeVehicleId = this.data.data.typeVehicle.id as number;
          }
          data.productId = this.data.routerAct.snapshot.params['id'];

          return data;
        },
      };
    });
    // alert('ProviderFormComponent');
  }
}
