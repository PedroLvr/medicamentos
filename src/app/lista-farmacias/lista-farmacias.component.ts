import { Component, OnInit } from '@angular/core';
import { FarmaciaService } from '../farmacia.service';

@Component({
    selector: 'app-lista-farmacias',
    templateUrl: './lista-farmacias.component.html',
    styleUrls: ['./lista-farmacias.component.scss']
})
export class ListaFarmaciasComponent implements OnInit {

    farmacias = [];

    constructor(
        private _farmaciaService: FarmaciaService
    ) { }

    ngOnInit() {
        this._farmaciaService.getFarmacias()
        .valueChanges()
        .subscribe(farmacias => {
            this.farmacias = farmacias;
        })
    }

}
