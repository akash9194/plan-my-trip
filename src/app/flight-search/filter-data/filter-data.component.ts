import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.scss'],
})
export class FilterDataComponent implements OnInit {
  @Output() applyFilterEvent = new EventEmitter();
  @Input() mobileQuery!: MediaQueryList;

  minValue: number = 50;
  maxValue: number = 200;
  options: any = {
    floor: 0,
    ceil: 1000,
  };

  bookingClasses = [
    { name: 'Economy Class', value: 'Economy', price: '$200', selected: false },
    {
      name: 'Business Class',
      value: 'Business',
      price: '$500',
      selected: false,
    },
    { name: 'First Class', value: 'Main', price: '$1000', selected: false },
  ];
  constructor() {}

  ngOnInit(): void {}
  resetAll() {
    this.minValue = 50;
    this.maxValue = 200;
    this.options = {
      floor: 0,
      ceil: 450,
    };
    this.applyFilterEvent.emit(null);
  }

  apply() {
    const filtersApplied = {
      minValue: this.minValue,
      maxValue: this.maxValue,
      bookingClasses: this.bookingClasses.filter((bClass) => bClass.selected),
    };
    this.applyFilterEvent.emit(filtersApplied);
  }
}
