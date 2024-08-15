import { Injectable } from '@angular/core';
import { CommonsSvcService } from '@utils/commons-svc.service';
import { stationDto, stationDtoCreate } from '../interface/station.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StationService extends CommonsSvcService<
  stationDto,
  stationDtoCreate
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'station';
  }
}
