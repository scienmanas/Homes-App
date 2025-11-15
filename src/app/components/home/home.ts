import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { HousingLocation, HousingLocationInfo } from '../housing-location/housing-location';
import { Housing } from '../../services/housing';
import { signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  housingLocationList = signal<HousingLocationInfo[]>([]);
  filteredLocationList = signal<HousingLocationInfo[]>([]);
  // housingLocationList: HousingLocationInfo[] = []
  // filteredLocationList: HousingLocationInfo[] = []
  housingService: Housing = inject(Housing);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  // filterResults(text: string) {
  //   if (!text) {
  //     this.filteredLocationList = this.housingLocationList;
  //     return;
  //   }

  //   this.filteredLocationList = this.housingLocationList.filter((housingLocation: HousingLocationInfo) =>
  //     housingLocation.city.toLowerCase().includes(text.toLowerCase())
  //   );
  // }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList.set(this.housingLocationList());
      return;
    }

    const filteredList = this.filteredLocationList().filter(
      (housingLocation: HousingLocationInfo) =>
        housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );

    this.filteredLocationList.set(filteredList);
  }

  constructor() {
    this.housingService
      .getAllHousingLocation()
      .then((result: { locations: HousingLocationInfo[]; status: 'success' | 'fail' }) => {
        if (result.status === 'success' && Array.isArray(result.locations)) {
          this.housingLocationList.set(result.locations);
          this.filteredLocationList.set(result.locations);
          // this.housingLocationList = result.locations
          // this.filteredLocationList = result.locations
          console.log(`Data fetched successfully (total items): ${result.locations.length}`);
          // Ensure change detection runs immediately (some fetch/Promise combos may run outside Zone)
          // this.cdr.detectChanges();
        }
      })
      .catch((error) => {
        console.error('Error loading housing locations:', error);
      });
  }
}
