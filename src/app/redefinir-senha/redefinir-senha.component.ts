import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessaoService } from '../sessao.service';
import { PopupService } from '../popup/popup.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-redefinir-senha',
    templateUrl: './redefinir-senha.component.html',
    styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {

    isLoading: boolean = false;
    formularioSenha: FormGroup;

    constructor(
        private _db: AngularFireDatabase,
        private _sessao: SessaoService,
        private _router: Router,
        private _popup: PopupService
    ) { }

    ngOnInit() {
        this.formularioSenha = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'senha': new FormControl('', Validators.required),
            'confSenha': new FormControl('', [Validators.required, requireEquals('senha')])
        });
    }
    

    redefinir() {
        this.isLoading = true;
        let formulario = this.formularioSenha.value;

        this._db.list('/usuarios', ref =>
            ref.orderByChild('email')
                .startAt(formulario.email)
                .endAt(formulario.email + "\uf8ff")
        ).valueChanges()
            .first()
            .subscribe(usuarios => {
                if (usuarios.length > 0) {
                    let user = null;
                    usuarios.forEach(u => {
                        if (u['senha'] == formulario.senha) {
                            user = u;
                        }
                    });

                    if (user != null) {
                        this._sessao.login(user);
                        this.formularioSenha.reset();
                        if (user['permissao'] === 'administrador')
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
                }
            }, err => {
                console.log(err);
            });
    }

    login() {
        this._router.navigate(['login']);
    }

}

function requireEquals(controlName: string): ValidatorFn {
    if(!controlName)
        return Validators.nullValidator;
    let subscribe: Subscription;
    return (control: AbstractControl): { [key: string]: any } | null => {
        if(control.parent) {
            let refControl: AbstractControl = control.parent.get(controlName);
            if(refControl) {
                if(subscribe) subscribe.unsubscribe();
                subscribe = refControl.valueChanges.subscribe(value => {
                    control.updateValueAndValidity();
                });
                return refControl.value == control.value ? null : {requireEquals: true};
            }
            return null;
        }
        return null;
    };
}