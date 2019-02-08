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
    styles: [`
        #table-remedios {
            margin: 5px 0 15px;
        }
    `]
})
export class ListaRemediosComponent implements OnInit {

    isLoading: boolean = false;

    remedios = [];
    todosRemedios = [];
    totalPages = 0;
    pages = [0];
    currentPage = 1;

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
        this.isLoading = true;
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            this.todosRemedios = remedios;
            let len = remedios.length;
            this.currentPage = 1;
            this.totalPages = Math.ceil(len / 20);
            this.pages = [];
            for(let i = 1; i <= this.totalPages; i++) {
                this.pages.push(i);
            }
            this.remedios = this.todosRemedios.slice(0, 19);
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
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

    ir(page) {
        this.currentPage = page;
        this.remedios = this.todosRemedios.slice(20 * (page - 1), 19 + (20 * (page - 1)));
    }

    anterior() {
        this.ir(this.currentPage - 1);
    }

    proximo() {
        this.ir(this.currentPage + 1);
    }

}
