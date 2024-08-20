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
import { productDto } from '@product/interface/product.interface';
import { ProductService } from '@product/services/product.service';
import {
  providerProductDto,
  providerProductDtoCreation,
} from '@providersModule/interface/provider-product.interface';
import { ProviderProductService } from '@providersModule/services/provider-product.service';
import { formModalDto, infoModalDto } from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';

@Component({
  selector: 'app-provider-product-form',
  standalone: true,
  imports: [
    FormCmsComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    OnlyNumberInputDirective,
  ],
  templateUrl: './provider-product-form.component.html',
  styleUrl: './provider-product-form.component.scss',
})
export class ProviderProductFormComponent {
  public dataInfo!: formModalDto;
  form!: FormGroup;
  products: productDto[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: infoModalDto<providerProductDto>,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<ProviderProductFormComponent>,
    private svc: ProviderProductService,
    private productSvc: ProductService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      productId: [
        { value: null, disabled: this.data.data != undefined },
        Validators.required,
      ],
      price: [null, [Validators.required, Validators.min(0.001)]],
    });

    this.productSvc
      .get({ all: true, pageNumber: 0, pageSize: 10 })
      .subscribe((res) => {
        this.products = res.items;

        this.dataInfo = {
          title: 'producto del proveedor',
          form: this.form,
          data: this.data.data,
          dialogRef: this.matDialog,
          post: this.svc.post.bind(this.svc),
          put: this.svc.put.bind(this.svc),
          map: (data: providerProductDtoCreation) => {
            if (this.data.data) {
              data.productId = this.data.data.product.id;
            }
            data.providerId = this.data.routerAct.snapshot.params['id'];

            return data;
          },
        };
      });
    // alert('ProviderFormComponent');
  }
}
