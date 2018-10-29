import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';
import { UsuarioService } from '../usuario.service';

@Component({
    selector: 'app-formulario-usuario',
    templateUrl: './formulario-usuario.component.html'
})
export class FormularioUsuarioComponent {

    usuario: any = {};
    usuarios: AngularFireList<any>;

    constructor(
        private _params: ParamsService,
        private _usuarioService: UsuarioService,
        private _router: Router,
        private _location: Location
    ) {
        this.usuarios = this._usuarioService.getUsuarios();
        this.usuario = this._params.getAll() || {};
        console.log(this.usuario);
    }

    ngOnInit() {

    }

    cancelar() {
        this._params.destroy();
        this._location.back();
    }

    salvar(usuario) {
        if ('id' in usuario) {
            this.usuarios.update(usuario.id, usuario)
                .then(res => {
                    console.log(res);
                    this.cancelar();
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            let key = this.usuarios.push(usuario).key;
            this.usuarios.update(key, { id: key })
                .then(res => {
                    console.log(res);
                    this.usuario = { };
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

}