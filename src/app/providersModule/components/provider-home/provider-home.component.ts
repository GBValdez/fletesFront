import { Component, OnInit } from '@angular/core';
import { ProviderService } from '@providersModule/services/provider.service';
import { homeSvc } from '@utils/commons.interface';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';
import { ProviderFormComponent } from '../provider-form/provider-form/provider-form.component';

@Component({
  selector: 'app-provider-home',
  standalone: true,
  imports: [HomeCmsComponent],
  templateUrl: './provider-home.component.html',
  styleUrl: './provider-home.component.scss',
})
export class ProviderHomeComponent implements OnInit {
  constructor(private svc: ProviderService) {}
  homeSvc!: homeSvc;
  ngOnInit(): void {
    this.homeSvc = {
      title: 'Proveedor',
      get: this.svc.get.bind(this.svc),
      delete: this.svc.delete.bind(this.svc),
      formComponent: ProviderFormComponent,
      submenu: [
        {
          text: 'Editar estaciones',
          click: '/session/station-home',
          icon: 'edit_location',
        },
        {
          text: 'Editar productos',
          click: '/session/provider-home/product',
          icon: 'shopping_cart',
        },
      ],
    };
  }
}
