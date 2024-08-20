import { catalogueInterface } from '@utils/commons.interface';
import { productDto } from './product.interface';

interface prodVehicleDtoBase {
  quantity: number;
}
export interface prodVehicleDto extends prodVehicleDtoBase {
  id: number;
  product: productDto;
  typeVehicle: catalogueInterface;
}

export interface prodVehicleDtoCreate extends prodVehicleDtoBase {
  productId: number;
  typeVehicleId: number;
}
