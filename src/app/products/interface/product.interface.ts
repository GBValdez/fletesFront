import { catalogueInterface } from '@utils/commons.interface';

export interface productDtoBase {
  name: string;
  description: string;
  weight: number;
}

export interface productDto extends productDtoBase {
  id: number;
  brandProduct: catalogueInterface;
  category: catalogueInterface;
}

export interface productDtoCreate extends productDtoBase {
  brandProductId: number;
  categoryId: number;
}
