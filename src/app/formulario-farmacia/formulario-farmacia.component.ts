import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';
import { FarmaciaService } from '../farmacia.service';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-formulario-farmacia',
    templateUrl: './formulario-farmacia.component.html',
    styleUrls: ['./formulario-farmacia.component.scss']
})
export class FormularioFarmaciaComponent implements OnInit {

    farmacia: any = {};
    farmacias: AngularFireList<any>;

    constructor(
        private _farmaciaService: FarmaciaService,
        private _location: Location,
        private _params: ParamsService,
        private _router: Router,
        private _request: RequestService
    ) {
        this.farmacias = this._farmaciaService.getFarmacias();
        this.farmacia = this._params.getAll() || {};
        console.log(this.farmacia);
    }

    ngOnInit() { }

    pesquisarCep(e) {
        let cep = e.target.value;
        console.log(cep);
        if(cep.length === 8) {
            this._request.get('https://viacep.com.br/ws/'+ cep +'/json/')
            .then(res => {
                console.log(res);
                this.farmacia.endereco = res.logradouro;
                this.farmacia.cidade = res.localidade;
                this.farmacia.bairro = res.bairro;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    cancelar() {
        this._location.back();
    }

    salvar(farmacia) {
        if ('id' in farmacia) {
            this.farmacias.update(farmacia.id, farmacia)
            .then(res => {
                console.log(res);
                this._params.destroy();
                this._location.back();
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            let key = this.farmacias.push(farmacia).key;
            this.farmacias.update(key, { id: key })
            .then(res => {
                console.log(res);
                this.farmacia = {};
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
