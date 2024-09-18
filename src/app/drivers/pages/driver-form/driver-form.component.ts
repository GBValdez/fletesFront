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
  public countries: catalogueChildInterface[] = [];
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
    console.log('this.data', this.data);
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
      // maximumWeight: ['', [Validators.required]],
      stopLimit: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      modelId: [null, [Validators.required]],
      countryOptId: ['', [Validators.required]],
    });
    this.catalogueSvc
      .get('CTR', 0, 10, { all: true })
      .subscribe((dataCountries) => {
        this.countries = dataCountries.items;
        this.catalogueSvc.get('MDV', 0, 10, { all: true }).subscribe((data) => {
          this.brands = data.items;
          if (this.data.data) {
            this.catalogueSvc
              .get('MODELDV', 0, 10, {
                all: true,
                id: this.data.data.model.id as number,
              })
              .subscribe((resModel) => {
                console.log('resModel', resModel);
                this.openBrand(resModel.items[0].catalogueParent?.id as number); // this.form.patchValue({
                this.form.patchValue({
                  brandId: resModel.items[0].catalogueParent?.id as number,
                  modelId: this.data.data.model.id,
                });
                //   brandId: this.data.data.model.catalogueParentId,
                //   modelId: this.data.data.model.id,
                // });
              });
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
              console.log('infoXd', data.user);
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
