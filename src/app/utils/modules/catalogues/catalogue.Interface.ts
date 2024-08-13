export interface CatalogueRoutesInterface {
  title: string;
  name: string;
  dependency?: depCatalogueInterface;
}

export interface depCatalogueInterface {
  name: string;
  id: string;
}
