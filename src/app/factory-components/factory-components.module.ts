import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDetailsComponent } from './tabs/tab-details/tab-details.component';
import { TabGroupComponent } from './tabs/tab-group/tab-group.component';
import { DialogService } from './dialog/dialog.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [TabGroupComponent, TabDetailsComponent],
  imports: [CommonModule, OverlayModule],
  exports: [TabGroupComponent, TabDetailsComponent],
  providers: [DialogService],
})
export class FactoryComponentsModule {}
