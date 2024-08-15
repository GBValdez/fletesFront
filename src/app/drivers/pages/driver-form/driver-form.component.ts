import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { driverDto } from '@drivers/interface/driver.interface';
import { DriverService } from '@drivers/services/driver.service';
import { formModalDto } from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { TimeRangeComponent } from '@utils/components/time-range/time-range.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';

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
  ],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss',
})
export class DriverFormComponent implements OnInit {
  public dataInfo!: formModalDto;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: driverDto,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<DriverFormComponent>,
    private svc: DriverService
  ) {}
  ngOnInit(): void {
    // alert('ProviderFormComponent');
    this.dataInfo = {
      title: 'proveedor',
      form: this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        nit: ['', [Validators.required, Validators.maxLength(8)]],
        licensePlate: ['', [Validators.required, Validators.maxLength(8)]],
        tel: ['', [Validators.required, Validators.maxLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.maxLength(250)]],
        openingTime: ['', [Validators.required]],
        closingTime: ['', [Validators.required]],
        maximumWeight: ['', [Validators.required]],
      }),
      data: this.data,
      dialogRef: this.matDialog,
      post: this.svc.post.bind(this.svc),
      put: this.svc.put.bind(this.svc),
    };
  }
}
