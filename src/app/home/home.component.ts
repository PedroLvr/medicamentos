import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RemedioService } from '../remedio.service';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    remedios = [];

    constructor(
        private _router: Router,
        private _params: ParamsService,
        private _remedioService: RemedioService,
        private _popup: PopupService
    ) {}

    ngOnInit() {
        this.pesquisar();
    }

    escolher(remedio): void {
        this._params.set(remedio);
        this._router.navigateByUrl('remedio');
    }

    pesquisar(event?): void {
        let texto = event ? event.target.value.trim() : '';
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            console.log(remedios);
            this.remedios = remedios;
        }, err => {
            console.log(err);
        });
    }

}
