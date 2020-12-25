import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnChanges {

  @Input() length;

  listnumber = [];

  constructor() { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.listnumber = [];
    for (let index = 0; index < this.length; index++) {
      this.listnumber.push(index);
    }
  }


}
