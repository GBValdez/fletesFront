import { Observable } from 'rxjs';
import { depCatalogueInterface } from './modules/catalogues/catalogue.Interface';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { sideMenuInterface } from './side-menu/side-menu.interface';

export interface catalogueInterface extends dtoCommons<number | string> {
  name: string;
  description: string;
  catalogueParentId?: number | string;
  catalogueParent?: catalogueInterface;
}

export interface catalogueChildInterface extends catalogueInterface {
  children?: catalogueInterface[];
}
export interface catalogueQuery {
  name?: string;
  all?: boolean;
  catalogueParentId?: number;
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

export interface dtoCommons<idClass> {
  id?: idClass;
}
export interface homeSvc {
  title: string;
  get(query: pagOptions<any>): Observable<pagDto<any>>;
  delete(id: number): Observable<any>;
  formComponent: any;
  submenu?: menuBasicInterface[];
}

export interface formModalDto {
  title: string;
  form: FormGroup;
  data?: any;
  dialogRef: MatDialogRef<any>;
  post: (data: any) => Observable<any>;
  put: (id: number, data: any) => Observable<any>;
  map?: (data: any) => any;
  mapEdit?: (data: any) => any;
  finalizeEdit?: () => void;
}

export interface menuBasicInterface {
  text: string;
  icon: string;
  click: clickTypeBasic;
}
export type clickTypeBasic = string | ((id: number) => void);
