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
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { AutocompleteGoogleMapsComponent } from '@utils/components/autocomplete-google-maps/autocomplete-google-maps.component';
import { OrdersService } from '@orders/services/orders.service';
import { orderDtoCreation } from '@orders/interface/order.interface';

@Component({
  selector: 'app-modal-car',
  standalone: true,
  imports: [
    CardProductComponent,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule,
    AutocompleteGoogleMapsComponent,
  ],
  templateUrl: './modal-car.component.html',
  styleUrl: './modal-car.component.scss',
})
export class ModalCarComponent implements OnInit {
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  cords?: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom: number = 4;
  constructor(
    @Inject(MAT_DIALOG_DATA) public myProducts: productDtoBuy[],
    private dialogRef: MatDialogRef<ModalCarComponent>,
    private localStorageSvc: LocalStorageService,
    private orderSvc: OrdersService
  ) {}
  autoComplete(event: google.maps.LatLng): void {
    this.center = event.toJSON();
    this.cords = event.toJSON();
    this.zoom = 15;
  }
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
      const CORDS = `${this.cords?.lat},${this.cords?.lng}`;
      const DATA: orderDtoCreation = {
        deliveryCoord: CORDS,
        orderDetails: this.myProducts.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
        })),
      };
      this.orderSvc.createOrder(DATA).subscribe((res) => {
        this.emptyCar('Compra realizada con éxito');
      });
    }
  }

  emptyCar(message: string) {
    Swal.fire(message);
    this.dialogRef.close();
    this.localStorageSvc.removeItem('productsCar');
    this.myProducts.forEach((product) => (product.quantity = 0));
  }

  async canEmptyCar() {
    const res = await Swal.fire({
      title: '¿Estás seguro de vaciar el carrito?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question',
    });
    if (res.isConfirmed) {
      this.emptyCar('Carrito vaciado con éxito');
    }
  }
  clickMap(event: google.maps.MapMouseEvent): void {
    const cords: google.maps.LatLngLiteral = event.latLng!.toJSON();
    this.cords = cords;
    console.log(cords);
  }
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.cords = this.center;
        this.zoom = 16;
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
