import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    usuario = {
        login: '',
        senha: ''
    };

    constructor(private _router: Router) { }

    ngOnInit() {}

    logar(usuario) {
        this._router.navigate(['/painel-controle']);
    }

    cancelar() {
        console.log('cancelar')
    }

}
