import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { TabDetailsComponent } from '../tab-details/tab-details.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabDetailsComponent) tabs!: QueryList<TabDetailsComponent>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: any) {
    // deactivate all tabs
    this.tabs.toArray().forEach((tab) => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
