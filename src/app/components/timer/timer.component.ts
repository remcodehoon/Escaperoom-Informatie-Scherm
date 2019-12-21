import {Component, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {Message} from '@stomp/stompjs';
import {TimeChange} from '../../shared/time-change';

@Component({
  selector: 'eis-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: []
})
export class TimerComponent implements OnInit {

  private hours: number;
  private minutes: number;
  private seconds: number;

  private timeSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    this.timeSubscription = this.rxStompService.watch(environment.WS_TIME_TOPIC).subscribe((message: Message) => {
      const timeChange = JSON.parse(message.body) as TimeChange;
      if (timeChange.type === 'SET') {
        this.hours = timeChange.hours;
        this.minutes = timeChange.minutes;
        this.seconds = timeChange.seconds;
      } else if (timeChange.type === 'PLUS') {
        this.hours = this.hours + timeChange.hours;
        this.minutes = this.minutes + timeChange.minutes;
        this.seconds = this.seconds + timeChange.seconds;
      } else if (timeChange.type === 'MINUS') {
        this.hours = this.hours - timeChange.hours;
        this.minutes = this.minutes - timeChange.minutes;
        this.seconds = this.seconds - timeChange.seconds;
      } else if (timeChange.type === 'RESET') {
        this.hours = 1;
        this.minutes = 0;
        this.seconds = 0;
      }
    });
  }

  ngOnInit() {
  }

  public getHours(): number {
    return this.hours;
  }

  public getMinutes(): number {
    return this.minutes;
  }

  public getSeconds(): number {
    return this.seconds;
  }

}
