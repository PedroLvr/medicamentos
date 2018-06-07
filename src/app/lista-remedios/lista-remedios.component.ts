import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-lista-remedios',
    templateUrl: './lista-remedios.component.html',
    styleUrls: ['./lista-remedios.component.scss']
})
export class ListaRemediosComponent implements OnInit {

    remedios: Observable<any[]>;
    db: AngularFireList<any>;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _params: ParamsService,
        private _popup: PopupService
    ) {
        this.db = this._db.list('remedios');
        this.remedios = this.db.valueChanges();
    }

    ngOnInit() {}

    novoRemedio() {
        this._router.navigate(['/remedios/formulario']);
    }

    novaFarmacia() {
        this._router.navigate(['/farmacias/formulario']);
    }

    farmacias(remedio): void {
        this._params.set(remedio);
        this._router.navigate(['/relacionar-farmacias']);
    }

    pesquisar(texto: string): void {
        let t = texto.toString().toLowerCase().trim();
        console.log(t);
    }
    
    remover(event, remedio) {
        event.stopPropagation();
        this._popup.confirm({
            titulo: 'Atenção!',
            texto: 'Tem certeza que deseja remover ' + remedio.nome + '?'
        }).onFechar.subscribe(res => {
            if(res.res) {
                this.db.remove(remedio.id);
            }
        });
    }

}
