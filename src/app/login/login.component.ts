import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { SessaoService } from '../sessao.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isLoading: boolean = false;

    usuario = {
        email: '',
        senha: ''
    };

    formularioLogin: FormGroup;

    constructor(
        private afAuth: AngularFireAuth,
        private _sessao: SessaoService,
        private _router: Router
    ) { }

    ngOnInit() {
        console.log(this._sessao.isLogado);
        if(this._sessao.isLogado) {
            this._router.navigate(['/painel-controle']);
        }
        this.formularioLogin = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'senha': new FormControl('', Validators.required)
        });
    }

    logar() {
        this.isLoading = true;
        let formulario = this.formularioLogin.value;
        this.afAuth.auth.signInWithEmailAndPassword(formulario.email, formulario.senha)
        .then(usuario => {
            this.formularioLogin.reset();
            this._router.navigate(['/painel-controle']);
        })
        .catch(err => {
            console.log(err);
            this.isLoading = false;
        });
    }

    home() {
        this._router.navigate(['/']);
    }

}
