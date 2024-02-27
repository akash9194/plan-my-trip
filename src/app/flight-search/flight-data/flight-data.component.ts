import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/flight-search.model';

@Component({
  selector: 'app-flight-data',
  templateUrl: './flight-data.component.html',
  styleUrls: ['./flight-data.component.scss'],
})
export class FlightDataComponent implements OnInit {
  @Input() flights!: Flight[];

  constructor() {}

  ngOnInit(): void {}
}
