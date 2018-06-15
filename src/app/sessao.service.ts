import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class SessaoService {

    isLogado: boolean;

    constructor(private _auth: AngularFireAuth) {
        // Definindo o tipo de persistencia do estado do Auth.
        // SESSION: o estado será mantido somente na sessão ou guia atual e
        // será apagado quando a guia ou janela em que o usuário fez a autenticação for fechada
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

        
    }

    get usuario() {
        return this._auth.auth.currentUser;
    }

    get hasSessao() {
        return this._auth.authState;
    }

}
