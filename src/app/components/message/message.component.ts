import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'eis-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() show: boolean;
  @Input() message: String;

  constructor() { }

  ngOnInit() {
  }

}
