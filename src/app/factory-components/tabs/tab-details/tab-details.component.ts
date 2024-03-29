import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-details',
  templateUrl: './tab-details.component.html',
  styleUrls: ['./tab-details.component.scss'],
})
export class TabDetailsComponent {
  @Input('tabTitle') title!: string;
  @Input() active = false;
}
