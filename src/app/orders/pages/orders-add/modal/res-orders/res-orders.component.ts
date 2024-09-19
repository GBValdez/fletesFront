import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  resBestRouteDto,
  resBestRouteModalDto,
} from '@drivers/interface/visit.interface';

@Component({
  selector: 'app-res-orders',
  standalone: true,
  imports: [GoogleMapsModule, MatCardModule, MatDialogModule],
  templateUrl: './res-orders.component.html',
  styleUrl: './res-orders.component.scss',
})
export class ResOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) googleMaps!: GoogleMap;
  constructor(@Inject(MAT_DIALOG_DATA) public data: resBestRouteModalDto) {}
  ngAfterViewInit(): void {
    this.directionRenderer.setMap(this.googleMaps.googleMap!);
    let waypoints: google.maps.DirectionsWaypoint[] =
      this.data.bestRoute.routes.map((route) => {
        return {
          location: this.convertLatLng(route.station.cord),
          stopover: true,
        };
      });
    this.directionService.route(
      {
        origin: this.convertLatLng(this.data.bestRoute.originCoord),
        destination: this.convertLatLng(this.data.deliveryCord),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionRenderer.setDirections(result);
        }
      }
    );
  }
  ngOnInit(): void {
    this.center = this.convertLatLng(this.data.bestRoute.originCoord);
  }
  directionService = new google.maps.DirectionsService();
  directionRenderer = new google.maps.DirectionsRenderer();

  stationIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red', // Color de relleno
    fillOpacity: 0.8, // Opacidad del relleno
    strokeWeight: 2, // Ancho del borde
    strokeColor: 'black', // Color del borde
    scale: 6, // Tamaño del marcador
  };
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  center!: google.maps.LatLng;
  zoom: number = 16;
  convertLatLng(latlng: string): google.maps.LatLng {
    const [lat, lng] = latlng.split(',');
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }
}
