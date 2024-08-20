import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { providerDto } from '@providersModule/interface/provider.interface';
import { ProviderService } from '@providersModule/services/provider.service';
import { formModalDto, infoModalDto } from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';

@Component({
  selector: 'app-provider-form',
  standalone: true,
  imports: [
    FormCmsComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
  ],
  templateUrl: './provider-form.component.html',
  styleUrl: './provider-form.component.scss',
})
export class ProviderFormComponent implements OnInit {
  public dataInfo!: formModalDto;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: infoModalDto<providerDto>,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<ProviderFormComponent>,
    private svc: ProviderService
  ) {}
  ngOnInit(): void {
    // alert('ProviderFormComponent');
    this.dataInfo = {
      title: 'proveedor',
      form: this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(250)]],
        nit: ['', [Validators.required, Validators.maxLength(8)]],
        address: ['', [Validators.required, Validators.maxLength(250)]],
        tel: ['', [Validators.required, Validators.maxLength(8)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      data: this.data.data,
      dialogRef: this.matDialog,
      post: this.svc.post.bind(this.svc),
      put: this.svc.put.bind(this.svc),
    };
  }
}
