import { Component, Inject, OnInit } from '@angular/core';
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
import { driverDto } from '@drivers/interface/driver.interface';
import { DriverService } from '@drivers/services/driver.service';
import {
  catalogueChildInterface,
  formModalDto,
  infoModalDto,
} from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { TimeRangeComponent } from '@utils/components/time-range/time-range.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';
import { CatalogueService } from '@utils/modules/catalogues/services/catalogue.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [
    FormCmsComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    TimeRangeComponent,
    MatSelectModule,
  ],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss',
})
export class DriverFormComponent implements OnInit {
  public dataInfo!: formModalDto;
  public brands: catalogueChildInterface[] = [];
  currentBrand: catalogueChildInterface | null = null;
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: infoModalDto<driverDto>,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<DriverFormComponent>,
    private svc: DriverService,
    private catalogueSvc: CatalogueService
  ) {}
  ngOnInit(): void {
    // alert('ProviderFormComponent');
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      userId: [
        { value: '', disabled: this.data.data != undefined },
        [Validators.required, Validators.maxLength(50)],
      ],
      nit: ['', [Validators.required, Validators.maxLength(8)]],
      licensePlate: ['', [Validators.required, Validators.maxLength(8)]],
      tel: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      time: [null, [Validators.required]],
      maximumWeight: ['', [Validators.required]],
      stopLimit: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      modelId: [null, [Validators.required]],
    });
    this.catalogueSvc.get('MDV', 0, 10, { all: true }).subscribe((data) => {
      this.brands = data.items;
      if (this.data.data) {
        this.openBrand(this.data.data.brand.id as number);
      }
      this.dataInfo = {
        title: 'proveedor',
        form: this.form,
        data: this.data.data,
        dialogRef: this.matDialog,
        post: this.svc.post.bind(this.svc),
        put: this.svc.put.bind(this.svc),
        map: (data: any) => {
          const { init, end } = data.time;
          let dataEnd = {
            ...data,
            openingTime: init,
            closingTime: end,
          };
          if (this.data.data) dataEnd.userId = '-------';
          return dataEnd;
        },
        mapEdit: (data: any) => {
          console.log('data', data.user);
          return {
            ...data,
            time: {
              init: data.openingTime,
              end: data.closingTime,
            },
            userId: data.user.userName,
          };
        },
      };
    });
  }

  openBrand(idBrand?: number): void {
    // alert('openBrand');
    const brandId = idBrand || this.form.value.brandId;
    this.currentBrand = this.brands.find((brand) => brand.id === brandId)!;
    this.form.patchValue({ modelId: null });
    console.log('this.currentBrand', this.currentBrand);
    if (this.currentBrand.children) {
      return;
    }
    this.catalogueSvc
      .get('MODELDV', 0, 10, {
        all: true,
        catalogueParentId: this.currentBrand.id as number,
      })
      .subscribe((data) => {
        this.currentBrand!.children = data.items;
      });
  }
}
