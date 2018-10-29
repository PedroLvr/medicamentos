import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-relacao-farmacia-usuario',
    templateUrl: './relacao-farmacia-usuario.component.html'
})
export class RelacaoFarmaciaUsuarioComponent implements OnInit {

    usuario = {};
    farmacias = [];

    constructor(
        private _db: AngularFireDatabase,
        private _params: ParamsService
    ) {
        this.usuario = this._params.getAll();
    }

    ngOnInit() {
        this._db.list('/farmacias').valueChanges().subscribe(farmacias => {
            this.farmacias = farmacias;
        });
    }

    toggleColaborador(farmacia) {
        let existe = false;
        let index = -1;

        if (this.usuario.hasOwnProperty('farmacias')) {
            this.usuario['farmacias'].forEach((idFarmacia, i) => {
                if (farmacia.id == idFarmacia) {
                    existe = true;
                    index = i;
                }
            });
        }

        if (existe) {
            this.usuario['farmacias'].splice(index, 1);
        } else {
            if (!this.usuario.hasOwnProperty('farmacias')) this.usuario['farmacias'] = [];
            this.usuario['farmacias'].push(farmacia.id);
        }

        this._db.list('/usuarios').update(this.usuario['id'], this.usuario);
    }

}
