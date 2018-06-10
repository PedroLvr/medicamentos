import { Component, OnInit } from '@angular/core';
import { FarmaciaService } from '../farmacia.service';
import { ParamsService } from '../params.service';
import { AngularFireList } from 'angularfire2/database';
import { Location } from '@angular/common';

@Component({
    selector: 'app-relacionar-farmacias',
    templateUrl: './relacionar-farmacias.component.html',
    styleUrls: ['./relacionar-farmacias.component.scss']
})
export class RelacionarFarmaciasComponent implements OnInit {

    dbFarmacias: AngularFireList<any>;
    farmacias = [];
    remedio;

    constructor(
        private _farmaciaService: FarmaciaService,
        private _paramsService: ParamsService,
        private _location: Location
    ) {
        this.remedio = this._paramsService.getAll();
        this.dbFarmacias = this._farmaciaService.getFarmacias();
    }

    ngOnInit() {
        this.dbFarmacias.valueChanges()
        .subscribe(farmacias => {
            console.log(farmacias);
            this.farmacias = farmacias;
        });
    }

    voltar() {
        this._location.back();
    }

    toggleDisponivel(farmacia) {
        let disponivel = !(farmacia.remedios && farmacia.remedios.indexOf(this.remedio.id) >= 0);
        let remedios = farmacia.remedios || [];
        let idRemedio = this.remedio.id;

        if(disponivel) {
            remedios.push(idRemedio);
            this.dbFarmacias.update(farmacia.id, {remedios: remedios})
        } else {
            let index = remedios.indexOf(idRemedio);
            remedios.splice(index, 1);
            this.dbFarmacias.update(farmacia.id, {remedios: remedios})

        }
    }

}