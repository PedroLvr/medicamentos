import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseMessaging } from '@firebase/messaging-types';

@Injectable()
export class PushNotification {

    private messaging: FirebaseMessaging;

    constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App) {
        console.log('MESSAGING....................')
        this.messaging = firebase.messaging(this.firebaseApp);
        this.messaging.requestPermission()
        .then(res => {
            console.log(res);
            return this.messaging.getToken();
        })
        .then(token => {
            console.log(token);
        })
        .catch(err => {
            console.log(err);
        })
    }
}