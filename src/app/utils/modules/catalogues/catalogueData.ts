import { CatalogueRoutesInterface } from './catalogue.Interface';

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
];
