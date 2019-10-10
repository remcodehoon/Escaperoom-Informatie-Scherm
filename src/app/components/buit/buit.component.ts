import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'eis-buit',
  templateUrl: './buit.component.html',
  styleUrls: ['./buit.component.scss']
})
export class BuitComponent implements OnInit {

  @Input() show: boolean;
  public buit = 0;

  constructor() { }

  ngOnInit() {
  }

}
