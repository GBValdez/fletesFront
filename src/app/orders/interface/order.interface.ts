import { driverDto } from '@drivers/interface/driver.interface';
import { productDto } from '@product/interface/product.interface';
import { clienteDto } from '@utils/modules/user/interface/user.interface';

interface orderDtoBase {
  deliveryCoord: string;
}

export interface orderDto extends orderDtoBase {
  originCoord: string;
  deliveryDate: Date;
  client: clienteDto;
  driver: driverDto;
  orderDetails: orderDetailDto[];
}

export interface orderDtoCreation extends orderDtoBase {
  orderDetails: orderDetailDtoCreation[];
}

interface orderDetailDtoBase {
  quantity: number;
}

export interface orderDetailDto extends orderDetailDtoBase {
  product: productDto;
}

export interface orderDetailDtoCreation extends orderDetailDtoBase {
  productId: number;
}
