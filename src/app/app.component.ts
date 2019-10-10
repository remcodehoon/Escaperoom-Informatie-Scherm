import { Component } from '@angular/core';

@Component({
  selector: 'eis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Escaperoom-Informatie-Scherm';
  private showBuit = false;
  private showMessage = true;
  private message: String;

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
