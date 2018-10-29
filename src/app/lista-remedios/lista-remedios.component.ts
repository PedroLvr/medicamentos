import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';
import { RemedioService } from '../remedio.service';

@Component({
    selector: 'app-lista-remedios',
    templateUrl: './lista-remedios.component.html'
})
export class ListaRemediosComponent implements OnInit {

    remedios = [];

    constructor(
        private _remedioService: RemedioService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _params: ParamsService,
        private _popup: PopupService
    ) {}

    ngOnInit() {
        this.pesquisar();
    }

    novoRemedio() {
        this._router.navigate(['formulario'], { relativeTo: this._route });
    }

    pesquisar(event?) {
        let texto = event ? event.target.value.trim() : '';
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            this.remedios = remedios;
        });
    }

    editar(remedio) {
        this._params.set(remedio);
        this.novoRemedio();
    }
    
    remover(event, remedio) {
        event.stopPropagation();
        this._popup.confirm({
            titulo: 'Atenção!',
            texto: 'Tem certeza que deseja remover "' + remedio.nome + '"?'
        }).onFechar.subscribe(res => {
            if(res.res) {
                this._remedioService.removeRemedio(remedio.id);
            }
        });
    }

}
