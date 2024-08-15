import {
  Component,
  Inject,
  Injectable,
  input,
  InputSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { dtoCommons, formModalDto } from '@utils/commons.interface';
import { dtoToCreationDto } from '@utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cms',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './form-cms.component.html',
  styleUrl: './form-cms.component.scss',
})
export class FormCmsComponent {
  dataItem?: any;
  data: InputSignal<formModalDto> = input.required();
  constructor() {}

  ngOnInit(): void {
    this.dataItem = this.data().data;
    if (this.dataItem) {
      let DATA = JSON.parse(JSON.stringify(this.dataItem));
      delete DATA.id;
      DATA = dtoToCreationDto(DATA);
      console.log('DATA', DATA);
      this.data().form.patchValue(DATA);
    }
  }
  cleanForm() {
    const emptyValues: any = {};
    // Recorre todos los controles del formulario y establece cada uno a una cadena vacía
    Object.keys(this.data().form.controls).forEach((key) => {
      emptyValues[key] = ''; // Establece cada control a un valor vacío
    });

    this.data().form.patchValue(emptyValues);
    this.data().form.markAllAsTouched();
  }
  async onSubmit() {
    if (this.data().form.valid) {
      const result = Swal.fire({
        title: '¿Quieres guardar los cambios?',
        showCancelButton: true,
        confirmButtonText: `Guardar`,
        icon: 'question',
      });
      if ((await result).isConfirmed) {
        if (this.dataItem) {
          this.data()
            .put(this.dataItem.id!, this.data().form.value)
            .subscribe((res: any) => {
              this.closeDialog();
            });
        } else {
          this.data()
            .post(this.data().form.value)
            .subscribe((res: any) => {
              this.closeDialog();
            });
        }
      }
    }
  }

  async closeDialog() {
    await Swal.fire({
      title: 'La operación se realizo con éxito',
      icon: 'success',
      confirmButtonText: `Aceptar`,
    });
    this.data().dialogRef.close({
      modify: true,
    });
  }
}
