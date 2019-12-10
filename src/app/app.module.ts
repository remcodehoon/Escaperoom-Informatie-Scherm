import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';
import { BuitComponent } from './components/buit/buit.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { MessageComponent } from './components/message/message.component';
import {RxStompConfig} from './config/RxStompConfig';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';

registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    BuitComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL' // 'de-DE' for Germany, 'fr-FR' for France ...
    },
    {
      provide: InjectableRxStompConfig,
      useValue: RxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
