import { productDto } from '@product/interface/product.interface';
import { providerDto } from './provider.interface';

interface providerProductDtoBase {
  price: number;
}

export interface providerProductDto extends providerProductDtoBase {
  product: productDto;
  provider: providerDto;
}

export interface providerProductDtoCreation extends providerProductDtoBase {
  productId: number;
  providerId: number;
}
