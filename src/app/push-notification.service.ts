import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class PushNotification {

    private messaging: FirebaseMessaging;

    constructor(
        private _db: AngularFireDatabase,
        @Inject(FirebaseApp) private firebaseApp: firebase.app.App
    ) {
        this.messaging = firebase.messaging(this.firebaseApp);
        this.messaging.requestPermission()
        .then(res => {
            console.log(res);
            return this.messaging.getToken();
        })
        .then(token => {
            console.log(token);
            this.addToken(token);
        })
        .catch(err => {
            console.log(err);
        })
    }

    addToken(token): void {
        this._db.list('/tokens').push(token);
    }
}