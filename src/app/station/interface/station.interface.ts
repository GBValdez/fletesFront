import { providerDto } from '@providersModule/interface/provider.interface';
import { catalogueInterface } from '@utils/commons.interface';

interface stationDtoBase {
  cord: string;
  openingTime: string;
  closingTime: string;
  tel: string;
  email: string;
}

export interface stationDto extends stationDtoBase {
  id: number;
  provider: providerDto;
  country: catalogueInterface;
}

export interface stationDtoCreate extends stationDtoBase {
  providerId: number;
}
