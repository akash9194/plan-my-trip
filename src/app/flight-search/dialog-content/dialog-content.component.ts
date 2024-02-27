import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DialogRef } from 'src/app/factory-components/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/factory-components/dialog/dialog-tokens';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent {
  heading: string = this.data?.heading || 'Sort by';
  isFiltering = this.data?.isFiltering || false;
  isSorting = this.data?.isSorting || false;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  applySort(selectedOption: string) {
    if (selectedOption) {
      this.dialogRef.close(selectedOption);
    } else {
      this.dialogRef.close();
    }
  }

  applyFilter(filtersApplied: any) {
    if (filtersApplied) {
      this.dialogRef.close(filtersApplied);
    } else {
      this.dialogRef.close();
    }
  }
}
