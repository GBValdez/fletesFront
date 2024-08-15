import { dtoCommons } from '@utils/commons.interface';

export interface providerDtoCreation {
  name: string;
  description?: string;
  nit: string;
  address: string;
  tel: string;
  email: string;
}

export interface providerDto extends dtoCommons<number>, providerDtoCreation {}
