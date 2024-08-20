import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { productDto } from '@product/interface/product.interface';
import { ProductService } from '@product/services/product.service';
import {
  catalogueInterface,
  formModalDto,
  infoModalDto,
} from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';
import { CatalogueService } from '@utils/modules/catalogues/services/catalogue.service';

@Component({
  selector: 'app-product-form-component',
  standalone: true,
  imports: [
    FormCmsComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    MatSelectModule,
  ],
  templateUrl: './product-form-component.component.html',
  styleUrl: './product-form-component.component.scss',
})
export class ProductFormComponentComponent {
  public dataInfo!: formModalDto;
  categories: catalogueInterface[] = [];
  brands: catalogueInterface[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: infoModalDto<productDto>,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<ProductFormComponentComponent>,
    private svc: ProductService,
    private catalogueSvc: CatalogueService
  ) {}

  ngOnInit(): void {
    this.dataInfo = {
      title: 'Producto',
      form: this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(250)]],
        weight: ['', [Validators.required]],
        brandProductId: ['', [Validators.required]],
        categoryId: ['', [Validators.required]],
      }),
      data: this.data.data,
      dialogRef: this.matDialog,
      post: this.svc.post.bind(this.svc),
      put: this.svc.put.bind(this.svc),
    };
    this.catalogueSvc.get('MDP', 0, 0, {}, true).subscribe((res) => {
      this.brands = res.items;
    });
    this.catalogueSvc.get('CDP', 0, 0, {}, true).subscribe((res) => {
      this.categories = res.items;
    });
  }
}
