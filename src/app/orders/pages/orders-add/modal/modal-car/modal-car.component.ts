import {
  Component,
  effect,
  Inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { productDtoBuy } from '@product/interface/product.interface';
import { LocalStorageService } from '@utils/local-storage.service';
import { CardProductComponent } from '../card-product/card-product.component';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-car',
  standalone: true,
  imports: [
    CardProductComponent,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './modal-car.component.html',
  styleUrl: './modal-car.component.scss',
})
export class ModalCarComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public myProducts: productDtoBuy[],
    private dialogRef: MatDialogRef<ModalCarComponent>,
    private localStorageSvc: LocalStorageService
  ) {}
  ngOnInit(): void {}
  afterEdit(product: productDtoBuy) {
    const productsCar = this.myProducts;
    const productCar = productsCar.find((p) => p.id === product.id);
    if (productCar) {
      if (product.quantity == 0) {
        productsCar.splice(productsCar.indexOf(productCar), 1);
      } else {
        productCar.quantity = product.quantity;
      }
    }
    this.myProducts = productsCar;
  }

  async imitateBuy() {
    const res = await Swal.fire({
      title: '¿Estás seguro de realizar la compra?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question',
    });
    if (res.isConfirmed) {
      Swal.fire('Compra realizada con éxito', '', 'success');
      this.dialogRef.close();
      this.localStorageSvc.removeItem('productsCar');
      this.myProducts.forEach((product) => (product.quantity = 0));
    }
  }
}
