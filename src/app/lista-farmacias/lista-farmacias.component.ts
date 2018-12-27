import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmaciaService } from '../farmacia.service';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-lista-farmacias',
    templateUrl: './lista-farmacias.component.html',
    styles: [`
        .pagination-link.is-current {
            background: #2EDCDC;
            border-color: #2EDCDC;
        }
    `]
})
export class ListaFarmaciasComponent implements OnInit {

    farmacias = [];
    todasFarmacias = [];
    totalPages = 0;
    pages = [0];
    currentPage = 1;

    constructor(
        private _farmaciaService: FarmaciaService,
        private _params: ParamsService,
        private _popup: PopupService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this.pesquisar();
    }

    novaFarmacia() {
        this._router.navigate(['formulario'], { relativeTo: this._route });
    }

    pesquisar(event?): void {
        let texto = event ? event.target.value.trim() : '';
        console.log(texto)
        this._farmaciaService.getFarmacias(texto)
        .valueChanges()
        .subscribe(farmacias => {
            this.todasFarmacias = farmacias;
            let len = farmacias.length;
            this.currentPage = 1;
            this.totalPages = Math.ceil(len / 20);
            this.pages = [];
            for(let i = 1; i <= this.totalPages; i++) {
                this.pages.push(i);
            }
            this.farmacias = this.todasFarmacias.slice(0, 19);
        });
    }

    editar(farmacia) {
        this._params.set(farmacia);
        this.novaFarmacia();
    }
    
    remover(event, farmacia) {
        event.stopPropagation();
        this._popup.confirm({
            titulo: 'Atenção!',
            texto: 'Tem certeza que deseja remover "' + farmacia.nome + '"?'
        }).onFechar.subscribe(res => {
            if(res.res) {
                this._farmaciaService.removeFarmacia(farmacia.id);
            }
        });
    }

    ir(page) {
        this.currentPage = page;
        this.farmacias = this.todasFarmacias.slice(20 * (page - 1), 19 + (20 * (page - 1)));
    }

    anterior() {
        this.ir(this.currentPage - 1);
    }

    proximo() {
        this.ir(this.currentPage + 1);
    }

}
