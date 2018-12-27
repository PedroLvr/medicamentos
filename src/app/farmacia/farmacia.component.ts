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
    farmaciaSelecionada = {};
    allRemedios = [];
    remedios = [];

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
                    this.farmacias = farmacias.filter(f => this.usuario['farmacias'].includes(f['id']));
                });
            }

            this._db.list('/remedios').valueChanges().subscribe(remedios => {
                this.allRemedios = remedios;
            });
        }
    }

    toggleDisponivel(remedio) {
        if(!this.farmaciaSelecionada['remedios']) {
            this.farmaciaSelecionada['remedios'] = [];
            this.farmaciaSelecionada['remedios'].push(remedio['id']);
        } else if(this.farmaciaSelecionada['remedios'].indexOf(remedio['id']) > -1) {
            let index = this.farmaciaSelecionada['remedios'].indexOf(remedio['id']);
            this.farmaciaSelecionada['remedios'].splice(index, 1);
        } else {
            this.farmaciaSelecionada['remedios'].push(remedio['id']);
        }

        this._db.list('/farmacias').update(this.farmaciaSelecionada['id'], this.farmaciaSelecionada);
    }

    editarRemedios() {
        this._params.set(this.farmaciaSelecionada);
        this._router.navigate(['remedios'], { relativeTo: this._route });
    }

    escolherFarmacia(event) {
        let farmacia = this.farmacias.find(f => f.id == event.target.value);
        this.farmaciaSelecionada = farmacia;
        console.log(this.farmaciaSelecionada)
        this.remedios = this.allRemedios.filter(r => r['farmacias'] && r['farmacias'].includes(farmacia.id));
    }

}
