import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopupService } from '../popup/popup.service';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-lista-usuarios',
    templateUrl: './lista-usuarios.component.html'
})
export class ListaUsuariosComponent implements OnInit {

    usuarios = [];

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _route: ActivatedRoute,
        private _popup: PopupService,
        private _params: ParamsService
    ) { }

    ngOnInit() {
        this._db.list('/usuarios').valueChanges()
        .subscribe(usuarios => {
            this.usuarios = usuarios;
        });
    }

    novoUsuario() {
        this._router.navigate(['formulario'], { relativeTo: this._route });
    }

    editarFarmacias(usuario) {
        this._params.set(usuario);
        this._router.navigate(['farmacias'], { relativeTo: this._route });
    }

    editarUsuario(usuario) {
        this._params.set(usuario);
        this.novoUsuario();
    }

    excluirUsuario(usuario) {
        this._popup.confirm({
            titulo: 'Atenção!',
            texto: 'Tem certeza que deseja excluir "' + usuario.nome + '"?'
        }).onFechar.subscribe(res => {
            if(res.res) {
                this._db.list('/usuarios').remove(usuario.id);
            }
        });
    }

}
