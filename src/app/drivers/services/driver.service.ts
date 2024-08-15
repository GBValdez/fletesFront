import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  driverCreateDto,
  driverDto,
} from '@drivers/interface/driver.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class DriverService extends CommonsSvcService<
  driverDto,
  driverCreateDto
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'driver';
  }
}
