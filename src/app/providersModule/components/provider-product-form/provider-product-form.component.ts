import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { providerProductDto } from '@providersModule/interface/provider-product.interface';
import { ProviderProductService } from '@providersModule/services/provider-product.service';
import { formModalDto } from '@utils/commons.interface';

@Component({
  selector: 'app-provider-product-form',
  standalone: true,
  imports: [],
  templateUrl: './provider-product-form.component.html',
  styleUrl: './provider-product-form.component.scss',
})
export class ProviderProductFormComponent {
  public dataInfo!: formModalDto;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: providerProductDto,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<ProviderProductFormComponent>,
    private svc: ProviderProductService,
    private routerAct: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // alert('ProviderFormComponent');
    this.dataInfo = {
      title: 'producto del proveedor',
      form: this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(250)]],
        nit: ['', [Validators.required, Validators.maxLength(8)]],
        address: ['', [Validators.required, Validators.maxLength(250)]],
        tel: ['', [Validators.required, Validators.maxLength(8)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      data: this.data,
      dialogRef: this.matDialog,
      post: this.svc.post.bind(this.svc),
      put: this.svc.put.bind(this.svc),
    };
  }
}
