import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  modelGasolineDto,
  modelGasolineDtoCreate,
} from '@drivers/interface/modelGasoline.inteface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class ModelGasolineService extends CommonsSvcService<
  modelGasolineDto,
  modelGasolineDtoCreate
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'modelGasoline';
  }
}
