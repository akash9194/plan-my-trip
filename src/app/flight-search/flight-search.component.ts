import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlightSearchService } from '../flight-search.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Airport } from '../flight-search.model';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  airportsList!: Airport[];
  flightsList: any;
  travelClasses = [
    {
      name: 'Economy',
      value: 'Economy',
    },
    {
      name: 'Basic',
      value: 'Basic',
    },
    {
      name: 'Main',
      value: 'Main',
    },
  ];
  flightSearchFormGroup: FormGroup = this.fb.group(
    {
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      departDate: [this.todayDate],
      returnDate: [],
      travellers: [1],
      travelClass: [''],
    },
    { validators: this.destinationDepartureValidator }
  );

  get departureControl(): FormControl {
    return this.flightSearchFormGroup.get('departure') as FormControl;
  }
  get destinationControl(): FormControl {
    return this.flightSearchFormGroup.get('destination') as FormControl;
  }
  constructor(
    private datePipe: DatePipe,
    private flightService: FlightSearchService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  destinationDepartureValidator(form: FormGroup) {
    const fromCity = form?.get('departure')?.value;
    const toCity = form?.get('destination')?.value;

    if (fromCity && toCity && fromCity === toCity) {
      return { destinationSameAsDeparture: true };
    }

    return null;
  }
  ngOnInit(): void {
    this.flightService
      .getAirports()
      .pipe(
        take(1),
        tap((airportsData: Airport[]) => {
          this.airportsList = airportsData;
          if (this.airportsList?.length > 1) {
            this.departureControl.setValue(this.airportsList[0].cityId);
            this.destinationControl.setValue(this.airportsList[1].cityId);
          }
        })
      )
      .subscribe();
  }
  searchFlights() {
    const { departure, destination, travellers, travelClass } =
      this.flightSearchFormGroup.value;
    if (departure && destination && departure !== destination) {
      this.router.navigate(['/search-result'], {
        queryParams: {
          fromCity: departure,
          toCity: destination,
          travellers,
          travelClass,
        },
      });
    }
  }
}
