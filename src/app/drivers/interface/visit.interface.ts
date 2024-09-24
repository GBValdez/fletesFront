import { orderDetailDto, orderDto } from '@orders/interface/order.interface';
import { stationDto } from '@station/interface/station.interface';
import { modelGasolineDto } from './modelGasoline.inteface';

interface visitProductDtoBase {
  quantity: number;
}

export interface visitProductDto extends visitProductDtoBase {
  id: number;
  ordenDetail: orderDetailDto;
  price: number;
}

interface visitDtoBase {
  estimatedTime: Date;
  realDate: Date;
  arrivalDate: Date;
  stationId: number;
}

export interface visitDto extends visitDtoBase {
  id: number;
  station: stationDto;
  visitProducts: visitProductDto[];
  order: orderDto;
}

export interface driverGasolineDemoDto {
  id: number;
  modelGasoline: modelGasolineDto;
}

export interface foundOrderDemoDto {
  routes: visitDto[];
  driver: driverGasolineDemoDto;
  costTotal: number;
  durationTotal: number;
  ultimeCord: string;
  originCoord: string;
}

export interface resBestRouteDto {
  routes: foundOrderDemoDto[];
  bestRoute: foundOrderDemoDto;
  stations: stationDto[];
}

export interface resBestRouteModalDto extends resBestRouteDto {
  deliveryCord: string;
}
