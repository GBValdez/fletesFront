import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  prodVehicleDto,
  prodVehicleDtoCreate,
} from '@product/interface/productVehicle.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class ProductVehicleService extends CommonsSvcService<
  prodVehicleDto,
  prodVehicleDtoCreate
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'productVehicle';
  }
}
