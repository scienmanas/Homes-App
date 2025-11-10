import { Injectable } from '@angular/core';
import { HousingLocationInfo } from '../components/housing-location/housing-location';

@Injectable({
  providedIn: 'root',
})
export class Housing {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  readonly url = 'http://localhost:3000/locations';
  // List - housing location
  housingLocationList: HousingLocationInfo[] = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true,
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false,
    },
    {
      id: 3,
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 4,
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 5,
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 6,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnits: 5,
      wifi: true,
      laundry: true,
    },
    {
      id: 7,
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 8,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnits: 10,
      wifi: false,
      laundry: false,
    },
    {
      id: 9,
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnits: 6,
      wifi: true,
      laundry: true,
    },
  ];

  async getAllHousingLocation(): Promise<{
    locations: HousingLocationInfo[];
    status: 'fail' | 'success';
  }> {
    // return this.housingLocationList;
    try {
      const data = await fetch(this.url);
      const json = await data.json();
      // The API returns { locations: [...] }, so extract the locations array
      if (Array.isArray(json) && json.length > 0) {
        return { locations: json, status: 'success' };
      } else {
        return { locations: [], status: 'fail' };
      }
    } catch (error) {
      console.error('Error fetching housing locations:', error);
      return {
        locations: [],
        status: 'fail',
      };
    }
  }

  async getHousingLocationById(
    id: number
  ): Promise<{ location: HousingLocationInfo | undefined; status: 'success' | 'fail' }> {
    // const data = await fetch(this.url);
    // return this.housingLocationList.find((housingLocation) => housingLocation.id === id);
    try {
      const data = await fetch(`${this.url}?id=${id}`);
      const locationJson = await data.json();
      // If API returns { locations: [...] }, extract the array first
      if (locationJson[0]) {
        return { location: locationJson[0], status: 'success' };
      } else {
        return { location: undefined, status: 'fail' };
      }
    } catch (error) {
      console.error('Error fetching housing location by id:', error);
      return { location: undefined, status: 'fail' };
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
