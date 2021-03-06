import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessaoService } from '../sessao.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopupService } from '../popup/popup.service';

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
        private _popup: PopupService
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

        this._db.list('/usuarios', ref =>
            ref.orderByChild('email')
                .startAt(formulario.email)
                .endAt(formulario.email + "\uf8ff")
        ).valueChanges()
        .first()
        .subscribe(usuarios => {
            if(usuarios.length > 0) {
                let user = null;
                usuarios.forEach(u => {
                    if(u['senha'] == formulario.senha) {
                        user = u;
                    }
                });

                if(user != null) {
                    this._sessao.login(user);
                    this.formularioLogin.reset();
                    if(user['permissao'] === 'administrador')
                        this._router.navigate(['/administracao']);
                    else
                        this._router.navigate(['/controle-remedios']);
                } else {
                    this._popup.alert({
                        titulo: 'Falha no Login',
                        texto: 'Senha incorreta!'
                    });
                    this.isLoading = false;
                }
            } else {
                this._popup.alert({
                    titulo: 'E-mail Inexistente',
                    texto: 'Não existe nenhum usuário com o e-mail informado!'
                });
                this.isLoading = false;
            }
        }, err => {
            this.isLoading = false;
            console.log(err);
        });
    }

    home() {
        this._router.navigate(['/']);
    }

}
