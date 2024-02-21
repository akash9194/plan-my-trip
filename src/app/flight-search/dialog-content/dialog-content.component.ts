import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/factory-components/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/factory-components/dialog/dialog-tokens';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  heading: string = this.data?.heading || 'Sort by';
  isFiltering = this.data?.isFiltering || false;
  isSorting = this.data?.isSorting || false;

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
      value: 'airlineDsc',
    },
  ];

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
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  apply() {
    if (this.isSorting) {
      this.dialogRef.close(this.selectedOption);
    } else {
      const filtersApplied = {
        minValue: this.minValue,
        maxValue: this.maxValue,
        bookingClasses: this.bookingClasses.filter((bClass) => bClass.selected),
      };
      this.dialogRef.close(filtersApplied);
    }
  }
  resetAll() {
    this.minValue = 50;
    this.maxValue = 200;
    this.options = {
      floor: 0,
      ceil: 450,
    };
    this.dialogRef.close();
  }
}
