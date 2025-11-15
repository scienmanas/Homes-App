import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from '../../services/housing';
import { HousingLocationInfo } from '../housing-location/housing-location';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationService = inject(Housing);
  housingLocation = signal<HousingLocationInfo | undefined>(undefined);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    // this.housingLocation = this.housingLocationService.getHousingLocationById(housingLocationId);

    this.housingLocationService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        if (housingLocation.status === 'success') {
          console.log(`Fetched the housing location details with id: ${housingLocationId}`);
          console.log(housingLocation.location);
          this.housingLocation.set(housingLocation.location);
        } else {
          console.log(
            `Error encountered fecthing the location details with id ${housingLocationId}`
          );
        }
      });
  }

  // Form submit function
  submitApplication() {
    this.housingLocationService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
