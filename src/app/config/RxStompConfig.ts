import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {environment} from '../../environments/environment';

export const RxStompConfig: InjectableRxStompConfig = {
  brokerURL: environment.WS_ENDPOINT_URL,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
