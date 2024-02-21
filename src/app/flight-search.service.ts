import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport, Flight } from './flight-search.model';

@Injectable({
  providedIn: 'root',
})
export class FlightSearchService {
  airportUrl: string = '/assets/airports.json';
  flightUrl: string = '/assets/flights.json';
  constructor(private httpClient: HttpClient) {}

  getAirports(): Observable<Airport[]> {
    return this.httpClient.get<Airport[]>(this.airportUrl);
  }
  getFlights(): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>(this.flightUrl);
  }
}
