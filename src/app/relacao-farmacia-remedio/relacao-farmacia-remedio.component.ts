import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-relacao-farmacia-remedio',
    templateUrl: './relacao-farmacia-remedio.component.html',
    styles: [`
        .hero-body {
            padding: 1.5rem .8rem;
        }
        .pagination-link.is-current {
            background: #2EDCDC;
            border-color: #2EDCDC;
        }
    `]
})
export class RelacaoFarmaciaRemedioComponent implements OnInit {

    farmacia = {};
    remedios = [];
    remediosRef: AngularFireList<any>;

    constructor(
        private _db: AngularFireDatabase,
        private _location: Location,
        private _params: ParamsService
    ) {
        this.remediosRef = this._db.list('/remedios');
        this.farmacia = this._params.getAll();
        console.log(this.farmacia)
    }

    ngOnInit() {
        this.remediosRef.valueChanges()
            .subscribe(remedios => {
                this.remedios = remedios;
            });
    }

    voltar() {
        this._params.destroy();
        this._location.back();
    }

    togglePossui(remedio) {
        if(!remedio['farmacias']) {
            remedio['farmacias'] = [];
            remedio['farmacias'].push(this.farmacia['id'])
        } else if(remedio['farmacias'].indexOf(this.farmacia['id']) > -1) {
            let index = remedio['farmacias'].indexOf(this.farmacia['id']);
            remedio['farmacias'].splice(index, 1);
        } else {
            remedio['farmacias'].push(this.farmacia['id']);
        }
        
        console.log(remedio);
        this._db.list('/remedios').update(remedio['id'], remedio);
    }

}
