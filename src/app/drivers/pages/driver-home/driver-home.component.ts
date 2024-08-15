import { Component } from '@angular/core';
import { DriverService } from '@drivers/services/driver.service';
import { homeSvc } from '@utils/commons.interface';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';

@Component({
  selector: 'app-driver-home',
  standalone: true,
  imports: [HomeCmsComponent],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.scss',
})
export class DriverHomeComponent {
  constructor(private svc: DriverService) {}
  homeSvc!: homeSvc;
  ngOnInit(): void {
    this.homeSvc = {
      title: 'Repartidores',
      get: this.svc.get.bind(this.svc),
      delete: this.svc.delete.bind(this.svc),
      formComponent: DriverFormComponent,
    };
  }
}
