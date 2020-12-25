import { Component, OnInit, SimpleChanges, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { DragScrollComponent } from 'ngx-drag-scroll/lib';

@Component({
  selector: 'app-sales-favorite-materials',
  templateUrl: './sales-favorite-materials.component.html',
  styleUrls: ['./sales-favorite-materials.component.css']
})
export class SalesFavoriteMaterialsComponent implements OnInit {
  single: any[] = [];
  multi: any[];
  filter = '';


  timer;
  swPlayStop = 'stop';
  // @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Name';
  showYAxisLabel = true;
  yAxisLabel = '';
  loading = false;
  colorScheme = {
    domain: ['#d17575',
      '#d1a375',
      '#d1d175',
      '#d175a3',
      '#75d175',
      '#75d1d1',
      '#758cd1',
      '#d175d1',
      '#75a3d1',
      '#a3d175',
      '#d1ba75',
      '#8c75d1',
      '#75bad1',
      '#d18c75',
      '#ba75d1',
      '#75d1ba']
  };



  constructor(private getDataService: GetDataService) {
  }


  ngOnInit() {
    let x = this;
    //let uri = "dashboard?Q=" + this.tap + "&OrderBy=" + this.oredr + "&Sorting=" + this.sort + "&FilterForDates=" + this.filter + "&TOPS=" + this.top;
    let uri = "most?Duration="+this.filter;
    this.loading = true;
    this.getDataService.getJsonWithParam(uri, {}).subscribe(Response => {
      let __Array = <Array<any>>Response.body;
      x.single = __Array;
      this.loading = false;
    });
    this.timer = interval(3000).pipe(
      map((x) => {
        this.scrolChange(x);
      })
    ).subscribe();
  }
  onSelect($event) {
    
  }


  selectOrderBy(value){
    this.index = 0;
    this.timer.unsubscribe();
    let x = this;
    //let uri = "dashboard?Q=" + this.tap + "&OrderBy=" + this.oredr + "&Sorting=" + this.sort + "&FilterForDates=" + this.filter + "&TOPS=" + this.top;
    let uri = "most?Duration="+value;
    this.loading = true;
    this.getDataService.getJsonWithParam(uri, {}).subscribe(Response => {
      let __Array = <Array<any>>Response.body;
      x.single = __Array;
      this.loading = false;
    });
    this.timer = interval(3000).pipe(
      map((x) => {
        this.scrolChange(x);
      })
    ).subscribe();
  }
  EswPlayStop() {
    if (this.swPlayStop == 'stop') {
      this.swPlayStop = 'play';
      this.timer.unsubscribe();
    } else {
      this.swPlayStop = 'stop';
      this.timer = interval(3000).pipe(
        map((x) => {
          this.scrolChange(x);
        })
      ).subscribe();
    }
  }
  index = 0;
  loopStatus = 'up';
  scrolChange(x) {

    if (this.index == this.single.length - 2) {
      this.loopStatus = 'down';
    }

    if (this.index == 2) {
      this.loopStatus = 'up';
    }

    if (this.loopStatus == 'up') {
      this.ds.moveRight();
      this.index++;
    } else if (this.loopStatus == 'down') {
      this.ds.moveLeft();
      this.index--;
    }
  }

  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }


  mouseEnter(){
    this.timer.unsubscribe();
  }

  mouseLeave(){
    this.timer = interval(3000).pipe(
      map((x) => {
        this.scrolChange(x);
      })
    ).subscribe();
  }
}
