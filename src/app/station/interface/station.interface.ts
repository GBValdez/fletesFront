import { providerDto } from '@providersModule/interface/provider.interface';

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
}

export interface stationDtoCreate extends stationDtoBase {
  providerId: number;
}
