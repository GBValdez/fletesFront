import { catalogueInterface } from '@utils/commons.interface';

interface modelGasolineDtoBase {
  gasolineLtsKm: number;
}

export interface modelGasolineDto extends modelGasolineDtoBase {
  gasolineType: catalogueInterface;
  model: catalogueInterface;
}

export interface modelGasolineDtoCreate extends modelGasolineDtoBase {
  gasolineTypeId: string;
  modelId: number;
}
