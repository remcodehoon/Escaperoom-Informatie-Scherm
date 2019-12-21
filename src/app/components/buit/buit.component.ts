import {Component, Input, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Message} from '@stomp/stompjs';
import {Buit} from '../../shared/buit';

@Component({
  selector: 'eis-buit',
  templateUrl: './buit.component.html',
  styleUrls: ['./buit.component.scss'],
  providers: []
})
export class BuitComponent implements OnInit {

  @Input() show: boolean;
  public buit = 0;

  private buitSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {
    this.buitSubscription = this.rxStompService.watch(environment.WS_BUIT_TOPIC).subscribe((message: Message) => {
      const buit: Buit = JSON.parse(message.body) as Buit;
      if (buit.totaleBuit >= 0) {
        this.buit = buit.totaleBuit;
      }
    });
  }

  ngOnInit() {
  }

}
