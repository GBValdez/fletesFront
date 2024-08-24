import { catalogueInterface } from '@utils/commons.interface';

export interface productDtoBase {
  name: string;
  description: string;
  weight: number;
  imgUrl: string;
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

export interface productDtoBuy extends productDto {
  quantity: number;
}
