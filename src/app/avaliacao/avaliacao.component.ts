import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';
import { RemedioService } from '../remedio.service';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-avaliacao',
    templateUrl: './avaliacao.component.html',
    styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {

    avaliacao: any = {};
    avaliacoes: AngularFireList<any>;

    constructor(
        private _params: ParamsService,
        private _db: AngularFireDatabase,
        private _router: Router,
        private _location: Location,
        private _popup: PopupService
    ) {
        this.avaliacoes = this._db.list('/avaliacoes');
    }

    ngOnInit() {}

    cancelar() {
        this._router.navigate(['/']);
    }

    enviar(avaliacao) {
        let key = this.avaliacoes.push(avaliacao);
        this.avaliacao = {};
        this._popup.alert({
            titulo: 'Muito obrigado!',
            texto: 'Sua avalição foi enviada com sucesso.'
        }).onFechar.subscribe(res => {
            console.log(res);
            this.cancelar();
        });
    }

}