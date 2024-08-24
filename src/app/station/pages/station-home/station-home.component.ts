import { Component, OnInit } from '@angular/core';
import { StationService } from '../../services/station.service';
import { homeSvc, infoModalDto } from '@utils/commons.interface';
import { StationFormComponent } from '../station-form/station-form.component';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import {} from '@angular/google-maps';
import {
  stationDto,
  stationDtoCreate,
} from '@station/interface/station.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '@providersModule/services/provider.service';
import { AutocompleteGoogleMapsComponent } from '@utils/components/autocomplete-google-maps/autocomplete-google-maps.component';

@Component({
  selector: 'app-station-home',
  standalone: true,
  imports: [GoogleMapsModule, AutocompleteGoogleMapsComponent],
  templateUrl: './station-home.component.html',
  styleUrl: './station-home.component.scss',
})
export class StationHomeComponent implements OnInit {
  providerName: string = '';
  constructor(
    private matDialog: MatDialog,
    private routerAct: ActivatedRoute,
    private stationSvc: StationService,
    private providerSvc: ProviderService
  ) {}
  ngOnInit(): void {
    const providerId = this.routerAct.snapshot.params['id'];

    setTimeout(() => {
      this.getData();
    }, 1000);
    this.providerSvc
      .get({ query: { Id: providerId }, pageNumber: 1, pageSize: 10 })
      .subscribe((res) => {
        this.providerName = res.items[0].name;
      });
  }
  stations: stationDto[] = [];
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  convertLatLng(latlng: string): google.maps.LatLng {
    const [lat, lng] = latlng.split(',');
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }

  getData(): void {
    this.stationSvc
      .get({ all: true, pageNumber: 0, pageSize: 10 })
      .subscribe((res) => {
        this.stations = res.items;
      });
  }

  clickMap(event: google.maps.MapMouseEvent): void {
    const cords: string = event
      .latLng!.toString()
      .replace('(', '')
      .replace(')', '');
    const DATA: any = {
      cord: cords,
      id: -1,
    };
    this.openModal(DATA);
  }

  openModal(station: stationDto): void {
    const DATA: infoModalDto<stationDto> = {
      routerAct: this.routerAct,
      data: station,
    };
    const dialogRef = this.matDialog
      .open(StationFormComponent, {
        data: DATA,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res?.modify) {
          this.getData();
        }
      });
  }
}
