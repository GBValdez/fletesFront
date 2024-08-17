import { Component, OnInit } from '@angular/core';
import { ProviderProductService } from '@providersModule/services/provider-product.service';
import { homeSvc } from '@utils/commons.interface';
import { ProviderProductFormComponent } from '../provider-product-form/provider-product-form.component';
import { ActivatedRoute } from '@angular/router';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';

@Component({
  selector: 'app-provider-product-home',
  standalone: true,
  imports: [HomeCmsComponent],
  templateUrl: './provider-product-home.component.html',
  styleUrl: './provider-product-home.component.scss',
})
export class ProviderProductHomeComponent implements OnInit {
  constructor(
    private svc: ProviderProductService,
    private actRoute: ActivatedRoute
  ) {}
  homeSvc!: homeSvc;
  ngOnInit(): void {
    const providerId = this.actRoute.snapshot.params['id'];
    this.homeSvc = {
      title: 'Producto del proveedor',
      get: this.svc.get.bind(this.svc),
      delete: this.svc.delete.bind(this.svc),
      formComponent: ProviderProductFormComponent,
      query: { providerId },
    };
  }
}
