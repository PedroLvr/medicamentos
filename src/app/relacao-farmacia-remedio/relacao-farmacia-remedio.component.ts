import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ParamsService } from '../params.service';
import { RemedioService } from '../remedio.service';

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
    todosRemedios = [];
    remedios = [];
    remediosRef: AngularFireList<any>;
    totalPages = 0;
    pages = [0];
    currentPage = 1;

    constructor(
        private _remedioService: RemedioService,
        private _db: AngularFireDatabase,
        private _location: Location,
        private _params: ParamsService
    ) {
        this.farmacia = this._params.getAll();
    }

    ngOnInit() {
        this.pesquisar();
    }

    pesquisar(event?) {
        let texto = event ? event.target.value.trim() : '';
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            this.todosRemedios = remedios;
            let len = remedios.length;
            this.currentPage = 1;
            this.totalPages = Math.ceil(len / 20);
            this.pages = [];
            for(let i = 1; i <= this.totalPages; i++) {
                this.pages.push(i);
            }
            this.remedios = this.todosRemedios.slice(0, 19);
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

    ir(page) {
        this.currentPage = page;
        this.remedios = this.todosRemedios.slice(20 * (page - 1), 19 + (20 * (page - 1)));
    }

    anterior() {
        this.ir(this.currentPage - 1);
    }

    proximo() {
        this.ir(this.currentPage + 1);
    }

}
