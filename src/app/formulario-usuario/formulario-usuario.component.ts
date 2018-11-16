import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';
import { UsuarioService } from '../usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-formulario-usuario',
    templateUrl: './formulario-usuario.component.html',
    styles: [`
        .select,
        .select select {
            width: 100%;
        }
    `]
})
export class FormularioUsuarioComponent {

    usuario: any = {};
    usuarios: AngularFireList<any>;
    form: FormGroup;
    isLoading: boolean = false;

    constructor(
        private _params: ParamsService,
        private _usuarioService: UsuarioService,
        private _router: Router,
        private _location: Location
    ) {
        this.usuarios = this._usuarioService.getUsuarios();
        this.usuario = this._params.getAll() || {};
        console.log(this.usuario);

        this.form = new FormGroup({
            'nome': new FormControl(this.usuario.nome, Validators.required),
            'email': new FormControl(this.usuario.email, [Validators.required, Validators.email]),
            'permissao': new FormControl(this.usuario.permissao, Validators.required),
        });
    }

    cancelar() {
        this._params.destroy();
        this._location.back();
    }

    salvar() {
        this.isLoading = true;
        let usuario = this.form.value;
        usuario.index = usuario.nome + ' ' + usuario.email;

        // update
        if ('id' in this.usuario) {
            this.usuarios.update(this.usuario.id, usuario)
            .then(res => {
                this.cancelar();
            })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
            });

        // novo
        } else {
            let key = this.usuarios.push(usuario).key;
            this.usuarios.update(key, { id: key })
            .then(res => {
                this.form.reset();
                this.isLoading = false;
            })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
            });
        }
    }

}