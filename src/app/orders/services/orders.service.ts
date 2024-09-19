import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resBestRouteDto } from '@drivers/interface/visit.interface';
import { orderDto, orderDtoCreation } from '@orders/interface/order.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends CommonsSvcService<
  orderDto,
  orderDtoCreation
> {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'Order';
  }

  createOrder(order: orderDtoCreation): Observable<resBestRouteDto> {
    return this.http.post<resBestRouteDto>(
      `${this.urlBase}/createOrder`,
      order
    );
  }
}
