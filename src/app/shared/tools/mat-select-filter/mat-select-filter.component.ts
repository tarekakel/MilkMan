import { Component, OnInit, ViewChild, Input, OnChanges, OnDestroy, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-mat-select-filter',
  templateUrl: './mat-select-filter.component.html',
  styleUrls: ['./mat-select-filter.component.css']
})
export class MatSelectFilterComponent implements OnChanges {
  @Input() disabled = false;
  @Input() data = [];
  @Input() placeholder = "test";
  @Input() selectedData = null;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();


  constructor() { }
  /** control for the selected data */
  public Ctrl: FormControl = new FormControl();


  /** control for the MatSelect filter keyword */
  public FilterCtrl: FormControl = new FormControl();
  /** list of data filtered by search keyword */
  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedData === null) {
      this.Ctrl.setValue(this.data[0]);
    } else {
      this.Ctrl.setValue(this.selectedData);
    }

    // load the initial data list
    this.filteredData.next(this.data.slice());
    // listen for search field value changes
    this.FilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  private filterData() {
    if (!this.data) {
      return;
    }
    // get the search keyword
    let search = this.FilterCtrl.value;
    if (!search) {
      this.filteredData.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredData.next(
      this.data.filter(dt => dt.name.toLowerCase().indexOf(search) > -1)
    );
  }
  /**
   * Sets the initial value after the filteredData are loaded initially
   */
  private setInitialValue() {
    this.filteredData
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredData are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a.id === b.id;
      });
  }

  Change($event) {
    this.selectionChange.emit($event);
  }

}
