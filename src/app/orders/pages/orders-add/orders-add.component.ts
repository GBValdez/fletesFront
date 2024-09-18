import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  productDto,
  productDtoBuy,
} from '@product/interface/product.interface';
import { ProductService } from '@product/services/product.service';
import { ModalProductBuyComponent } from './modal/modal-product-buy/modal-product-buy.component';
import { LocalStorageService } from '@utils/local-storage.service';
import { CardProductComponent } from './modal/card-product/card-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalCarComponent } from './modal/modal-car/modal-car.component';

@Component({
  selector: 'app-orders-add',
  standalone: true,
  imports: [
    MatCardModule,
    NgStyle,
    CardProductComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './orders-add.component.html',
  styleUrl: './orders-add.component.scss',
})
export class OrdersAddComponent implements OnInit {
  products: productDtoBuy[] = [];
  constructor(
    private productSvc: ProductService,
    private localStorageSvc: LocalStorageService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const productSaved =
      this.localStorageSvc.getItem<productDtoBuy[]>('productsCar');
    this.productSvc.get({ pageNumber: 1, pageSize: 10 }).subscribe((res) => {
      this.products = res.items.map((item) => {
        let quantity = 0;
        if (productSaved) {
          const product = productSaved.find((p) => p.id === item.id);
          if (product) {
            quantity = product.quantity;
          }
        }
        return {
          ...item,
          quantity: quantity,
        };
      });
    });
  }
  openCar() {
    this.dialog.open(ModalCarComponent, {
      width: '80%',
      minWidth: '300px',
      data: this.products.filter((product) => product.quantity > 0),
    });
  }

  anyQuantity() {
    return this.products.some((product) => product.quantity > 0);
  }
}
