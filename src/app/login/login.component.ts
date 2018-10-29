import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessaoService } from '../sessao.service';
import { LoadingService } from '../loading/loading.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    isLoading: boolean = false;
    formularioLogin: FormGroup;

    constructor(
        private _db: AngularFireDatabase,
        private _sessao: SessaoService,
        private _router: Router,
        private _loading: LoadingService
    ) { }

    ngOnInit() {
        this.formularioLogin = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'senha': new FormControl('', Validators.required)
        });
    }

    logar() {
        this.isLoading = true;
        let formulario = this.formularioLogin.value;

        let obs = this._db.list('/usuarios', ref =>
            ref.orderByChild('email')
                .startAt(formulario.email)
                .endAt(formulario.email + "\uf8ff")
        ).valueChanges().subscribe(res => {

            console.log(res);

            let user = null;
            res.forEach(u => {
                if(u['senha'] == formulario.senha) {
                    user = u;
                }
            });

            if(user != null) {
                console.log("Usuario Logado!");
                this._sessao.login(user);
                this.formularioLogin.reset();
                if(user['permissao'] === 'administrador')
                    this._router.navigate(['/painel-controle']);
                else
                    this._router.navigate(['/farmacia']);
            } else {
                console.log("Usuario nao encontrado!");
                this.isLoading = false;
            }

            obs.unsubscribe();
        });
    }

    home() {
        this._router.navigate(['/']);
    }

}
