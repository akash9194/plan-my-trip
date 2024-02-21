import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DialogService } from 'src/app/factory-components/dialog/dialog.service';
import { Flight } from 'src/app/flight-search.model';
import { FlightSearchService } from 'src/app/flight-search.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-flight-search-result',
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.scss'],
})
export class FlightSearchResultComponent implements OnInit {
  flights!: Flight[];

  constructor(
    private flightService: FlightSearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.getFlights();
  }
  getFlights() {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((queryParams) => {
          const fromCityId = Number(queryParams.fromCity);
          const toCityId = Number(queryParams.toCity);
          if (fromCityId && toCityId) {
            return this.flightService
              .getFlights()
              .pipe(
                map((flights: Flight[]) =>
                  flights.filter(
                    (flight) =>
                      flight.fromCityId === fromCityId &&
                      flight.toCityId === toCityId
                  )
                )
              );
          }
          return [];
        })
      )
      .subscribe((flights: Flight[]) => {
        this.flights = flights;
      });
  }
  goToLastPage() {
    this.router.navigate(['/home']);
  }
  sortBy() {
    if (this.flights.length) {
      const dialogRef = this.dialog.open(DialogContentComponent, {
        data: {
          heading: 'Sort By',
          isSorting: true,
        },
      });

      dialogRef
        .afterClosed()
        .pipe(
          tap((selectedOption) => {
            // Subscription runs after the dialog closes
            this.sortFlights(selectedOption);
          })
        )

        .subscribe();
    }
  }
  sortFlights(selectedOption: string) {
    switch (selectedOption) {
      case 'priceHighToLow':
        this.flights.sort((a: any, b: any) => b.minPrice - a.minPrice);
        break;
      case 'priceLowToHigh':
        this.flights.sort((a: any, b: any) => a.minPrice - b.minPrice);
        break;
      case 'arrival':
        this.flights.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
        break;
      case 'departure':
        this.flights.sort((a, b) =>
          a.departureTime.localeCompare(b.departureTime)
        );
        break;
      case 'shortDuration':
        this.flights.sort(
          (a, b) =>
            this.calculateTotalDuration(a.duration) -
            this.calculateTotalDuration(b.duration)
        );
        break;
      case 'longDuration':
        this.flights.sort(
          (a, b) =>
            this.calculateTotalDuration(b.duration) -
            this.calculateTotalDuration(a.duration)
        );
        break;
      case 'airlineAsc':
        this.flights.sort((a, b) => a.airlineName.localeCompare(b.airlineName));
        break;
      case 'airlineDesc':
        this.flights.sort((a, b) => b.airlineName.localeCompare(a.airlineName));
        break;
      default:
        // If selectedCriteria is invalid, return 0 (no change in order)
        break;
    }
  }
  calculateTotalDuration(duration: string): number {
    const parts = duration.split('h');
    let totalDuration = 0;

    if (parts.length === 2) {
      totalDuration += parseInt(parts[0]) * 60; // Convert hours to minutes
      const minutesPart = parts[1].replace('m', '').trim();
      if (minutesPart !== '') {
        totalDuration += parseInt(minutesPart);
      }
    } else if (parts.length === 1 && duration.includes('m')) {
      totalDuration += parseInt(parts[0].replace('m', '').trim());
    }

    return totalDuration;
  }
  filterBy() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        heading: 'Filter By',
        isFiltering: true,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((filteredOption) => {
          // Subscription runs after the dialog closes
          if (filteredOption) {
            this.filterFlights(filteredOption);
          } else {
            this.getFlights();
          }
        })
      )

      .subscribe();
  }

  filterFlights(filteredOption: any) {
    this.flights = this.flights.filter((flight) => {
      // Filter by minimum value
      if (
        filteredOption.minValue &&
        flight.minPrice < filteredOption.minValue
      ) {
        return false;
      }
      // Filter by maximum value
      if (
        filteredOption.maxValue &&
        flight.minPrice > filteredOption.maxValue
      ) {
        return false;
      }
      // Filter by booking classes
      if (
        filteredOption.bookingClasses.some(
          (bookingClass: any) =>
            !flight.prices.some((price) => price.class === bookingClass.value)
        )
      ) {
        return false;
      }
      return true;
    });
  }
}
