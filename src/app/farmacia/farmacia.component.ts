import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessaoService } from '../sessao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-farmacia',
    templateUrl: './farmacia.component.html'
})
export class FarmaciaComponent implements OnInit {

    usuario = {};
    farmacias = [];
    remedios = [];
    farmaciaSelecionada;

    constructor(
        private _db: AngularFireDatabase,
        private _sessao: SessaoService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _params: ParamsService
    ) { }

    ngOnInit() {
        if(this._sessao.hasSessao()) {
            this.usuario = this._sessao.getUser();
            if(this.usuario['farmacias']) {
                this._db.list('/farmacias').valueChanges().subscribe(farmacias => {
                    console.log(farmacias);
                    this.farmacias = farmacias.filter(f => this.usuario['farmacias'].includes(f['id']));
                });
            }

            this._db.list('/remedios').valueChanges().subscribe(remedios => {
                this.remedios = remedios;
            });
        }
    }

    editarRemedios() {
        this._router.navigate(['/farmacia/remedios']);
    }

}
