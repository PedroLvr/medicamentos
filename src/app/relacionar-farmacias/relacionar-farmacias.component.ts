import { Component, OnInit } from '@angular/core';
import { FarmaciaService } from '../farmacia.service';
import { ParamsService } from '../params.service';
import { AngularFireList } from 'angularfire2/database';

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
        private _paramsService: ParamsService
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

    toggleDisponivel(event, farmacia) {
        let disponivel = event.target.checked;
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