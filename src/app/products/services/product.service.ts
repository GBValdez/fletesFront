import { Injectable } from '@angular/core';
import { CommonsSvcService } from '@utils/commons-svc.service';
import { productDto, productDtoCreate } from '../interface/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CommonsSvcService<
  productDto,
  productDtoCreate
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'product';
  }
}
