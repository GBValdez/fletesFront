import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CatalogueRoutesInterface } from './catalogue.Interface';
import { inject } from '@angular/core';
import { ModelGasolineFormComponent } from '@drivers/pages/model-gasoline-form/model-gasoline-form.component';
import { catalogueInterface } from '@utils/commons.interface';
import { CatalogueFormComponent } from './catalogue-form/catalogue-form.component';

export const catalogueData: CatalogueRoutesInterface[] = [
  {
    title: 'Marca de vehículo',
    name: 'MDV',
  },
  {
    title: 'Modelo de vehículo',
    name: 'MODELDV',
    dependency: {
      name: 'Marca de vehículo',
      id: 'MDV',
    },
    afterComplete: (
      data: catalogueInterface,
      matDialog: MatDialog,
      matDialogRef: MatDialogRef<CatalogueFormComponent>
    ) => {
      matDialogRef.close({ modify: true });
      matDialog.open(ModelGasolineFormComponent, {
        data,
      });
    },
  },
  {
    title: 'Tipo de vehículo',
    name: 'TDV',
  },
  {
    title: 'Categoría de producto',
    name: 'CDP',
  },
  {
    title: 'Marca de producto',
    name: 'MDP',
  },
  {
    title: 'Tipo de gasolina',
    name: 'TGV',
  },
  { title: 'Roles', name: 'rol' },
];
