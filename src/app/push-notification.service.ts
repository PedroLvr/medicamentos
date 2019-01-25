import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class PushNotification {

    private messaging: FirebaseMessaging;
    private _tokenKey = 'remediosbv_token';
    private _token = null;

    constructor(
        private _db: AngularFireDatabase,
        @Inject(FirebaseApp) private firebaseApp: firebase.app.App
    ) {
        this.messaging = firebase.messaging(this.firebaseApp);
        this.delete().then(() => {

            this._token = this.retrieveToken();
    
            console.log('token gravado : ' + this._token);
    
            if(!!this._token) {
                this.askPermission()
                .then(() => {
                    console.log('Notification granted!');
                    return this.askToken();
                }, err => {
                    console.log(err);
                    throw new Error(err);
                })
                .then(token => {
                    this.saveToken(token);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    }

    get hasToken() {
        return !!this.token;
    }

    get token() {
        return this._token;
    }

    askPermission(): Promise<any> {
        return this.messaging.requestPermission();
    }

    askToken(): Promise<any> {
        return this.messaging.getToken();
    }

    delete(): Promise<any> {
        return this.messaging.deleteToken(this.token);
    }

    persistToken(token): void {
        localStorage.setItem(this._tokenKey, JSON.stringify(token));
    }

    retrieveToken() {
        try {
            return JSON.parse(localStorage.getItem(this._tokenKey));
        } catch(err){
            return null;
        }
    }

    dropToken() {
        this.persistToken(null);
    }

    saveToken(token): Promise<any> {
        return new Promise((resolve, reject) => {
            let key = this._db.list('/tokens').push({token: token}).key;
            this._db.list('/tokens').update(key, {id: key})
            .then(res => {
                console.log("reposta do push token")
                console.log(res);
                this._token = {
                    id: key,
                    token: token
                }
                this.persistToken(this._token);
                resolve();
            });
        });
    }
}