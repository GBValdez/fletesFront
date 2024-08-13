import { depCatalogueInterface } from './modules/catalogues/catalogue.Interface';

export interface catalogueInterface {
  id?: number | string;
  name: string;
  description: string;
  catalogueParentId?: number | string;
  catalogueParent?: catalogueInterface;
}
export interface catalogueQuery {
  nameCont?: string;
  all?: boolean;
}

export interface catalogueModal {
  typeCatalogue: string;
  title: string;
  catalogue?: catalogueInterface;
  dependency?: depCatalogueInterface;
}
export interface pagDto<T> {
  items: T[];
  total: number;
  index: number;
  totalPages: number;
}

export interface pagOptions<t> {
  pageSize?: number;
  pageNumber?: number;
  query?: t;
  all?: boolean;
}

export interface localStorExp {
  key: string;
  exp: Date | null;
}
