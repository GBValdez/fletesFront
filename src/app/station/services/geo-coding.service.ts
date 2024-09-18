import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GeoCodeRes } from './geo-coding.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoCodingService {
  url: string = `${environment.api}/googleMaps`;
  constructor(private http: HttpClient) {}

  getCountryFromCoordinates(
    latitude: number,
    longitude: number
  ): Observable<GeoCodeRes> {
    const params = new HttpParams().set('lat', latitude).set('lng', longitude);
    return this.http.get<GeoCodeRes>(`${this.url}/get-country`, { params });
  }
}
