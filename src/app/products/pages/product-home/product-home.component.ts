import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { homeSvc } from '@utils/commons.interface';
import { ProductFormComponentComponent } from '../product-form-component/product-form-component.component';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';

@Component({
  selector: 'app-product-home',
  standalone: true,
  imports: [HomeCmsComponent],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss',
})
export class ProductHomeComponent implements OnInit {
  constructor(private svc: ProductService) {}
  homeSvc!: homeSvc;
  ngOnInit(): void {
    this.homeSvc = {
      title: 'Producto',
      get: this.svc.get.bind(this.svc),
      delete: this.svc.delete.bind(this.svc),
      formComponent: ProductFormComponentComponent,
      submenu: [
        {
          text: 'Vehiculos Compatibles',
          icon: 'directions_car',
          click: '/session/product-home/vehicle',
        },
      ],
    };
  }
}
