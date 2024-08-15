import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  providerDto,
  providerDtoCreation,
} from '@providersModule/interface/provider.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderService extends CommonsSvcService<
  providerDto,
  providerDtoCreation
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'provider';
  }
}
