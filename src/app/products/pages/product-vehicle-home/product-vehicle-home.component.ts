import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductVehicleService } from '@product/services/product-vehicle.service';
import { homeSvc } from '@utils/commons.interface';
import { ProductVehicleFormComponent } from '../product-vehicle-form/product-vehicle-form.component';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';
import { ProductService } from '@product/services/product.service';

@Component({
  selector: 'app-product-vehicle-home',
  standalone: true,
  imports: [HomeCmsComponent],
  templateUrl: './product-vehicle-home.component.html',
  styleUrl: './product-vehicle-home.component.scss',
})
export class ProductVehicleHomeComponent implements OnInit {
  constructor(
    private svc: ProductVehicleService,
    private actRoute: ActivatedRoute,
    private productSvc: ProductService
  ) {}
  homeSvc!: homeSvc;
  ngOnInit(): void {
    const productId = this.actRoute.snapshot.params['id'];
    this.homeSvc = {
      title: 'Compatibilidad de vehículos',
      get: this.svc.get.bind(this.svc),
      delete: this.svc.delete.bind(this.svc),
      formComponent: ProductVehicleFormComponent,
      query: { Id: productId },
    };
    this.productSvc
      .get({ query: { Id: productId }, pageNumber: 1, pageSize: 10 })
      .subscribe((res) => {
        this.homeSvc.title = `Compatibilidad de vehículos "${res.items[0].name}"`;
      });
  }
}
