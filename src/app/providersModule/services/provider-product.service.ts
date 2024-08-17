import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  providerProductDto,
  providerProductDtoCreation,
} from '@providersModule/interface/provider-product.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderProductService extends CommonsSvcService<
  providerProductDto,
  providerProductDtoCreation
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'productProvider';
  }
}
