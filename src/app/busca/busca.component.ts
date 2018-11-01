import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RemedioService } from '../remedio.service';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-busca',
    templateUrl: './busca.component.html',
    styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

    remedios = null;
    busca: string = '';
    @ViewChild('inputBusca') inputBusca: ElementRef;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _params: ParamsService,
        private _remedioService: RemedioService,
        private _popup: PopupService
    ) {

        this._route.queryParamMap.subscribe(params => {
            this.busca = params.get('b');
        });
    }

    ngOnInit() {
        this.pesquisar();
        this.inputBusca.nativeElement.value = this.busca;
    }

    pesquisar(event?): void {
        let texto = event ? event.target.value.trim() : '';
        this._remedioService.getRemedios(texto)
            .valueChanges()
            .subscribe(remedios => {
                this.remedios = remedios;
            }, err => {
                console.log(err);
                this.remedios = null;
            });
    }

}
