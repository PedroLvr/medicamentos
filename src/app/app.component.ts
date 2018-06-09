import { Component } from '@angular/core';
import { PushNotification } from './push-notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(private pushNotification: PushNotification) {}
}
