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

    ngOnInit() {}

    cancelar() {
        this._params.destroy();
        this._location.back();
    }

    salvar(remedio) {
        if('id' in remedio) {
            this.remedios.update(remedio.id, remedio)
            .then(res => {
                console.log(res);
                this.cancelar();
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
