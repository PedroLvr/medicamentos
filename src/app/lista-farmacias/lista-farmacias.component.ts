import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmaciaService } from '../farmacia.service';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-lista-farmacias',
    templateUrl: './lista-farmacias.component.html'
})
export class ListaFarmaciasComponent implements OnInit {

    farmacias = [];

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
            console.log(farmacias);
            this.farmacias = farmacias;
        });
    }

    editar(farmacia) {
        this._params.set(farmacia);
        this._router.navigate(['/farmacias/formulario']);
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

}
