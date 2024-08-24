import { NgStyle } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { productDtoBuy } from '@product/interface/product.interface';
import { ModalProductBuyComponent } from '../modal-product-buy/modal-product-buy.component';
import { LocalStorageService } from '@utils/local-storage.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  constructor(
    private matDialog: MatDialog,
    private localStorageSvc: LocalStorageService
  ) {}
  product: InputSignal<productDtoBuy> = input.required();
  eventQuantity: OutputEmitterRef<productDtoBuy> = output<productDtoBuy>();

  toUrl(url: string) {
    return `url(${url})`;
  }

  clickProduct() {
    this.matDialog
      .open(ModalProductBuyComponent, {
        data: this.product(),
        width: '30%',
        minWidth: '300px',
      })
      .afterClosed()
      .subscribe((res) => {
        const productsCar =
          this.localStorageSvc.getItem<productDtoBuy[]>('productsCar') || [];
        const product = productsCar.find((p) => p.id === this.product().id);
        if (product) {
          if (this.product().quantity == 0) {
            productsCar.splice(productsCar.indexOf(product), 1);
          } else {
            product.quantity = this.product().quantity;
          }
        } else if (this.product().quantity > 0) {
          productsCar.push(this.product());
        }
        this.localStorageSvc.setItem('productsCar', productsCar);
        this.eventQuantity.emit(this.product());
      });
  }
}
