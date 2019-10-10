import { Component, OnInit } from '@angular/core';

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
  private interval: any = false;

  constructor() {
    this.hours = 1;
    this.minutes = 0;
    this.seconds = 0;
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

  public startTimer(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.hours >= 1 && this.minutes === 0 && this.seconds === 0) {
          this.hours--;
          this.minutes = 59;
          this.seconds = 59;
        } else if (this.minutes > 0 && this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else if (this.seconds > 0) {
          this.seconds--;
        } else {
          this.clearTimer();
          alert('Timer voorbij');
        }
      }, 1000);
    }
  }

  public clearTimer(): void {
    clearInterval(this.interval);
    this.interval = false;
  }

  public setTimer(hours: number, minutes: number, seconds: number): void {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

}
