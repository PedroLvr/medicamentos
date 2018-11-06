import { Component } from '@angular/core';
import { PushNotification } from './push-notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private pushNotification: PushNotification) {

        // Workaround para bug firebase/database
        // * Apos algum tempo em producao, ocorre o erro:
        // * Cannot read property "myId" of undefined
        // https://github.com/firebase/angularfire/issues/970
        localStorage.removeItem('firebase:previous_websocket_failure');
    }
}
