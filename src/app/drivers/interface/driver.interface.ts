import { catalogueInterface } from '@utils/commons.interface';
import { UserDto } from '@utils/modules/user/interface/user.interface';

interface driverDtoBase {
  name: string;
  nit: string;
  licensePlate: string;
  tel: string;
  email: string;
  address: string;
  openingTime: string;
  closingTime: string;
  stopLimit: number;
  maximumWeight: number;
}

export interface driverDto extends driverDtoBase {
  id: number;
  brand: catalogueInterface;
  model: catalogueInterface;
  user?: UserDto;
}

export interface driverCreateDto extends driverDtoBase {
  brandId: number;
  modelId: number;
  userId: number;
}
