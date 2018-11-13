import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';
import { FarmaciaService } from '../farmacia.service';
import { ParamsService } from '../params.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-formulario-farmacia',
    templateUrl: './formulario-farmacia.component.html'
})
export class FormularioFarmaciaComponent {

    farmacia: any = {};
    farmacias: AngularFireList<any>;
    form: FormGroup;
    isLoading: boolean = false;

    constructor(
        private _farmaciaService: FarmaciaService,
        private _location: Location,
        private _params: ParamsService,
        private _router: Router,
        private _request: RequestService
    ) {
        this.farmacias = this._farmaciaService.getFarmacias();
        this.farmacia = this._params.getAll() || {};

        this.form = new FormGroup({
            'nome': new FormControl(this.farmacia.nome, Validators.required),
            'cep': new FormControl(this.farmacia.cep),
            'logradouro': new FormControl(this.farmacia.logradouro, Validators.required),
            'numero': new FormControl(this.farmacia.numero, Validators.required),
            'bairro': new FormControl(this.farmacia.bairro, Validators.required),
            'cidade': new FormControl(this.farmacia.cidade),
            'telefone': new FormControl(this.farmacia.telefone, Validators.required),
        });
    }

    pesquisarCep(e) {
        let cep = e.target.value;
        if(cep.length === 8) {
            this._request.get('https://viacep.com.br/ws/'+ cep +'/json/')
            .then(res => {
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
        this._params.destroy();
        this._location.back();
    }

    salvar() {
        this.isLoading = true;
        let farmacia = this.form.value;
        farmacia.index = farmacia.nome + farmacia.cep + farmacia.logradouro + farmacia.bairro;

        // update
        if ('id' in this.farmacia) {
            this.farmacias.update(this.farmacia.id, farmacia)
            .then(res => {
                this.cancelar();
            })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
            });

        // novo
        } else {
            let key = this.farmacias.push(farmacia).key;
            this.farmacias.update(key, { id: key })
            .then(res => {
                this.farmacia = {};
                this.isLoading = false;
            })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
            });
        }
    }
}
