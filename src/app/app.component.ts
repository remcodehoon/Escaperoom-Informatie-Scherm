import {Component, ElementRef, Inject, ViewChild, AfterViewInit, Renderer2} from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import {environment} from '../environments/environment';
import {Subscription} from 'rxjs';
import {Message as StompMessage} from '@stomp/stompjs';
import {ServerMessage} from './shared/servermessage';
import {Status} from './shared/status';

@Component({
  selector: 'eis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Escaperoom-Informatie-Scherm';
  private showBuit = true;
  private showMessage = false;
  private message: String;

  private messageSubscription: Subscription;
  private slotStatusSubscription: Subscription;
  private sensorSubscription: Subscription;
  private alarmSubscription: Subscription;
  private lastMinuteSubscription: Subscription;
  private buttonSubscription: Subscription;

  public displayIntro = false;
  public displayAlarm = false;
  public displayAlarmOff = false;
  public displayLastMinute = false;
  public displayRedButton = false;

  public audio = new Audio();
  public alarmsound = new Audio();

  @ViewChild('introVideoPlayer') introVideoplayer: ElementRef;
  @ViewChild('alarmVideoPlayer') alarmVideoplayer: ElementRef;
  @ViewChild('alarmOffVideoPlayer') alarmOffVideoplayer: ElementRef;
  @ViewChild('lastMinuteVideoPlayer') lastMinuteVideoplayer: ElementRef;
  @ViewChild('redButtonVideoPlayer') redButtonVideoplayer: ElementRef;

  ngAfterViewInit() {
    this.renderer.listen(this.introVideoplayer.nativeElement, 'ended', () => {
      this.introVideoplayer.nativeElement.currentTime = 0;
      this.displayIntro = false;
      this.alarmsound.volume = 1;
    });
    this.renderer.listen(this.alarmVideoplayer.nativeElement, 'ended', () => {
      this.alarmVideoplayer.nativeElement.currentTime = 0;
      this.displayAlarm = false;
    });
    this.renderer.listen(this.alarmOffVideoplayer.nativeElement, 'ended', () => {
      this.alarmOffVideoplayer.nativeElement.currentTime = 0;
      this.displayAlarmOff = false;
    });
    this.renderer.listen(this.lastMinuteVideoplayer.nativeElement, 'ended', () => {
      this.lastMinuteVideoplayer.nativeElement.currentTime = 0;
      this.displayLastMinute = false;
    });
    this.renderer.listen(this.redButtonVideoplayer.nativeElement, 'ended', () => {
      this.redButtonVideoplayer.nativeElement.currentTime = 0;
      this.displayRedButton = false;
    });
  }

  constructor(private rxStompService: RxStompService, private renderer: Renderer2) {

    this.audio.src = '../assets/sounds/ping.mp3';
    this.audio.load();

    this.alarmsound = new Audio();
    this.alarmsound.src = '../assets/sounds/alarm.mp3';
    this.alarmsound.load();

    this.messageSubscription = this.rxStompService.watch(environment.WS_MESSAGE_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as ServerMessage;
      if (message.show) {
        this.audio.play();
        this.message = message.message;
        this.showBuit = false;
        this.showMessage = true;
      } else {
        this.showBuit = true;
        this.showMessage = false;
        this.message = '';
      }
    });

    this.slotStatusSubscription = this.rxStompService.watch(environment.WS_SLOT_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as Status;
      if (message.status === true) {
        this.displayIntro = true;
        this.introVideoplayer.nativeElement.play();
        this.alarmsound.volume = 0;
        this.alarmsound.play();
      }
    });

    this.sensorSubscription = this.rxStompService.watch(environment.WS_SENSOR_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as Status;
      if (message.status === true) {
        this.displayAlarm = true;
        this.alarmVideoplayer.nativeElement.play();
      }
    });

    this.alarmSubscription = this.rxStompService.watch(environment.WS_ALARM_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as Status;
      if (message.status === true) {
        this.alarmsound.pause();
        this.alarmsound.currentTime = 0;
        this.alarmsound.volume = 1;
        this.displayAlarmOff = true;
        this.alarmOffVideoplayer.nativeElement.play();
      }
    });

    this.sensorSubscription = this.rxStompService.watch(environment.WS_SENSOR_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as Status;
      if (message.status === true) {
        this.displayAlarm = true;
        this.alarmVideoplayer.nativeElement.play();
      }
    });

    this.lastMinuteSubscription = this.rxStompService.watch(environment.WS_LASTMINUTE_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as Status;
      if (message.status === true) {
        this.displayLastMinute = true;
        this.lastMinuteVideoplayer.nativeElement.play();
      }
    });

    this.buttonSubscription = this.rxStompService.watch(environment.WS_BUTTON_TOPIC).subscribe((stompMessage: StompMessage) => {
      const message = JSON.parse(stompMessage.body) as Status;
      if (message.status === true) {
        this.displayRedButton = true;
        this.redButtonVideoplayer.nativeElement.play();
      }
    });
  }

  public getShowBuit(): boolean {
    return this.showBuit;
  }

  public getShowMessage(): boolean {
    return this.showMessage;
  }

  public getMessage(): String {
    return this.message;
  }
}
