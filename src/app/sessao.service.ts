import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { throws } from 'assert';

@Injectable()
export class SessaoService {

    login(user) {
        try {
            localStorage.setItem("remediosbv_usuario", JSON.stringify(user));
        } catch (e) {
            console.error('Error loging in!', e);
        }
    }

    logout() {
        try {
            localStorage.removeItem("remediosbv_usuario");
        } catch (e) {
            console.error('Error login out!', e);
        }
    }

    getUser() {
        try {
            return JSON.parse(localStorage.getItem("remediosbv_usuario"));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
        }
    }

    hasSessao() {
        let u = this.getUser();
        return u != null && u != "";
    }
}