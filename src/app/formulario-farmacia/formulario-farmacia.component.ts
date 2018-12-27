import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
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
    pesquisandoCep: boolean = false;

    constructor(
        private _farmaciaService: FarmaciaService,
        private _location: Location,
        private _params: ParamsService,
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
            'cidade': new FormControl(this.farmacia.cidade, Validators.required),
            'telefone': new FormControl(this.farmacia.telefone, Validators.required),
        });
    }

    pesquisarCep(e) {
        let cep = e.target.value;
        if(cep.length === 8) {
            let formCep = this.form.get('cep');
            let formLogradouro = this.form.get('logradouro');
            let formCidade = this.form.get('cidade');
            let formBairro = this.form.get('bairro');

            formCep.disable();
            formLogradouro.disable();
            formCidade.disable();
            formBairro.disable();
            this.pesquisandoCep = true;

            this._request.get('https://viacep.com.br/ws/'+ cep +'/json/')
            .then(res => {
                formLogradouro.setValue(res.logradouro);
                formCidade.setValue(res.localidade);
                formBairro.setValue(res.bairro);
                formCep.enable();
                formLogradouro.enable();
                formCidade.enable();
                formBairro.enable();
                this.pesquisandoCep = false;
            })
            .catch(err => {
                console.log(err);
                formCep.enable();
                formLogradouro.enable();
                formCidade.enable();
                formBairro.enable();
                this.pesquisandoCep = false;
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
        farmacia.index = farmacia.nome + ' ' + farmacia.cep + ' ' + farmacia.logradouro + ' ' + farmacia.bairro;

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
                this.form.reset();
                this.isLoading = false;
            })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
            });
        }
    }
}
