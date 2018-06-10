import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';
import { RemedioService } from '../remedio.service';

@Component({
    selector: 'app-formulario-remedio',
    templateUrl: './formulario-remedio.component.html',
    styleUrls: ['./formulario-remedio.component.scss']
})
export class FormularioRemedioComponent implements OnInit {

    remedio: any = {};
    remedios: AngularFireList<any>;

    constructor(
        private _params: ParamsService,
        private _remedioService: RemedioService,
        private _router: Router,
        private _location: Location
    ) {
        this.remedios = this._remedioService.getRemedios();
        this.remedio = this._params.getAll() || {};
        console.log(this.remedio);
    }

    ngOnInit() {}

    cancelar() {
        this._location.back();
    }

    salvar(remedio) {
        if('id' in remedio) {
            this.remedios.update(remedio.id, remedio)
            .then(res => {
                console.log(res);
                this._params.destroy();
                this._location.back();
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            let key = this.remedios.push(remedio).key;
            this.remedios.update(key, {id: key})
            .then(res => {
                console.log(res);
                this.remedio = {};
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

}
