import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-data',
  templateUrl: './sort-data.component.html',
  styleUrls: ['./sort-data.component.scss'],
})
export class SortDataComponent implements OnInit {
  @Output() applySortEvent = new EventEmitter();
  @Input() mobileQuery!: MediaQueryList;

  selectedOption: string = 'priceLowToHigh';

  sortParameters = [
    {
      name: 'Price (Lowest to Highest)',
      value: 'priceLowToHigh',
    },
    {
      name: 'Price (Highest to Lowest)',
      value: 'priceHighToLow',
    },
    {
      name: 'Duration (Shortest to Longest)',
      value: 'shortDuration',
    },
    {
      name: 'Duration (Longest to Shortest)',
      value: 'longDuration',
    },
    {
      name: 'Departure (Earliest to Latest)',
      value: 'departure',
    },
    {
      name: 'Arrival (Earliest to Latest)',
      value: 'arrival',
    },
    {
      name: 'Airline (A to Z)',
      value: 'airlineAsc',
    },
    {
      name: 'Airline (Z to A)',
      value: 'airlineDesc',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  apply() {
    this.applySortEvent.emit(this.selectedOption);
  }
  close() {
    this.applySortEvent.emit(null);
  }
}
