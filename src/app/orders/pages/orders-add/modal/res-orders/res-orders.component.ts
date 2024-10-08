import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  resBestRouteDto,
  resBestRouteModalDto,
  visitDto,
  visitProductDto,
} from '@drivers/interface/visit.interface';
import { ModalResDetaillComponent } from '../modal-res-detaill/modal-res-detaill.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-res-orders',
  standalone: true,
  imports: [GoogleMapsModule, MatCardModule, MatDialogModule, MatButtonModule],
  templateUrl: './res-orders.component.html',
  styleUrl: './res-orders.component.scss',
})
export class ResOrdersComponent implements OnInit, AfterViewInit {
  totalDistance: number = 0;
  @ViewChild(GoogleMap) googleMaps!: GoogleMap;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: resBestRouteModalDto,
    private dialogRef: MatDialogRef<ResOrdersComponent>,
    private matDialog: MatDialog
  ) {}
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
          this.totalDistance = 0;
          console.log(result);
          if (result)
            result.routes[0].legs.forEach((leg) => {
              this.totalDistance += leg!.distance!.value / 1000;
            });
        }
      }
    );
  }
  ngOnInit(): void {
    this.center = this.convertLatLng(this.data.bestRoute.originCoord);
    this.dialogRef.afterClosed().subscribe(() => {
      const dataPro: visitProductDto[] = [];
      const providersId: number[] = [
        ...new Set(
          this.data.bestRoute.routes.map((route) => {
            return route.station.provider.id!;
          })
        ),
      ];
      providersId.forEach((id) => {
        let currentStation: visitDto[] = this.data.bestRoute.routes.filter(
          (route) => route.station.provider.id === id
        );
        let productsId: number[] = currentStation
          .map((route) => {
            return route.visitProducts.map((product) => {
              return product.ordenDetail.product.id!;
            });
          })
          .flat();
        productsId = [...new Set(productsId)];
        productsId.forEach((id) => {
          let currentProduct: visitProductDto[] = currentStation
            .map((route) => {
              return route.visitProducts.filter(
                (product) => product.ordenDetail.product.id === id
              );
            })
            .flat();
          let quantity = currentProduct.reduce((acc, curr) => {
            return acc + curr.quantity;
          }, 0);

          dataPro.push({
            id: id,
            ordenDetail: currentProduct[0].ordenDetail,
            price: currentProduct[0].price,
            quantity: quantity,
          });
        });
      });

      // this.data.bestRoute.routes
      //   .map((route) => {
      //     return route.visitProducts;
      //   })
      //   .flat();
      this.matDialog.open(ModalResDetaillComponent, {
        data: dataPro,
      });
    });
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

  total(distance: number) {
    return (
      distance *
      this.data.bestRoute.driver.modelGasoline.gasolineLtsKm *
      Number(this.data.bestRoute.driver.modelGasoline.gasolineType.description)
    );
  }

  showAll(message: string) {
    alert(message);
  }
}
