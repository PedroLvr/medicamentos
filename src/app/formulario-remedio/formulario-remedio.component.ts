import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';
import { RemedioService } from '../remedio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'formulario-remedio',
    templateUrl: './formulario-remedio.component.html',
    styles: [`
        .select,
        .select select {
            width: 100%;
        }
    `]
})
export class FormularioRemedioComponent {

    remedio: any = {};
    form: FormGroup;
    remedios: AngularFireList<any>;
    isLoading: boolean = false;

    tiposRemedios = [
        {nome: "Aerossol Oral"},
        {nome: "Cápsula"},
        {nome: "Cápsula mole"},
        {nome: "Cápsula pra inalação oral"},
        {nome: "Comprimido"},
        {nome: "Comprimido de liberação prolongada"},
        {nome: "Comprimido mastigável"},
        {nome: "Comprimido orodispersível"},
        {nome: "Comprimido para uso tópico"},
        {nome: "Comprimido sublingual"},
        {nome: "Comprimido vaginal"},
        {nome: "Creme"},
        {nome: "Creme vaginal"},
        {nome: "Elixir"},
        {nome: "Emulsão oral"},
        {nome: "Gel"},
        {nome: "Gel oral"},
        {nome: "Gel vaginal"},
        {nome: "Loção"},
        {nome: "Óleo para uso oral"},
        {nome: "Óvulo vaginal"},
        {nome: "Pasta"},
        {nome: "Pó"},
        {nome: "Pó para dispersão oral"},
        {nome: "Pó para inalação oral"},
        {nome: "Pó para solução injetável"},
        {nome: "Pó para solução oral"},
        {nome: "Pó para suspensão injetável"},
        {nome: "Pó para suspensão oral"},
        {nome: "Pomada"},
        {nome: "Pomada oftálmica"},
        {nome: "Solução bucal"},
        {nome: "Solução injetável"},
        {nome: "Solução nasal"},
        {nome: "Solução oftálmica"},
        {nome: "Solução oral"},
        {nome: "Solução para inalação"},
        {nome: "Solução para inalação oral"},
        {nome: "Solução para uso tópico"},
        {nome: "Solução retal"},
        {nome: "Solução spray"},
        {nome: "Supositório retal"},
        {nome: "Suspensão injetável"},
        {nome: "Suspensão oftálmica"},
        {nome: "Suspensão oral"},
        {nome: "Suspensão pra inalação nasal"},
        {nome: "Tintura"},
        {nome: "Xampu"},
        {nome: "Xarope"},
        {nome: "Adesivo transdérmico"},
        {nome: "Goma de mascar"},
        {nome: "Granulado oral"},
        {nome: "Pastilha"}
    ];

    constructor(
        private _params: ParamsService,
        private _remedioService: RemedioService,
        private _router: Router,
        private _location: Location
    ) {
        this.remedios = this._remedioService.getRemedios();
        this.remedio = this._params.getAll() || {};

        this.form = new FormGroup({
            'nome': new FormControl(this.remedio.nome, Validators.required),
            'principio': new FormControl(this.remedio.principio),
            'concentracao': new FormControl(this.remedio.concentracao, Validators.required),
            'forma': new FormControl(this.remedio.forma, Validators.required),
            'descricao': new FormControl(this.remedio.descricao)
        });
    }

    salvar() {
        this.isLoading = true;
        let remedio = this.form.value;
        remedio.index = remedio.nome + ' ' + remedio.principio + ' ' + remedio.concentracao + ' ' + remedio.forma;

        // update
        if('id' in this.remedio) {
            this.remedios.update(this.remedio.id, remedio)
            .then(res => {
                this.cancelar();
            })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
            });
        
        // novo
        } else {
            let key = this.remedios.push(remedio).key;
            this.remedios.update(key, {id: key})
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

    cancelar() {
        this._params.destroy();
        this._location.back();
    }
}
