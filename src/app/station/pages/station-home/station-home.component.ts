import { Component } from '@angular/core';
import { StationService } from '../../services/station.service';
import { homeSvc } from '@utils/commons.interface';
import { StationFormComponent } from '../station-form/station-form.component';
import { HomeCmsComponent } from '@utils/components/home-cms/home-cms.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-station-home',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './station-home.component.html',
  styleUrl: './station-home.component.scss',
})
export class StationHomeComponent {}
