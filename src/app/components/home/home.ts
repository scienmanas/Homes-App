import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HousingLocation, HousingLocationInfo } from '../housing-location/housing-location';
import { Housing } from '../../services/housing';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home  {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: Housing = inject(Housing);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  filteredLocationList: HousingLocationInfo[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor() {
    this.housingService
      .getAllHousingLocation()
      .then((result: { locations: HousingLocationInfo[]; status: 'success' | 'fail' }) => {
        if (result.status === 'success' && Array.isArray(result.locations)) {
          this.housingLocationList = result.locations;
          this.filteredLocationList = result.locations;
          console.log(`Data fetched successfully (total items): ${result.locations.length}`);
          // Ensure change detection runs immediately (some fetch/Promise combos may run outside Zone)
          this.cdr.detectChanges();
        }
      })
      .catch((error) => {
        console.error('Error loading housing locations:', error);
      });
  }
}
