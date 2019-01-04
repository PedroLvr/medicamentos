import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessaoService {

    onChange: BehaviorSubject<any>;

    constructor() {
        this.onChange = new BehaviorSubject(this.getUser());
    }

    login(user) {
        try {
            localStorage.setItem("remediosbv_usuario", JSON.stringify(user));
            this.onChange.next(user);
        } catch (e) {
            console.error('Error loging in!', e);
        }
    }

    logout() {
        try {
            localStorage.removeItem("remediosbv_usuario");
            this.onChange.next(null);
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