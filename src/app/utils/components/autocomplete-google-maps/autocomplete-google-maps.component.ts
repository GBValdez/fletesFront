import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-autocomplete-google-maps',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './autocomplete-google-maps.component.html',
  styleUrl: './autocomplete-google-maps.component.scss',
})
export class AutocompleteGoogleMapsComponent implements AfterViewInit {
  @ViewChild('inputField') search!: ElementRef;
  autoComplete!: google.maps.places.Autocomplete;

  ngAfterViewInit(): void {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.search.nativeElement
    );
    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete.getPlace();
      console.log(place);
    });
  }
}
