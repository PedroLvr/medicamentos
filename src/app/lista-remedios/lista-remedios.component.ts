import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';
import { RemedioService } from '../remedio.service';

@Component({
    selector: 'app-lista-remedios',
    templateUrl: './lista-remedios.component.html',
    styleUrls: ['./lista-remedios.component.scss']
})
export class ListaRemediosComponent implements OnInit {

    remedios = [];

    constructor(
        private _remedioService: RemedioService,
        private _router: Router,
        private _params: ParamsService,
        private _popup: PopupService
    ) {}

    ngOnInit() {
        this.pesquisar();
    }

    novoRemedio() {
        this._router.navigate(['/remedios/formulario']);
    }

    pesquisar(event?): void {
        let texto = event ? event.target.value.trim() : '';
        console.log(texto)
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            console.log(remedios);
            this.remedios = remedios;
        });
    }

    editar(remedio) {
        this._params.set(remedio);
        this._router.navigate(['/remedios/formulario']);
    }

    farmacias(event, remedio): void {
        event.stopPropagation();
        this._params.set(remedio);
        this._router.navigate(['/relacionar-farmacias']);
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
