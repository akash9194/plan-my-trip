export interface Flight {
  duration: string;
  departureTime: string;
  arrivalTime: string;
  fromCity: string;
  fromCityId: number;
  toCity: string;
  toCityId: number;
  noOfStops: number;
  airlineName: string;
  prices: Price[];
  minPrice: string;
}

export interface Price {
  class: string;
  price: number;
  noOfSeats: number;
}

export interface Airport {
  cityId: number;
  cityName: string;
  airportName: string;
  country: string;
  countryCode: string;
}
