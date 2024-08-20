import { Component, OnInit } from '@angular/core';
import { ProviderProductService } from '@providersModule/services/provider-product.service';
import { homeSvc } from '@utils/commons.interface';
import { ProviderProductFormComponent } from '../provider-product-form/provider-product-form.component';
import { ActivatedRoute } from '@angular/router';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';
import { ProviderService } from '@providersModule/services/provider.service';

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
    private actRoute: ActivatedRoute,
    private providerSvc: ProviderService
  ) {}
  homeSvc!: homeSvc;
  ngOnInit(): void {
    const providerId = this.actRoute.snapshot.params['id'];
    // console.log('ProviderProductHomeComponent', providerId);
    this.homeSvc = {
      title: 'Producto del proveedor',
      get: this.svc.get.bind(this.svc),
      delete: this.svc.delete.bind(this.svc),
      formComponent: ProviderProductFormComponent,
      query: { Id: providerId },
    };
    this.providerSvc
      .get({ query: { Id: providerId }, pageNumber: 1, pageSize: 10 })
      .subscribe((res) => {
        this.homeSvc.title = `Producto del proveedor "${res.items[0].name}"`;
      });
  }
}
