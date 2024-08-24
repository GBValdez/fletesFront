import { NgStyle } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { productDtoBuy } from '@product/interface/product.interface';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-modal-product-buy',
  standalone: true,
  imports: [
    NgStyle,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './modal-product-buy.component.html',
  styleUrl: './modal-product-buy.component.scss',
})
export class ModalProductBuyComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: productDtoBuy,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: [this.data.quantity],
    });
    this.form.get('quantity')?.valueChanges.subscribe((res) => {
      if (typeof res === 'string' && res.length > 0) {
        // Eliminar ceros a la izquierda
        const valueWithoutLeadingZeros = res.replace(/^0+/, '');

        // Si el valor es vacío después de eliminar ceros, ponerlo en 0
        if (valueWithoutLeadingZeros === '') {
          this.form.get('quantity')?.setValue(0, { emitEvent: false });
        } else {
          this.form
            .get('quantity')
            ?.setValue(valueWithoutLeadingZeros, { emitEvent: false });
        }
      }

      // Verificaciones adicionales para el rango de valores
      let currentValue = this.form.get('quantity')?.value;
      if (currentValue == '') {
        currentValue = 0;
        this.form.get('quantity')?.setValue(0, { emitEvent: false });
      }

      if (currentValue < 0) {
        this.form.get('quantity')?.setValue(0, { emitEvent: false });
      } else if (currentValue > 99999) {
        this.form.get('quantity')?.setValue(99999, { emitEvent: false });
      }

      // Actualizar el valor de la data
      this.data.quantity = this.form.get('quantity')?.value;
    });
  }
  toUrl(url: string) {
    return `url(${url})`;
  }
  pressButton(quantity: number) {
    this.form
      .get('quantity')
      ?.setValue(Number(this.form.get('quantity')?.value) + quantity);
  }
  reset() {
    this.form.get('quantity')?.setValue(0);
  }
}
