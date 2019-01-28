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
        this.run();
    }

    run(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.askPermission().then(() => {
                console.log("Permissao concedida");
                this._token = this.retrieveToken();
                if(this.hasToken) {
                    console.log("Token ja registrado!");
                    resolve();
                } else {
                    this.askToken().then(token => {
                        console.log("Token recebido: " + token);
                        return this.saveToken(token);
                    }).then(() => {
                        console.log("Token salvo com sucesso!");
                        resolve();
                    })
                }
            }, err => {
                console.log("Notificacao bloqueada");
                this.delete().then(() => {
                    this.persistToken(null);
                    console.log("Token removido!");
                    resolve();
                });
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
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

    retrieveToken(): object {
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
            .then(() => {
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